"use client";

export default function CurrentSourceIcon() {
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
          d="M65.909,50C65.909,39.959,57.768,31.818,47.727,31.818C37.686,31.818,29.545,39.959,29.545,50C29.545,60.041,37.686,68.182,47.727,68.182C57.768,68.182,65.909,60.041,65.909,50"
          fill="#ffffff"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeMiterlimit="6"
          strokeWidth="2"
        />
        <path
          d="M47.727,13.636L47.727,31.818"
          fill="none"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeMiterlimit="6"
          strokeWidth="2"
        />
        <path
          d="M47.727,86.364L47.727,68.182"
          fill="none"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeMiterlimit="6"
          strokeWidth="2"
        />
        <path
          d="M47.727,54.726L47.727,39.134"
          fill="none"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeMiterlimit="6"
          strokeWidth="1.493"
        />
        <path
          d="M44.163,48.935C46.391,53.39,46.391,54.726,47.727,61.409C49.064,54.726,49.064,53.39,51.291,48.935C48.618,49.826,46.836,49.826,44.163,48.935"
          fill={strokeColor}
          stroke="none"
        />
        <circle
          cx="47.727"
          cy="13.636"
          fill={strokeColor}
          r="3.636"
        />
        <circle
          cx="47.727"
          cy="86.364"
          fill={strokeColor}
          r="3.636"
        />
      </g>
    </svg>
  );
}
