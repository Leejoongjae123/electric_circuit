"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { CircuitNodeData } from "../types";

const CircuitNode = memo(({ data, selected }: NodeProps<CircuitNodeData>) => {
  const connectedHandles = data.connectedHandles || [];

  const isHandleConnected = (handleId: string) => {
    return connectedHandles.includes(handleId);
  };

  const getLabel = () => {
    if (data.properties.label) return data.properties.label;

    switch (data.type) {
      case "resistor":
        return data.properties.resistance
          ? `${data.properties.resistance}Ω`
          : "저항";
      case "voltage_source":
        return data.properties.voltage ? `${data.properties.voltage}V` : "전원";
      case "capacitor":
        return data.properties.capacitance
          ? `${data.properties.capacitance}F`
          : "커패시터";
      case "inductor":
        return data.properties.inductance
          ? `${data.properties.inductance * 1000000}µH`
          : "인덕터";
      case "opamp":
        return data.properties.model || "Op-Amp";
      default:
        return "";
    }
  };

  const renderComponent = () => {
    const label = getLabel();
    const strokeColor = selected ? "#3b82f6" : "#3b4449";

    switch (data.type) {
      case "resistor":
        // Resistor.svg 내용을 직접 인라인으로 렌더링하여 텍스트를 동적으로 변경
        return (
          <div className="relative" style={{ width: "100px", height: "100px" }}>
            <svg height="100" viewBox="0 0 100 100" width="100" xmlns="http://www.w3.org/2000/svg">
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
                <text 
                  fill={strokeColor}
                  fontSize="11.64px" 
                  fontWeight="bold" 
                  textAnchor="start" 
                  x="61.54545454545452" 
                  y="50.000000000000014"
                >
                  <tspan dy="-1.7454545454545456">
                    {data.properties.label || "R"}
                  </tspan>
                  <tspan dy="13.963636363636367" x="61.54545454545452">
                    {data.properties.resistance ? `${data.properties.resistance} Ω` : "100 Ω"}
                  </tspan>
                </text>
                {/* 연결 포인트 - 연결되지 않은 경우에만 표시 */}
                {!isHandleConnected("top") && (
                  <circle 
                    cx="47.90909090909088" 
                    cy="13.636363636363638" 
                    fill={strokeColor}
                    r="3.6363636363636376"
                  />
                )}
                {!isHandleConnected("bottom") && (
                  <circle 
                    cx="47.90909090909088" 
                    cy="86.36363636363637" 
                    fill={strokeColor}
                    r="3.6363636363636376"
                  />
                )}
              </g>
            </svg>
          </div>
        );

      case "voltage_source":
        return (
          <svg
            width="90"
            height="90"
            viewBox="-5 -5 90 90"
            style={{ overflow: "visible" }}
          >
            {/* 연결선 */}
            <line
              x1="40"
              y1="0"
              x2="40"
              y2="15"
              stroke={strokeColor}
              strokeWidth="2"
            />
            <line
              x1="40"
              y1="65"
              x2="40"
              y2="80"
              stroke={strokeColor}
              strokeWidth="2"
            />

            {/* 원 */}
            <circle
              cx="40"
              cy="40"
              r="25"
              stroke={strokeColor}
              strokeWidth="2"
              fill="white"
            />

            {/* V 표시 */}
            <text
              x="40"
              y="45"
              textAnchor="middle"
              fontSize="20"
              fill={strokeColor}
              fontWeight="bold"
            >
              V
            </text>

            {/* 라벨 */}
            <text
              x="70"
              y="45"
              textAnchor="start"
              fontSize="12"
              fill={strokeColor}
              fontWeight="bold"
            >
              {label}
            </text>

            {/* 연결 포인트 - 연결되지 않은 경우에만 표시 */}
            {!isHandleConnected("top") && (
              <circle
                cx="40"
                cy="0"
                r="4"
                fill={strokeColor}
                style={{ pointerEvents: "none" }}
              />
            )}
            {!isHandleConnected("bottom") && (
              <circle
                cx="40"
                cy="80"
                r="4"
                fill={strokeColor}
                style={{ pointerEvents: "none" }}
              />
            )}
          </svg>
        );

      case "capacitor":
        // Capacitor.svg 내용을 직접 인라인으로 렌더링하여 텍스트를 동적으로 변경
        return (
          <div className="relative" style={{ width: "100px", height: "100px" }}>
            <svg height="100" viewBox="0 0 100 100" width="100" xmlns="http://www.w3.org/2000/svg">
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
                <text 
                  fill={strokeColor}
                  fontSize="11.64px" 
                  fontWeight="bold" 
                  textAnchor="start" 
                  x="70.45454545454547" 
                  y="50.0"
                >
                  <tspan dy="-1.7454545454545456">
                    {data.properties.label || "C"}
                  </tspan>
                  <tspan dy="13.963636363636367" x="70.45454545454547">
                    {data.properties.capacitance ? `${data.properties.capacitance * 1000000} µF` : "1 µF"}
                  </tspan>
                </text>
                {/* 연결 포인트 - 연결되지 않은 경우에만 표시 */}
                {!isHandleConnected("top") && (
                  <circle 
                    cx="47.72727272727273" 
                    cy="13.63636363636363" 
                    fill={strokeColor}
                    r="3.6363636363636376"
                  />
                )}
                {!isHandleConnected("bottom") && (
                  <circle 
                    cx="47.72727272727273" 
                    cy="86.36363636363637" 
                    fill={strokeColor}
                    r="3.6363636363636376"
                  />
                )}
              </g>
            </svg>
          </div>
        );

      case "inductor":
        // Inductor.svg 내용을 직접 인라인으로 렌더링하여 텍스트를 동적으로 변경
        return (
          <div className="relative" style={{ width: "100px", height: "100px" }}>
            <svg height="100" viewBox="0 0 100 100" width="100" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path 
                  d="M48.8637575272728,60.226705454545396C60.227636072727435,62.499505454545485,60.227636072727435,71.59055999999993,48.8637575272728,73.8632872727272" 
                  fill="none" 
                  stroke={strokeColor}
                  strokeLinecap="round" 
                  strokeMiterlimit="6" 
                  strokeWidth="2"
                />
                <path 
                  d="M48.8637575272728,60.226705454545396C37.499878836363564,57.95383272727277,37.499878836363564,64.77223272727275,48.8637575272728,62.499505454545485" 
                  fill="none" 
                  stroke={strokeColor}
                  strokeLinecap="round" 
                  strokeMiterlimit="6" 
                  strokeWidth="2"
                />
                <path 
                  d="M48.8637575272728,26.135069090908996C60.227636072727435,28.407840000000114,60.227636072727435,37.49893818181815,48.8637575272728,39.771716363636436" 
                  fill="none" 
                  stroke={strokeColor}
                  strokeLinecap="round" 
                  strokeMiterlimit="6" 
                  strokeWidth="2"
                />
                <path 
                  d="M48.8637575272728,37.49893818181815C60.227636072727435,39.771716363636436,60.227636072727435,48.86285090909087,48.8637575272728,51.13565090909095" 
                  fill="none" 
                  stroke={strokeColor}
                  strokeLinecap="round" 
                  strokeMiterlimit="6" 
                  strokeWidth="2"
                />
                <path 
                  d="M48.8637575272728,48.86285090909087C60.227636072727435,51.13565090909095,60.227636072727435,60.226705454545396,48.8637575272728,62.499505454545485" 
                  fill="none" 
                  stroke={strokeColor}
                  strokeLinecap="round" 
                  strokeMiterlimit="6" 
                  strokeWidth="2"
                />
                <path 
                  d="M48.8637575272728,37.49893818181815C37.499878836363564,35.22617454545446,37.499878836363564,42.04448727272729,48.8637575272728,39.771716363636436" 
                  fill="none" 
                  stroke={strokeColor}
                  strokeLinecap="round" 
                  strokeMiterlimit="6" 
                  strokeWidth="2"
                />
                <path 
                  d="M48.8637575272728,48.86285090909087C37.499878836363564,46.59004363636361,37.499878836363564,53.40837818181822,48.8637575272728,51.13565090909095" 
                  fill="none" 
                  stroke={strokeColor}
                  strokeLinecap="round" 
                  strokeMiterlimit="6" 
                  strokeWidth="2"
                />
                <path 
                  d="M48.8637575272728,86.36363636363637L48.8637575272728,73.8632872727272" 
                  fill="none" 
                  stroke={strokeColor}
                  strokeLinecap="round" 
                  strokeMiterlimit="6" 
                  strokeWidth="2"
                />
                <path 
                  d="M48.8637575272728,13.63636363636363L48.8637575272728,26.135069090908996" 
                  fill="none" 
                  stroke={strokeColor}
                  strokeLinecap="round" 
                  strokeMiterlimit="6" 
                  strokeWidth="2"
                />
                <text 
                  fill={strokeColor}
                  fontSize="11.64px" 
                  fontWeight="bold" 
                  textAnchor="start" 
                  x="62.50012116363644" 
                  y="50.0"
                >
                  <tspan dy="-1.7454545454545456">
                    {data.properties.label || "L"}
                  </tspan>
                  <tspan dy="13.963636363636367" x="62.50012116363644">
                    {data.properties.inductance ? `${data.properties.inductance * 1000000} µH` : "1 µH"}
                  </tspan>
                </text>
                {/* 연결 포인트 - 연결되지 않은 경우에만 표시 */}
                {!isHandleConnected("top") && (
                  <circle 
                    cx="48.8637575272728" 
                    cy="13.63636363636363" 
                    fill={strokeColor}
                    r="3.6363636363636376"
                  />
                )}
                {!isHandleConnected("bottom") && (
                  <circle 
                    cx="48.8637575272728" 
                    cy="86.36363636363637" 
                    fill={strokeColor}
                    r="3.6363636363636376"
                  />
                )}
              </g>
            </svg>
          </div>
        );

      case "opamp":
        return (
          <svg
            width="160"
            height="160"
            viewBox="-5 -5 160 160"
            style={{ overflow: "visible" }}
          >
            {/* 삼각형 본체 */}
            <path
              d="M137.5,75L12.5,12.5L12.5,137.5L137.5,75Z"
              fill="white"
              stroke={strokeColor}
              strokeWidth="2"
            />

            {/* - 기호 (왼쪽 상단 입력) */}
            <path
              d="M20.24,49.30L20.24,51.00L36.40,51.00L36.40,49.30L20.24,49.30"
              fill={strokeColor}
            />

            {/* + 기호 (왼쪽 하단 입력) */}
            <path
              d="M29.14,91.78L27.44,91.78L27.44,99.15L20.13,99.15L20.13,100.85L27.44,100.85L27.44,108.22L29.14,108.22L29.14,100.85L36.44,100.85L36.44,99.15L29.14,99.15L29.14,91.78"
              fill={strokeColor}
            />

            {/* 연결선 */}
            <line
              x1="150"
              y1="75"
              x2="150"
              y2="75"
              stroke={strokeColor}
              strokeWidth="2"
            />
            <line
              x1="0"
              y1="100"
              x2="0"
              y2="100"
              stroke={strokeColor}
              strokeWidth="2"
            />
            <line
              x1="0"
              y1="50"
              x2="0"
              y2="50"
              stroke={strokeColor}
              strokeWidth="2"
            />
            <line
              x1="75"
              y1="125"
              x2="75"
              y2="125"
              stroke={strokeColor}
              strokeWidth="2"
            />
            <line
              x1="75"
              y1="25"
              x2="75"
              y2="25"
              stroke={strokeColor}
              strokeWidth="2"
            />

            {/* 라벨 */}
            <text
              x="37.5"
              y="75"
              textAnchor="start"
              fontSize="12"
              fill={strokeColor}
              fontWeight="bold"
            >
              {data.properties.label || "OA"}
            </text>
            <text
              x="37.5"
              y="90"
              textAnchor="start"
              fontSize="10"
              fill={strokeColor}
            >
              {label}
            </text>

            {/* 연결 포인트 - 연결되지 않은 경우에만 표시 */}
            {!isHandleConnected("in-minus") && (
              <circle
                cx="0"
                cy="50"
                r="4"
                fill={strokeColor}
                style={{ pointerEvents: "none" }}
              />
            )}
            {!isHandleConnected("in-plus") && (
              <circle
                cx="0"
                cy="100"
                r="4"
                fill={strokeColor}
                style={{ pointerEvents: "none" }}
              />
            )}
            {!isHandleConnected("out") && (
              <circle
                cx="150"
                cy="75"
                r="4"
                fill={strokeColor}
                style={{ pointerEvents: "none" }}
              />
            )}
            {!isHandleConnected("v-plus") && (
              <circle
                cx="75"
                cy="25"
                r="4"
                fill={strokeColor}
                style={{ pointerEvents: "none" }}
              />
            )}
            {!isHandleConnected("v-minus") && (
              <circle
                cx="75"
                cy="125"
                r="4"
                fill={strokeColor}
                style={{ pointerEvents: "none" }}
              />
            )}
          </svg>
        );

      default:
        return null;
    }
  };

  const getHandlePositions = () => {
    switch (data.type) {
      case "resistor":
        // Resistor.svg: viewBox="0 0 100 100", circle at cx=47.909, cy=13.636 (top), cy=86.364 (bottom)
        return {
          top: { x: 47.909, y: 13.636 },
          bottom: { x: 47.909, y: 86.364 },
        };
      case "capacitor":
        // Capacitor.svg: viewBox="0 0 100 100", circle at cx=47.727, cy=13.636 (top), cy=86.364 (bottom)
        return {
          top: { x: 47.727, y: 13.636 },
          bottom: { x: 47.727, y: 86.364 },
        };
      case "voltage_source":
        // SVG: width=90, height=90, viewBox="-5 -5 90 90"
        // circle: cx=40,cy=0 -> 화면: (45, 5)
        // circle: cx=40,cy=80 -> 화면: (45, 85)
        return {
          top: { x: 45, y: 5 },
          bottom: { x: 45, y: 85 },
        };
      case "inductor":
        // Inductor.svg: viewBox="0 0 100 100", circle at cx=48.864, cy=13.636 (top), cy=86.364 (bottom)
        return {
          top: { x: 48.864, y: 13.636 },
          bottom: { x: 48.864, y: 86.364 },
        };
      case "opamp":
        // SVG: width=160, height=160, viewBox="-5 -5 160 160"
        // circle: cx=0,cy=50 -> 화면: (5, 55) - 왼쪽 상단 (-)
        // circle: cx=0,cy=100 -> 화면: (5, 105) - 왼쪽 하단 (+)
        // circle: cx=150,cy=75 -> 화면: (155, 80) - 오른쪽 출력
        // circle: cx=75,cy=25 -> 화면: (80, 30) - 상단 전원 (V+)
        // circle: cx=75,cy=125 -> 화면: (80, 130) - 하단 전원 (V-)
        return {
          "in-minus": { x: 5, y: 55 },
          "in-plus": { x: 5, y: 105 },
          out: { x: 155, y: 80 },
          "v-plus": { x: 80, y: 30 },
          "v-minus": { x: 80, y: 130 },
        };
      default:
        return {};
    }
  };

  const handles = getHandlePositions();

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {renderComponent()}

      {/* Handle 연결점 - circle 위치와 정확히 일치 */}
      {/* source만 사용하여 양방향 연결 (ConnectionMode.Loose 필요) */}
      {"top" in handles && handles.top && (
        <Handle
          type="source"
          position={Position.Top}
          id="top"
          isConnectable={true}
          className="!absolute"
          style={{
            left: `${handles.top.x}px`,
            top: `${handles.top.y}px`,
            width: "10px",
            height: "10px",
            background: "transparent",
            border: "none",
            transform: "translate(-50%, -50%)",
            cursor: "crosshair",
          }}
        />
      )}

      {"bottom" in handles && handles.bottom && (
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottom"
          isConnectable={true}
          className="!absolute"
          style={{
            left: `${handles.bottom.x}px`,
            top: `${handles.bottom.y}px`,
            width: "10px",
            height: "10px",
            background: "transparent",
            border: "none",
            transform: "translate(-50%, -50%)",
            cursor: "crosshair",
          }}
        />
      )}

      {/* Op-amp 전용 Handle들 */}
      {"in-minus" in handles && handles["in-minus"] && (
        <Handle
          type="source"
          position={Position.Left}
          id="in-minus"
          isConnectable={true}
          className="!absolute"
          style={{
            left: `${handles["in-minus"].x}px`,
            top: `${handles["in-minus"].y}px`,
            width: "10px",
            height: "10px",
            background: "transparent",
            border: "none",
            transform: "translate(-50%, -50%)",
            cursor: "crosshair",
          }}
        />
      )}

      {"in-plus" in handles && handles["in-plus"] && (
        <Handle
          type="source"
          position={Position.Left}
          id="in-plus"
          isConnectable={true}
          className="!absolute"
          style={{
            left: `${handles["in-plus"].x}px`,
            top: `${handles["in-plus"].y}px`,
            width: "10px",
            height: "10px",
            background: "transparent",
            border: "none",
            transform: "translate(-50%, -50%)",
            cursor: "crosshair",
          }}
        />
      )}

      {"out" in handles && handles["out"] && (
        <Handle
          type="source"
          position={Position.Right}
          id="out"
          isConnectable={true}
          className="!absolute"
          style={{
            left: `${handles["out"].x}px`,
            top: `${handles["out"].y}px`,
            width: "10px",
            height: "10px",
            background: "transparent",
            border: "none",
            transform: "translate(-50%, -50%)",
            cursor: "crosshair",
          }}
        />
      )}

      {"v-plus" in handles && handles["v-plus"] && (
        <Handle
          type="source"
          position={Position.Top}
          id="v-plus"
          isConnectable={true}
          className="!absolute"
          style={{
            left: `${handles["v-plus"].x}px`,
            top: `${handles["v-plus"].y}px`,
            width: "10px",
            height: "10px",
            background: "transparent",
            border: "none",
            transform: "translate(-50%, -50%)",
            cursor: "crosshair",
          }}
        />
      )}

      {"v-minus" in handles && handles["v-minus"] && (
        <Handle
          type="source"
          position={Position.Bottom}
          id="v-minus"
          isConnectable={true}
          className="!absolute"
          style={{
            left: `${handles["v-minus"].x}px`,
            top: `${handles["v-minus"].y}px`,
            width: "10px",
            height: "10px",
            background: "transparent",
            border: "none",
            transform: "translate(-50%, -50%)",
            cursor: "crosshair",
          }}
        />
      )}
    </div>
  );
});

CircuitNode.displayName = "CircuitNode";

export default CircuitNode;
