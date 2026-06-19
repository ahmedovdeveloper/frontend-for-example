import { useState, useRef, useEffect, useCallback } from "react";
import G1 from "../assets/glasses_1.png"
import G2 from "../assets/glasses_2.png"
import G3 from "../assets/glasses_3.png"
import G4 from "../assets/glasses_4.png"
const glasses = [
  {
    id: 1,
    name: "Classic Blue",
    color: "Чёрная оправа / Голубые линзы",
    src: G1,
    tag: "Солнцезащитные",
    lensColor: "rgba(100, 180, 255, 0.38)",
    frameColor: "#111111",
  },
  {
    id: 2,
    name: "Tortoise Orange",
    color: "Черепаховая / Оранжевые линзы",
    src: G2,
    tag: "Солнцезащитные",
    lensColor: "rgba(255, 150, 50, 0.48)",
    frameColor: "#5c3010",
  },
  {
    id: 3,
    name: "Classic Dark",
    color: "Чёрная оправа / Тёмные линзы",
    src: G3,
    tag: "Солнцезащитные",
    lensColor: "rgba(20, 20, 20, 0.65)",
    frameColor: "#111111",
  },
  {
    id: 4,
    name: "Clear Vision",
    color: "Чёрная оправа / Прозрачные линзы",
    src: G4,
    tag: "Оправа",
    lensColor: "rgba(200, 230, 255, 0.08)",
    frameColor: "#111111",
  },
];

// MediaPipe FaceMesh landmark indices
// Left eye outer/inner corners: 33, 133 | Right eye: 362, 263
// Nose tip: 1 | Left temple: 234 | Right temple: 454
const LM = {
  LEFT_EYE_OUTER: 33,
  LEFT_EYE_INNER: 133,
  RIGHT_EYE_OUTER: 263,
  RIGHT_EYE_INNER: 362,
  NOSE_TIP: 1,
  LEFT_TEMPLE: 234,
  RIGHT_TEMPLE: 454,
  LEFT_EYE_TOP: 159,
  LEFT_EYE_BOT: 145,
  RIGHT_EYE_TOP: 386,
  RIGHT_EYE_BOT: 374,
  FOREHEAD: 10,
  CHIN: 152,
};

export default function TryOnPage() {
  const [selected, setSelected] = useState(glasses[0]);
  const [cameraActive, setCameraActive] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mpReady, setMpReady] = useState(false);

  const videoRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const streamRef = useRef(null);
  const animRef = useRef(null);
  const faceMeshRef = useRef(null);
  const selectedRef = useRef(selected);
  const latestLandmarksRef = useRef(null);

  useEffect(() => { selectedRef.current = selected; }, [selected]);

  // Load MediaPipe FaceMesh
  useEffect(() => {
    const loadMP = async () => {
      const loadScript = (src) =>
        new Promise((res, rej) => {
          if (document.querySelector(`script[src="${src}"]`)) return res();
          const s = document.createElement("script");
          s.src = src; s.onload = res; s.onerror = rej;
          document.head.appendChild(s);
        });
      try {
        await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js");
        await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js");
        setMpReady(true);
      } catch (e) {
        setMpReady(false);
      }
    };
    loadMP();
  }, []);

  const startCamera = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" },
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setCameraActive(true);
      initFaceMesh();
    } catch (e) {
      setError("Не удалось получить доступ к камере. Проверьте разрешения браузера.");
    }
    setIsLoading(false);
  };

  const initFaceMesh = useCallback(() => {
    if (!window.FaceMesh) {
      startFallbackLoop();
      return;
    }
    const faceMesh = new window.FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });
    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    faceMesh.onResults((results) => {
      const canvas = overlayCanvasRef.current;
      const video = videoRef.current;
      if (!canvas || !video) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        const lm = results.multiFaceLandmarks[0];
        latestLandmarksRef.current = lm;
        setFaceDetected(true);
        drawGlassesFromLandmarks(ctx, lm, canvas.width, canvas.height, selectedRef.current);
      } else {
        latestLandmarksRef.current = null;
        setFaceDetected(false);
      }
    });
    faceMeshRef.current = faceMesh;

    // Send frames to MediaPipe
    const sendFrame = async () => {
      const video = videoRef.current;
      if (!video || video.paused || video.readyState < 2) {
        animRef.current = requestAnimationFrame(sendFrame);
        return;
      }
      await faceMesh.send({ image: video });
      animRef.current = requestAnimationFrame(sendFrame);
    };
    animRef.current = requestAnimationFrame(sendFrame);
  }, []);

  // Fallback loop when MediaPipe not available — fixed center overlay
  const startFallbackLoop = () => {
    const draw = () => {
      const canvas = overlayCanvasRef.current;
      const video = videoRef.current;
      if (!canvas || !video || video.readyState < 2) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawFallbackGlasses(ctx, canvas.width, canvas.height, selectedRef.current);
      setFaceDetected(false);
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
  };

  const stopCamera = () => {
    cancelAnimationFrame(animRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    if (faceMeshRef.current) { faceMeshRef.current.close(); faceMeshRef.current = null; }
    const ctx = overlayCanvasRef.current?.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, overlayCanvasRef.current.width, overlayCanvasRef.current.height);
    setCameraActive(false);
    setFaceDetected(false);
    latestLandmarksRef.current = null;
  };

  // Redraw when glasses change (no restart needed — loop reads selectedRef)
  // But if face mesh is active, force a redraw using last known landmarks
  useEffect(() => {
    if (!cameraActive) return;
    const canvas = overlayCanvasRef.current;
    const lm = latestLandmarksRef.current;
    if (canvas && lm) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGlassesFromLandmarks(ctx, lm, canvas.width, canvas.height, selected);
    }
  }, [selected, cameraActive]);

  return (
    <div className="pt-[120px] flex h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">
      {/* ── LEFT SIDEBAR ── */}
      <div className="w-72 flex-shrink-0 bg-[#111] border-r border-white/10 flex flex-col">
        <div className="px-5 py-5 border-b border-white/10">
          <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-1">Mikhliev's</p>
          <h1 className="text-lg font-semibold tracking-tight">Примерить</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
          {glasses.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelected(g)}
              className={`w-full rounded-xl overflow-hidden border transition-all duration-200 text-left ${
                selected.id === g.id
                  ? "border-white/60 bg-white/10 shadow-lg shadow-white/5"
                  : "border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20"
              }`}
            >
              <div className="bg-white w-full h-28 flex items-center justify-center overflow-hidden">
                <img src={g.src} alt={g.name} className="w-full h-full object-contain p-2" />
              </div>
              <div className="px-3 py-2.5">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm font-medium">{g.name}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                    g.tag === "Солнцезащитные"
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}>{g.tag}</span>
                </div>
                <p className="text-[10px] text-white/40 leading-tight">{g.color}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="px-4 py-4 border-t border-white/10">
          <p className="text-[10px] text-white/30 text-center leading-relaxed">
            Выберите модель и включите камеру для примерки
          </p>
        </div>
      </div>

      {/* ── MAIN CAMERA AREA ── */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0d0d0d]">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full transition-colors" style={{ background: cameraActive ? (faceDetected ? "#22c55e" : "#f59e0b") : "#444" }} />
            <span className="text-sm text-white/60">
              {!cameraActive ? "Камера выключена" : faceDetected ? "Лицо обнаружено" : "Поместите лицо в кадр"}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full">
            <span className="text-xs text-white/50">Модель:</span>
            <span className="text-xs font-medium text-white">{selected.name}</span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center bg-[#080808] relative overflow-hidden">
          {!cameraActive ? (
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="w-48 h-32 bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
                <img src={selected.src} alt={selected.name} className="w-full h-full object-contain p-3 bg-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-1">{selected.name}</h2>
                <p className="text-sm text-white/40">{selected.color}</p>
              </div>
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl max-w-xs">
                  {error}
                </div>
              )}
              <button
                onClick={startCamera}
                disabled={isLoading}
                className="flex items-center gap-2.5 bg-white text-black font-semibold px-7 py-3.5 rounded-full hover:bg-white/90 transition-all duration-200 disabled:opacity-50 text-sm"
              >
                {isLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Подключение...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
                    </svg>
                    Включить камеру
                  </>
                )}
              </button>
              <p className="text-xs text-white/25 max-w-xs leading-relaxed">
                Разрешите доступ к камере. Очки будут следить за поворотом вашей головы в реальном времени.
              </p>
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                style={{ transform: "scaleX(-1)" }}
                muted playsInline
              />
              <canvas
                ref={overlayCanvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ transform: "scaleX(-1)", objectFit: "cover" }}
              />

              {!faceDetected && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-56 h-72 border-2 border-white/25 border-dashed rounded-[50%] relative">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-white/30 text-xs whitespace-nowrap">
                      Поместите лицо сюда
                    </span>
                  </div>
                </div>
              )}

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <button
                  onClick={stopCamera}
                  className="bg-black/50 backdrop-blur-md border border-white/20 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-white/20 transition-all"
                >
                  Выключить камеру
                </button>
              </div>

              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 flex items-center gap-2">
                <div className="w-9 h-6 bg-white rounded overflow-hidden flex items-center justify-center">
                  <img src={selected.src} alt="" className="w-full h-full object-contain"/>
                </div>
                <span className="text-xs font-medium">{selected.name}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  CORE: draw glasses using FaceMesh landmarks
// ─────────────────────────────────────────────
function drawGlassesFromLandmarks(ctx, lm, cw, ch, glasses) {
  const pt = (idx) => ({ x: lm[idx].x * cw, y: lm[idx].y * ch, z: lm[idx].z });

  // Key points
  const leftTemple  = pt(LM.LEFT_TEMPLE);   // left outer temple (screen left = face right)
  const rightTemple = pt(LM.RIGHT_TEMPLE);  // right outer temple
  const leftOuter   = pt(LM.LEFT_EYE_OUTER);
  const rightOuter  = pt(LM.RIGHT_EYE_OUTER);
  const leftInner   = pt(LM.LEFT_EYE_INNER);
  const rightInner  = pt(LM.RIGHT_EYE_INNER);
  const leftTop     = pt(LM.LEFT_EYE_TOP);
  const leftBot     = pt(LM.LEFT_EYE_BOT);
  const rightTop    = pt(LM.RIGHT_EYE_TOP);
  const rightBot    = pt(LM.RIGHT_EYE_BOT);
  const noseTip     = pt(LM.NOSE_TIP);

  // Head rotation angle (roll) from temple-to-temple line
  const dx = rightTemple.x - leftTemple.x;
  const dy = rightTemple.y - leftTemple.y;
  const roll = Math.atan2(dy, dx); // radians

  // Frame width = temple-to-temple distance
  const frameWidth = Math.hypot(dx, dy);

  // Eye center midpoints
  const leftEyeCx  = (leftOuter.x + leftInner.x) / 2;
  const leftEyeCy  = (leftOuter.y + leftInner.y) / 2;
  const rightEyeCx = (rightOuter.x + rightInner.x) / 2;
  const rightEyeCy = (rightOuter.y + rightInner.y) / 2;

  // Glasses center = midpoint between both eye centers
  const gCx = (leftEyeCx + rightEyeCx) / 2;
  const gCy = (leftEyeCy + rightEyeCy) / 2;

  // Eye widths (for lens sizing)
  const leftEyeW  = Math.hypot(leftOuter.x - leftInner.x, leftOuter.y - leftInner.y);
  const rightEyeW = Math.hypot(rightOuter.x - rightInner.x, rightOuter.y - rightInner.y);

  // Lens dimensions — slightly larger than eye opening
  const lensW = leftEyeW * 2.2;
  const lensH = lensW * 0.85;

  // Distance between lens centers
  const eyeSpan = Math.hypot(rightEyeCx - leftEyeCx, rightEyeCy - leftEyeCy);

  // Frame thickness proportional to face size
  const frameThick = Math.max(2.5, frameWidth * 0.022);

  ctx.save();
  ctx.translate(gCx, gCy);
  ctx.rotate(roll);

  const lc = glasses.lensColor;
  const fc = glasses.frameColor;
  const halfSpan = eyeSpan / 2;
  const lx = -halfSpan; // left lens center x (local)
  const rx =  halfSpan; // right lens center x (local)
  const ly = 0, ry = 0;
  const bridgeGap = (rx - lx) - lensW;

  // ── SHADOW ──
  ctx.shadowColor = "rgba(0,0,0,0.45)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 3;

  // ── LENSES ──
  for (const [cx, cy] of [[lx, ly], [rx, ry]]) {
    ctx.beginPath();
    ctx.ellipse(cx, cy, lensW / 2, lensH / 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = lc;
    ctx.fill();
  }

  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // ── FRAMES ──
  for (const [cx, cy] of [[lx, ly], [rx, ry]]) {
    ctx.beginPath();
    ctx.ellipse(cx, cy, lensW / 2, lensH / 2, 0, 0, Math.PI * 2);
    ctx.strokeStyle = fc;
    ctx.lineWidth = frameThick;
    ctx.stroke();
  }

  // ── BRIDGE (nose piece) ──
  const bl = lx + lensW / 2;
  const br = rx - lensW / 2;
  ctx.beginPath();
  ctx.moveTo(bl, -lensH * 0.06);
  ctx.bezierCurveTo(
    bl + bridgeGap * 0.3, -lensH * 0.22,
    br - bridgeGap * 0.3, -lensH * 0.22,
    br, -lensH * 0.06
  );
  ctx.strokeStyle = fc;
  ctx.lineWidth = frameThick * 0.85;
  ctx.stroke();

  // ── TEMPLES (arms) ──
  const templeLen = frameWidth * 0.28;
  // Left temple
  ctx.beginPath();
  ctx.moveTo(lx - lensW / 2, 0);
  ctx.lineTo(lx - lensW / 2 - templeLen, lensH * 0.08);
  ctx.strokeStyle = fc;
  ctx.lineWidth = frameThick * 0.8;
  ctx.lineCap = "round";
  ctx.stroke();
  // Right temple
  ctx.beginPath();
  ctx.moveTo(rx + lensW / 2, 0);
  ctx.lineTo(rx + lensW / 2 + templeLen, lensH * 0.08);
  ctx.stroke();

  ctx.restore();
}

// ─────────────────────────────────────────
//  FALLBACK: fixed position (no landmarks)
// ─────────────────────────────────────────
function drawFallbackGlasses(ctx, cw, ch, glasses) {
  const gCx = cw / 2;
  const gCy = ch * 0.38;
  const eyeSpan = cw * 0.18;
  const lensW = cw * 0.16;
  const lensH = lensW * 0.85;
  const bridgeGap = eyeSpan - lensW;
  const frameThick = Math.max(2.5, cw * 0.015);
  const lc = glasses.lensColor;
  const fc = glasses.frameColor;

  ctx.save();
  ctx.translate(gCx, gCy);

  ctx.shadowColor = "rgba(0,0,0,0.3)";
  ctx.shadowBlur = 8;

  for (const cx of [-eyeSpan / 2, eyeSpan / 2]) {
    ctx.beginPath();
    ctx.ellipse(cx, 0, lensW / 2, lensH / 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = lc;
    ctx.fill();
  }
  ctx.shadowBlur = 0;
  for (const cx of [-eyeSpan / 2, eyeSpan / 2]) {
    ctx.beginPath();
    ctx.ellipse(cx, 0, lensW / 2, lensH / 2, 0, 0, Math.PI * 2);
    ctx.strokeStyle = fc;
    ctx.lineWidth = frameThick;
    ctx.stroke();
  }

  const bl = -eyeSpan / 2 + lensW / 2;
  const br =  eyeSpan / 2 - lensW / 2;
  ctx.beginPath();
  ctx.moveTo(bl, -lensH * 0.06);
  ctx.bezierCurveTo(bl + bridgeGap * 0.3, -lensH * 0.22, br - bridgeGap * 0.3, -lensH * 0.22, br, -lensH * 0.06);
  ctx.strokeStyle = fc;
  ctx.lineWidth = frameThick * 0.85;
  ctx.stroke();

  const tl = cw * 0.12;
  ctx.lineWidth = frameThick * 0.8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-eyeSpan / 2 - lensW / 2, 0);
  ctx.lineTo(-eyeSpan / 2 - lensW / 2 - tl, lensH * 0.08);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(eyeSpan / 2 + lensW / 2, 0);
  ctx.lineTo(eyeSpan / 2 + lensW / 2 + tl, lensH * 0.08);
  ctx.stroke();

  ctx.restore();
}