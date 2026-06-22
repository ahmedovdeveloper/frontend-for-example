import { useState, useRef, useEffect, useCallback } from "react";

import G1 from "../assets/glasses_1.png";
import G2 from "../assets/glasses_2.png";
import G3 from "../assets/glasses_3.png";
import G4 from "../assets/glasses_4.png";

const glasses = [
  {
    id: 1,
    name: "Classic Blue",
    color: "Чёрная оправа / Голубые линзы",
    src: G1,
    tag: "Солнцезащитные",
  },
  {
    id: 2,
    name: "Tortoise Orange",
    color: "Черепаховая / Оранжевые линзы",
    src: G2,
    tag: "Солнцезащитные",
  },
  {
    id: 3,
    name: "Classic Dark",
    color: "Чёрная оправа / Тёмные линзы",
    src: G3,
    tag: "Солнцезащитные",
  },
  {
    id: 4,
    name: "Clear Vision",
    color: "Чёрная оправа / Прозрачные линзы",
    src: G4,
    tag: "Оправа",
  },
];

const LM = {
  LEFT_EYE_OUTER:  33,
  LEFT_EYE_INNER:  133,
  RIGHT_EYE_OUTER: 263,
  RIGHT_EYE_INNER: 362,
  LEFT_TEMPLE:     234,
  RIGHT_TEMPLE:    454,
  LEFT_EYE_TOP:    159,
  RIGHT_EYE_TOP:   386,
  LEFT_EYE_BOT:    145,
  RIGHT_EYE_BOT:   374,
  NOSE_BRIDGE:     6,
};

const imageCache = {};
function loadImg(src) {
  if (imageCache[src]) return imageCache[src];
  const img = new Image();
  img.src = src;
  imageCache[src] = img;
  return img;
}

// ── Ключевое изменение: рисуем с учётом display-размера canvas,
//    а не нативного разрешения видео ──
function drawARGlasses(ctx, lm, cw, ch, glassesItem) {
  const img = loadImg(glassesItem.src);
  if (!img.complete || img.naturalWidth === 0) return;

  const p = (i) => ({ x: lm[i].x * cw, y: lm[i].y * ch, z: lm[i].z });

  const lTemple = p(LM.LEFT_TEMPLE);
  const rTemple = p(LM.RIGHT_TEMPLE);
  const lOuter  = p(LM.LEFT_EYE_OUTER);
  const rOuter  = p(LM.RIGHT_EYE_OUTER);
  const lInner  = p(LM.LEFT_EYE_INNER);
  const rInner  = p(LM.RIGHT_EYE_INNER);
  const lTop    = p(LM.LEFT_EYE_TOP);
  const rTop    = p(LM.RIGHT_EYE_TOP);
  const lBot    = p(LM.LEFT_EYE_BOT);
  const rBot    = p(LM.RIGHT_EYE_BOT);

  const lCx = (lOuter.x + lInner.x) / 2;
  const lCy = (lOuter.y + lInner.y) / 2;
  const rCx = (rOuter.x + rInner.x) / 2;
  const rCy = (rOuter.y + rInner.y) / 2;

  // Угол наклона по линии висков
  const dx   = rTemple.x - lTemple.x;
  const dy   = rTemple.y - lTemple.y;
  const roll = Math.atan2(dy, dx);

  // ── Авто-размер: ширина между ВНЕШНИМИ углами глаз × коэффициент ──
  const eyeSpanX = Math.hypot(rOuter.x - lOuter.x, rOuter.y - lOuter.y);

  // Высота очков через вертикальный размер глаз
  const leftEyeH  = Math.hypot(lTop.x - lBot.x, lTop.y - lBot.y);
  const rightEyeH = Math.hypot(rTop.x - rBot.x, rTop.y - rBot.y);
  const eyeH      = (leftEyeH + rightEyeH) / 2;

  // Ширина очков = расстояние между внешними углами + немного по бокам
  // Это адаптируется автоматически при любом размере лица и дистанции
const glassesW = eyeSpanX * 1.85;
  const glassesH = glassesW * (img.naturalHeight / img.naturalWidth);

  const cx = (lCx + rCx) / 2;
  const cy = (lCy + rCy) / 2;

  // Yaw через z-глубину висков
  const faceW  = Math.hypot(dx, dy);
  const rawYaw = (rTemple.z - lTemple.z) * 3.8;
  const yaw    = Math.max(-1, Math.min(1, rawYaw));
  const scaleX = Math.cos(yaw * 0.85);

  // Вертикальный сдвиг — чтобы очки сидели точно на глазах
  const vertOffset = eyeH * 0.3;

  ctx.save();
  ctx.translate(cx, cy - vertOffset);
  ctx.rotate(roll);
  ctx.scale(scaleX, 1);

  // ── 50% прозрачность для линз ──
  // Сначала рисуем оправу полностью непрозрачно, потом поверх линзы с alpha
  // Самый простой способ: рисуем весь PNG с globalAlpha = 0.5,
  // т.к. PNG уже содержит прозрачность оправы
  ctx.globalAlpha = 0.5;
  ctx.drawImage(
    img,
    -glassesW / 2,
    -glassesH / 2,
    glassesW,
    glassesH
  );

  // Оправа поверх с полной непрозрачностью (рисуем снова, но только визуально
  // усиливаем — оправа тёмная, линзы светлые, второй слой восстанавливает оправу)
  ctx.globalAlpha = 0.6;
  ctx.drawImage(
    img,
    -glassesW / 2,
    -glassesH / 2,
    glassesW,
    glassesH
  );

  ctx.restore();
}

export default function TryOnPage() {
  const [selected,     setSelected]     = useState(glasses[0]);
  const [cameraActive, setCameraActive] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [error,        setError]        = useState(null);
  const [isLoading,    setIsLoading]    = useState(false);

  const videoRef           = useRef(null);
  const overlayCanvasRef   = useRef(null);
  const streamRef          = useRef(null);
  const animRef            = useRef(null);
  const sendTimerRef       = useRef(null);
  const faceMeshRef        = useRef(null);
  const selectedRef        = useRef(selected);
  const latestLandmarksRef = useRef(null);

  useEffect(() => {
    selectedRef.current = selected;
    loadImg(selected.src);
  }, [selected]);

  useEffect(() => {
    glasses.forEach((g) => loadImg(g.src));
  }, []);

  useEffect(() => {
    const load = (src) =>
      new Promise((res, rej) => {
        if (document.querySelector(`script[src="${src}"]`)) return res();
        const s = document.createElement("script");
        s.src = src; s.crossOrigin = "anonymous";
        s.onload = res; s.onerror = rej;
        document.head.appendChild(s);
      });
    (async () => {
      try {
        await load("https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js");
        await load("https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js");
      } catch (e) { console.warn("MediaPipe preload failed", e); }
    })();
  }, []);

  // ── ИСПРАВЛЕНИЕ МОБИЛЬНОГО ЭФФЕКТА ──
  // Проблема: canvas имеет нативное разрешение видео (1280×720),
  // но на экране занимает меньше места (object-cover обрезает).
  // Решение: canvas рисуем в координатах DISPLAY-размера элемента,
  // а MediaPipe landmarks умножаем на display-размер.
  const renderLoop = useCallback(() => {
    const canvas = overlayCanvasRef.current;
    const video  = videoRef.current;
    if (!canvas || !video) { animRef.current = requestAnimationFrame(renderLoop); return; }

    // Берём ОТОБРАЖАЕМЫЙ размер элемента, а не нативное разрешение
    const displayW = canvas.clientWidth  || video.clientWidth  || 640;
    const displayH = canvas.clientHeight || video.clientHeight || 480;

    // Устанавливаем canvas в display-разрешение (1:1 пикселей)
    // с учётом devicePixelRatio для чёткости на ретине
    const dpr = window.devicePixelRatio || 1;
    const bufW = Math.round(displayW * dpr);
    const bufH = Math.round(displayH * dpr);

    if (canvas.width !== bufW || canvas.height !== bufH) {
      canvas.width  = bufW;
      canvas.height = bufH;
      canvas.style.width  = `${displayW}px`;
      canvas.style.height = `${displayH}px`;
    }

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, displayW, displayH);

    if (latestLandmarksRef.current) {
      // ── object-cover компенсация ──
      // Видео может быть обрезано на экране, нужно учесть crop-offset
      const vNatW = video.videoWidth  || 640;
      const vNatH = video.videoHeight || 480;

      const scaleToFit = Math.max(displayW / vNatW, displayH / vNatH);
      const renderedW  = vNatW * scaleToFit;
      const renderedH  = vNatH * scaleToFit;
      const offsetX    = (displayW - renderedW) / 2;
      const offsetY    = (displayH - renderedH) / 2;

      // Пересчитываем landmark координаты с учётом crop
      const adjustedLM = latestLandmarksRef.current.map((pt) => ({
        x: (pt.x * renderedW + offsetX) / displayW,
        y: (pt.y * renderedH + offsetY) / displayH,
        z: pt.z,
      }));

      drawARGlasses(ctx, adjustedLM, displayW, displayH, selectedRef.current);
    }

    animRef.current = requestAnimationFrame(renderLoop);
  }, []);

  const initFaceMesh = useCallback(() => {
    if (!window.FaceMesh) { console.warn("FaceMesh not loaded"); return; }

    const fm = new window.FaceMesh({
      locateFile: (f) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}`,
    });
    fm.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.55,
      minTrackingConfidence: 0.55,
    });
    fm.onResults((results) => {
      if (results.multiFaceLandmarks?.length > 0) {
        latestLandmarksRef.current = results.multiFaceLandmarks[0];
        setFaceDetected(true);
      } else {
        latestLandmarksRef.current = null;
        setFaceDetected(false);
      }
    });

    faceMeshRef.current = fm;

    let busy = false;
    const sendFrame = async () => {
      const video = videoRef.current;
      if (video && video.readyState >= 2 && !busy && faceMeshRef.current) {
        busy = true;
        await fm.send({ image: video }).catch(() => {});
        busy = false;
      }
      sendTimerRef.current = setTimeout(sendFrame, 33);
    };
    sendFrame();

    animRef.current = requestAnimationFrame(renderLoop);
  }, [renderLoop]);

  const startCamera = async () => {
    setIsLoading(true);
    setError(null);

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" },
      });
    } catch {
      setError("Не удалось получить доступ к камере. Проверьте разрешения браузера.");
      setIsLoading(false);
      return;
    }

    streamRef.current = stream;
    setCameraActive(true);

    await new Promise((r) => setTimeout(r, 150));

    const video = videoRef.current;
    if (!video) {
      stream.getTracks().forEach((t) => t.stop());
      setCameraActive(false);
      setError("Внутренняя ошибка: video не найден.");
      setIsLoading(false);
      return;
    }

    video.srcObject = stream;

    await new Promise((resolve, reject) => {
      video.onloadedmetadata = resolve;
      video.onerror = reject;
      if (video.readyState >= 1) resolve();
    });

    try { await video.play(); } catch {
      stream.getTracks().forEach((t) => t.stop());
      setCameraActive(false);
      setError("Не удалось воспроизвести видео.");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setTimeout(() => initFaceMesh(), 400);
  };

  const stopCamera = useCallback(() => {
    if (animRef.current)      cancelAnimationFrame(animRef.current);
    if (sendTimerRef.current) clearTimeout(sendTimerRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    faceMeshRef.current?.close?.();
    streamRef.current          = null;
    faceMeshRef.current        = null;
    latestLandmarksRef.current = null;
    const canvas = overlayCanvasRef.current;
    if (canvas) canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    setCameraActive(false);
    setFaceDetected(false);
    setError(null);
  }, []);

  useEffect(() => () => stopCamera(), [stopCamera]);

  return (
    <div className="pt-[60px] md:pt-[120px] flex flex-col md:flex-row h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">

      <div className="
        order-2 md:order-1
        md:w-72 md:flex-shrink-0
        bg-[#111]
        md:border-r border-t md:border-t-0 border-white/10
        flex flex-col
        md:h-full
        h-auto
      ">
        <div className="hidden md:block px-5 py-5 border-b border-white/10">
          <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-1">Mikhliev's</p>
          <h1 className="text-lg font-semibold tracking-tight">Примерить</h1>
        </div>

        <div className="
          flex md:flex-col
          flex-row
          overflow-x-auto md:overflow-x-hidden
          overflow-y-hidden md:overflow-y-auto
          px-3 py-3
          gap-2
          flex-shrink-0 md:flex-shrink
          scrollbar-none
        ">
          {glasses.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelected(g)}
              className={`
                flex-shrink-0
                w-36 md:w-full
                rounded-xl overflow-hidden border transition-all duration-200 text-left
                ${selected.id === g.id
                  ? "border-white/60 bg-white/10 shadow-lg shadow-white/5"
                  : "border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20"
                }
              `}
            >
              <div className="bg-white w-full h-20 md:h-28 flex items-center justify-center overflow-hidden">
                <img src={g.src} alt={g.name} className="w-full h-full object-contain p-2" />
              </div>
              <div className="px-2.5 md:px-3 py-2 md:py-2.5">
                <div className="flex items-center justify-between mb-0.5 gap-1">
                  <span className="text-xs md:text-sm font-medium truncate">{g.name}</span>
                  <span className={`text-[8px] md:text-[9px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${
                    g.tag === "Солнцезащитные"
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}>{g.tag}</span>
                </div>
                <p className="text-[9px] md:text-[10px] text-white/40 leading-tight line-clamp-2">{g.color}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="order-1 md:order-2 flex-1 flex flex-col min-h-0">

        <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-white/10 bg-[#0d0d0d]">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="md:hidden text-xs font-semibold tracking-tight mr-1">Mikhliev's</span>
            <div
              className="w-2 h-2 rounded-full transition-colors duration-300 flex-shrink-0"
              style={{ background: cameraActive ? (faceDetected ? "#22c55e" : "#f59e0b") : "#444" }}
            />
            <span className="text-xs md:text-sm text-white/60">
              {!cameraActive
                ? "Камера выключена"
                : faceDetected
                ? "AR-эффект активен"
                : "Смотрите в камеру..."}
            </span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2 bg-white/5 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full">
            <span className="text-[10px] md:text-xs text-white/50">Модель:</span>
            <span className="text-[10px] md:text-xs font-medium truncate max-w-[80px] md:max-w-none">
              {selected.name}
            </span>
          </div>
        </div>

        <div className="flex-1 relative bg-[#080808] overflow-hidden min-h-0">
          {!cameraActive ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 md:gap-6 text-center px-4">
              <div className="w-36 h-24 md:w-48 md:h-32 bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
                <img
                  src={selected.src}
                  alt={selected.name}
                  className="w-full h-full object-contain p-3 bg-white"
                />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold mb-1">{selected.name}</h2>
                <p className="text-xs md:text-sm text-white/40">{selected.color}</p>
              </div>
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs md:text-sm px-4 py-3 rounded-xl max-w-xs">
                  {error}
                </div>
              )}
              <button
                onClick={startCamera}
                disabled={isLoading}
                className="bg-white text-black font-semibold px-6 md:px-8 py-3 md:py-3.5 rounded-full hover:bg-white/90 active:scale-95 transition-all disabled:opacity-50 text-sm"
              >
                {isLoading ? "Подключение..." : "Включить камеру"}
              </button>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transform: "scaleX(-1)" }}
                muted
                playsInline
              />
              <canvas
                ref={overlayCanvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ transform: "scaleX(-1)" }}
              />
              <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2">
                <button
                  onClick={stopCamera}
                  className="bg-black/50 backdrop-blur-md border border-white/20 text-white px-5 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium hover:bg-white/20 active:scale-95 transition-all"
                >
                  Выключить камеру
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}