"use client";

export default function GroundIcon() {
  const strokeColor = "#3b4449";

  return (
    <svg
      height="64"
      viewBox="0 0 100 100"
      width="64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M50,54.444L50,18.889"
          fill="none"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeMiterlimit="6"
          strokeWidth="2"
        />
        <path
          d="M14.444,54.444L50,90L85.556,54.444Z"
          fill="#ffffff"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="6"
          strokeWidth="2"
        />
        <circle
          cx="50"
          cy="18.889"
          fill={strokeColor}
          r="3.636"
        />
      </g>
    </svg>
  );
}
