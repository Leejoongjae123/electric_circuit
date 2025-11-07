'use client';

export default function CapacitorIcon() {
  const strokeColor = "#3b4449";

  return (
    <svg height="64" viewBox="0 0 100 100" width="64" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path 
          d="M47.72727272727273,53.4091054545454L47.72727272727273,86.36363636363637" 
          fill="none" 
          stroke={strokeColor}
          strokeLinecap="round" 
          strokeMiterlimit="6" 
          strokeWidth="2"
        />
        <path 
          d="M47.72727272727273,46.590901818181784L47.72727272727273,13.63636363636363" 
          fill="none" 
          stroke={strokeColor}
          strokeLinecap="round" 
          strokeMiterlimit="6" 
          strokeWidth="2"
        />
        <path 
          d="M65.9090909090909,46.590901818181784L29.54545454545454,46.590901818181784" 
          fill="none" 
          stroke={strokeColor}
          strokeLinecap="round" 
          strokeMiterlimit="6" 
          strokeWidth="2"
        />
        <path 
          d="M65.9090909090909,53.4091054545454L29.54545454545454,53.4091054545454" 
          fill="none" 
          stroke={strokeColor}
          strokeLinecap="round" 
          strokeMiterlimit="6" 
          strokeWidth="2"
        />
        <circle 
          cx="47.72727272727273" 
          cy="13.63636363636363" 
          fill={strokeColor}
          r="3.6363636363636376"
        />
        <circle 
          cx="47.72727272727273" 
          cy="86.36363636363637" 
          fill={strokeColor}
          r="3.6363636363636376"
        />
      </g>
    </svg>
  );
}
