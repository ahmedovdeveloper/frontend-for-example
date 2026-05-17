import { useRef, useState, useCallback } from 'react';

const images = [
  'https://www.dropbox.com/scl/fi/n142e8gapscrp8y7w1oip/IMG_0933-3.JPG?rlkey=gezbxka78a6frnc68a8x1ekpo&raw=1',
  'https://www.dropbox.com/scl/fi/2or4dmmlg0s5nr4k0nc3m/IMG_0397.JPG?rlkey=y7sv2fd9nt1vdqryduvyiggj6&raw=1',
  'https://www.dropbox.com/scl/fi/a95t28ge393g6sshvo78y/IMG_0399.JPG?rlkey=3u8xv055y7fc09ie8datw0nl1&raw=1',
  'https://www.dropbox.com/scl/fi/m6hpscxvs95mth4sihau2/DSC05666.JPG?rlkey=athf72n9crnhd06ekqithnp0v&st=5zhmz7n8&raw=1',
  'https://www.dropbox.com/scl/fi/y3ecyzm68t27xnhtlnskz/IMG_6259.JPG?rlkey=l81v3gv39ynln60d1gr5i6pp8&st=mgp1rvqj&raw=1',
  'https://www.dropbox.com/scl/fi/brkb3vgtit7u5hersudjo/IMG_8096.JPG?rlkey=tiv8sim872vmt0fik14vzd3rd&st=fy7c2e1h&raw=1',
  'https://www.dropbox.com/scl/fi/7bvmn440xszzninpxjfav/IMG_6171.JPG?rlkey=opd5mjn8skbcs7w9mcjqxre0c&st=s4lsg6g7&raw=1',
];

const CARD_W = 360;
const CARD_GAP = 20;
const STEP = CARD_W + CARD_GAP;

export const ModelsSection = () => {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState({});

  const dragRef = useRef({ active: false, startX: 0, currentX: 0, lastOffset: 0 });
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const count = images.length;

  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(count - 1, idx));
    setCurrent(clamped);
    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.52s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      trackRef.current.style.transform = `translateX(${-clamped * STEP}px)`;
    }
  }, [count]);

  const onPointerDown = (e) => {
    isDragging.current = false;
    dragRef.current = { active: true, startX: e.clientX, currentX: e.clientX, lastOffset: -current * STEP };
    if (trackRef.current) trackRef.current.style.transition = 'none';
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragRef.current.active) return;
    dragRef.current.currentX = e.clientX;
    const delta = e.clientX - dragRef.current.startX;
    if (Math.abs(delta) > 5) isDragging.current = true;
    const newX = dragRef.current.lastOffset + delta;
    const maxX = 0;
    const minX = -(count - 1) * STEP;
    const bounded = newX > maxX
      ? maxX + (newX - maxX) * 0.12
      : newX < minX
        ? minX + (newX - minX) * 0.12
        : newX;
    if (trackRef.current) trackRef.current.style.transform = `translateX(${bounded}px)`;
  };

  const onPointerUp = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    const delta = dragRef.current.currentX - dragRef.current.startX;
    if (isDragging.current) {
      if (delta < -50) goTo(current + 1);
      else if (delta > 50) goTo(current - 1);
      else goTo(current);
    }
  };

  return (
    <section style={{
      background: '#0c0c0c',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      padding: '80px 0',
      userSelect: 'none',
    }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 56, position: 'relative', zIndex: 2 }}>
    
        <h2 style={{
          fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: '#f0ebe4',
          letterSpacing: '-0.025em', lineHeight: 1.08, margin: 0,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
        }}>
          Наша коллекция
        </h2>
      </div>

      {/* Slider viewport */}
      <div
        style={{
          position: 'relative', zIndex: 2,
          overflow: 'hidden',
          paddingLeft: 'max(40px, calc((100vw - 800px) / 2))',
          cursor: 'grab',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* Track — NO framer motion here */}
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: CARD_GAP,
            willChange: 'transform',
            transform: 'translateX(0px)',
          }}
        >
          {images.map((src, idx) => {
            const isActive = idx === current;
            return (
              <div
                key={idx}
                onClick={() => { if (!isDragging.current) goTo(idx); }}
                style={{
                  width: CARD_W,
                  flexShrink: 0,
                  borderRadius: 3,
                  overflow: 'hidden',
                  transform: isActive ? 'scale(1)' : 'scale(0.94)',
                  opacity: isActive ? 1 : 0.4,
                  transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease',
                  position: 'relative',
                }}
              >
                <div style={{ aspectRatio: '3/4', position: 'relative', background: '#181410' }}>
                  <img
                    src={src}
                    alt={`Model ${idx + 1}`}
                    draggable={false}
                    onLoad={() => setLoaded(l => ({ ...l, [idx]: true }))}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                      filter: 'sepia(0.28) brightness(0.86) contrast(1.06) saturate(0.72)',
                      opacity: loaded[idx] ? 1 : 0,
                      transition: 'opacity 0.5s ease',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Vignette */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
                    background: 'linear-gradient(to top, rgba(8,6,4,0.9) 0%, transparent 100%)',
                    zIndex: 2, pointerEvents: 'none',
                  }} />

                  {/* Label */}
                  <div style={{
                    position: 'absolute', bottom: 24, left: 24, right: 24, zIndex: 3,
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                    pointerEvents: 'none',
                  }}>
                    <div>
                      <p style={{
                        color: '#8a7a68', fontSize: 9, letterSpacing: '0.22em',
                        textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif",
                        margin: '0 0 3px',
                      }}>Collection</p>
                      <h3 style={{
                        color: '#f0ebe4', fontSize: 20, fontWeight: 300,
                        margin: 0, fontFamily: "'Cormorant Garamond', Georgia, serif",
                        letterSpacing: '0.02em',
                      }}>Glasses</h3>
                    </div>
                    <span style={{
                      color: '#6a5a48', fontSize: 11,
                      fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.05em',
                    }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        maxWidth: 800, margin: '44px auto 0', padding: '0 40px',
        width: '100%', boxSizing: 'border-box', position: 'relative', zIndex: 2,
      }}>
        {/* Dots */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {images.map((_, idx) => (
            <button key={idx} onClick={() => goTo(idx)} style={{
              border: 'none',
              background: idx === current ? '#c8b89a' : '#2a2a2a',
              borderRadius: 2, height: 2,
              width: idx === current ? 32 : 10,
              padding: 0, cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
            }} />
          ))}
        </div>

        {/* Counter + Arrows */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ color: '#444', fontSize: 11, fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.1em' }}>
            {String(current + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            {[-1, 1].map(dir => (
              <button
                key={dir}
                onClick={() => goTo(current + dir)}
                disabled={dir === -1 ? current === 0 : current === count - 1}
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  border: '1px solid #222', background: 'transparent',
                  color: (dir === -1 ? current === 0 : current === count - 1) ? '#2a2a2a' : '#c8b89a',
                  fontSize: 16,
                  cursor: (dir === -1 ? current === 0 : current === count - 1) ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s ease', fontFamily: 'serif',
                }}
              >
                {dir === -1 ? '←' : '→'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400&display=swap');
        * { -webkit-font-smoothing: antialiased; }
      `}</style>
    </section>
  );
};