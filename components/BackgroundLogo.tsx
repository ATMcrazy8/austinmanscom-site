export default function BackgroundLogo() {
  return (
    <svg
      className="absolute w-[1280px] h-[1280px] opacity-50"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* White circular background */}
      <circle cx="64" cy="64" r="60" fill="white" />

      <g
        style={{ stroke: "hsl(var(--ring))" }} // Uses Tailwind theme variable
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="miter"
        transform="scale(10)" // Scales it up by 10x
      >
        {/* "A" */}
        <path d="M40 88 L64 24 L88 88" />

        {/* "M" */}
        <path d="M24 88 L48 24 L64 60 L80 24 L104 88" />
      </g>
    </svg>
  );
}
