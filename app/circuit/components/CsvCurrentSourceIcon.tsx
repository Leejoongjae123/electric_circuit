"use client";

export default function CsvCurrentSourceIcon() {
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
          d="M45.182,59.042C46.773,61.446,46.773,62.167,47.727,65.772C48.682,62.167,48.682,61.446,50.273,59.042C48.364,59.523,47.091,59.523,45.182,59.042"
          fill={strokeColor}
          stroke="none"
        />
        <path
          d="M47.727,60.469L47.727,56.409"
          fill="none"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeMiterlimit="6"
          strokeWidth="1.802"
        />
        <text
          fill={strokeColor}
          fontSize="13px"
          fontStyle="italic"
          fontWeight="bold"
          textAnchor="middle"
          x="47.727"
          y="54"
        >
          CSV
        </text>
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
