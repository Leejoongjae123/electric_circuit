"use client";

export default function NameNodeIcon() {
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
          d="M15.186,70.226L27.633,54.502L50.151,54.502Z"
          fill={strokeColor}
          stroke={strokeColor}
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <rect
          fill="#ffffff"
          height="28.877"
          r="5"
          rx="5"
          ry="5"
          stroke={strokeColor}
          strokeWidth="2"
          width="67.553"
          x="22.447"
          y="25.625"
        />
        <text
          fill={strokeColor}
          fontSize="16.6px"
          fontWeight="bold"
          textAnchor="start"
          x="27.633"
          y="41.183"
        >
          <tspan dy="7.468">NODE</tspan>
        </text>
        <circle
          cx="15.186"
          cy="70.226"
          fill={strokeColor}
          r="3.636"
        />
      </g>
    </svg>
  );
}
