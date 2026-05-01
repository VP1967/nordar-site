// Three logo concepts for Nordar
// All are vector marks intended to render at any size, monochrome.

const LogoMarkA = ({ size = 28, color = "currentColor" }) => (
  // Geometric N built from two verticals + diagonal — references infrastructure stroke + a north arrow
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Nordar mark">
    <rect x="3" y="3" width="26" height="26" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M9 23 V9 L23 23 V9" stroke={color} strokeWidth="2" strokeLinecap="square" />
    <circle cx="23" cy="9" r="1.5" fill={color} />
  </svg>
);

const LogoMarkB = ({ size = 28, color = "currentColor" }) => (
  // North chevron — stacked rotated squares forming an upward axis
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Nordar mark">
    <path d="M16 4 L28 16 L16 28 L4 16 Z" stroke={color} strokeWidth="1.5" />
    <path d="M16 10 L22 16 L16 22 L10 16 Z" stroke={color} strokeWidth="1.5" />
    <path d="M16 4 V14" stroke={color} strokeWidth="2" strokeLinecap="square" />
  </svg>
);

const LogoMarkC = ({ size = 28, color = "currentColor" }) => (
  // Bracketed N — system delimiters, terminal aesthetic
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Nordar mark">
    <path d="M8 5 H4 V27 H8" stroke={color} strokeWidth="1.8" strokeLinecap="square" fill="none" />
    <path d="M24 5 H28 V27 H24" stroke={color} strokeWidth="1.8" strokeLinecap="square" fill="none" />
    <path d="M11 23 V9 L21 23 V9" stroke={color} strokeWidth="1.8" strokeLinecap="square" fill="none" />
  </svg>
);

const LogoMarkD = ({ size = 28, color = "currentColor" }) => (
  // Compass / bearing — north-facing axis with offset hairlines
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Nordar mark">
    <circle cx="16" cy="16" r="13" stroke={color} strokeWidth="1.5" />
    <path d="M16 5 L20 16 L16 27 L12 16 Z" fill={color} />
    <path d="M5 16 H10" stroke={color} strokeWidth="1.5" />
    <path d="M22 16 H27" stroke={color} strokeWidth="1.5" />
  </svg>
);

const Brand = ({ variant = "A", size = 28, showWord = true }) => {
  const Marks = { A: LogoMarkA, B: LogoMarkB, C: LogoMarkC, D: LogoMarkD };
  const Mark = Marks[variant] || LogoMarkA;
  return (
    <span className="brand">
      <Mark size={size} />
      {showWord && <span className="word">Nordar</span>}
    </span>
  );
};

window.LogoMarkA = LogoMarkA;
window.LogoMarkB = LogoMarkB;
window.LogoMarkC = LogoMarkC;
window.LogoMarkD = LogoMarkD;
window.Brand = Brand;
