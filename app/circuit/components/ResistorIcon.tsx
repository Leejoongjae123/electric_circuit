'use client';

export default function ResistorIcon() {
  const strokeColor = "#3b4449";

  return (
    <svg height="64" viewBox="0 0 100 100" width="64" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path 
          d="M47.90909090909088,29.545447272727245L47.90909090909088,13.636363636363638" 
          fill="none" 
          stroke={strokeColor}
          strokeLinecap="round" 
          strokeMiterlimit="6" 
          strokeWidth="2"
        />
        <path 
          d="M47.90909090909088,70.45455999999996L47.90909090909088,86.36363636363637" 
          fill="none" 
          stroke={strokeColor}
          strokeLinecap="round" 
          strokeMiterlimit="6" 
          strokeWidth="2"
        />
        <path 
          d="M47.90909090909088,29.545447272727245L39.954548363636235,32.95453818181815L55.863632727272744,39.772712727272804L39.954548363636235,46.59089454545462L55.863632727272744,53.409105454545404L39.954548363636235,60.227287272727224L55.863632727272744,67.04546909090905L47.90909090909088,70.45455999999996" 
          fill="none" 
          stroke={strokeColor}
          strokeLinecap="round" 
          strokeMiterlimit="6" 
          strokeWidth="2"
        />
        <circle 
          cx="47.90909090909088" 
          cy="13.636363636363638" 
          fill={strokeColor}
          r="3.6363636363636376"
        />
        <circle 
          cx="47.90909090909088" 
          cy="86.36363636363637" 
          fill={strokeColor}
          r="3.6363636363636376"
        />
      </g>
    </svg>
  );
}
