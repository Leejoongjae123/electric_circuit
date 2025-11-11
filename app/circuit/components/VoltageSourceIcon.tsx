"use client";

export default function VoltageSourceIcon() {
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
          d="M48.34,37.759L47.115,37.759L47.115,43.082L41.836,43.082L41.836,44.307L47.115,44.307L47.115,49.631L48.34,49.631L48.34,44.307L53.619,44.307L53.619,43.082L48.34,43.082L48.34,37.759"
          fill={strokeColor}
          stroke="none"
        />
        <path
          d="M41.914,57.559L41.914,58.784L53.586,58.784L53.586,57.559L41.914,57.559"
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
