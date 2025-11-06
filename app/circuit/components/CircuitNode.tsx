'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { CircuitNodeData } from '../types';

const CircuitNode = memo(({ data, selected }: NodeProps<CircuitNodeData>) => {
  const getLabel = () => {
    if (data.properties.label) return data.properties.label;
    
    switch (data.type) {
      case 'resistor':
        return data.properties.resistance 
          ? `${data.properties.resistance}Ω` 
          : '저항';
      case 'voltage_source':
        return data.properties.voltage 
          ? `${data.properties.voltage}V` 
          : '전원';
      case 'capacitor':
        return data.properties.capacitance 
          ? `${data.properties.capacitance}F` 
          : '커패시터';
      case 'inductor':
        return data.properties.inductance 
          ? `${data.properties.inductance * 1000000}µH` 
          : '인덕터';
      default:
        return '';
    }
  };

  const renderComponent = () => {
    const label = getLabel();
    const strokeColor = selected ? '#3b82f6' : '#3b4449';
    
    switch (data.type) {
      case 'resistor':
        return (
          <svg width="110" height="70" viewBox="-5 -5 110 70" style={{ overflow: 'visible' }}>
            {/* 연결선 */}
            <line x1="0" y1="30" x2="20" y2="30" stroke={strokeColor} strokeWidth="2" />
            <line x1="80" y1="30" x2="100" y2="30" stroke={strokeColor} strokeWidth="2" />
            
            {/* 저항 지그재그 */}
            <path
              d="M 20 30 L 25 20 L 35 40 L 45 20 L 55 40 L 65 20 L 75 40 L 80 30"
              stroke={strokeColor}
              strokeWidth="2"
              fill="none"
            />
            
            {/* 라벨 */}
            <text x="50" y="55" textAnchor="middle" fontSize="12" fill={strokeColor} fontWeight="bold">
              {label}
            </text>
            
            {/* 연결 포인트 */}
            <circle cx="0" cy="30" r="4" fill={strokeColor} style={{ pointerEvents: 'none' }} />
            <circle cx="100" cy="30" r="4" fill={strokeColor} style={{ pointerEvents: 'none' }} />
          </svg>
        );
        
      case 'voltage_source':
        return (
          <svg width="90" height="90" viewBox="-5 -5 90 90" style={{ overflow: 'visible' }}>
            {/* 연결선 */}
            <line x1="40" y1="0" x2="40" y2="15" stroke={strokeColor} strokeWidth="2" />
            <line x1="40" y1="65" x2="40" y2="80" stroke={strokeColor} strokeWidth="2" />
            
            {/* 원 */}
            <circle cx="40" cy="40" r="25" stroke={strokeColor} strokeWidth="2" fill="white" />
            
            {/* V 표시 */}
            <text x="40" y="45" textAnchor="middle" fontSize="20" fill={strokeColor} fontWeight="bold">
              V
            </text>
            
            {/* 라벨 */}
            <text x="70" y="45" textAnchor="start" fontSize="12" fill={strokeColor} fontWeight="bold">
              {label}
            </text>
            
            {/* 연결 포인트 */}
            <circle cx="40" cy="0" r="4" fill={strokeColor} style={{ pointerEvents: 'none' }} />
            <circle cx="40" cy="80" r="4" fill={strokeColor} style={{ pointerEvents: 'none' }} />
          </svg>
        );
        
      case 'capacitor':
        return (
          <svg width="90" height="70" viewBox="-5 -5 90 70" style={{ overflow: 'visible' }}>
            {/* 연결선 */}
            <line x1="0" y1="30" x2="35" y2="30" stroke={strokeColor} strokeWidth="2" />
            <line x1="45" y1="30" x2="80" y2="30" stroke={strokeColor} strokeWidth="2" />
            
            {/* 커패시터 판 */}
            <line x1="35" y1="10" x2="35" y2="50" stroke={strokeColor} strokeWidth="3" />
            <line x1="45" y1="10" x2="45" y2="50" stroke={strokeColor} strokeWidth="3" />
            
            {/* 라벨 */}
            <text x="40" y="8" textAnchor="middle" fontSize="12" fill={strokeColor} fontWeight="bold">
              {label}
            </text>
            
            {/* 연결 포인트 */}
            <circle cx="0" cy="30" r="4" fill={strokeColor} style={{ pointerEvents: 'none' }} />
            <circle cx="80" cy="30" r="4" fill={strokeColor} style={{ pointerEvents: 'none' }} />
          </svg>
        );
        
      case 'inductor':
        return (
          <svg width="90" height="130" viewBox="-5 -5 90 130" style={{ overflow: 'visible' }}>
            {/* 상단 연결선 */}
            <line x1="40" y1="0" x2="40" y2="17.19" stroke={strokeColor} strokeWidth="2" />
            
            {/* 코일 - 오른쪽 */}
            <path d="M40,17.19C55.63,20.31,55.63,32.81,40,35.94" fill="none" stroke={strokeColor} strokeWidth="2" />
            <path d="M40,32.81C55.63,35.94,55.63,48.44,40,51.56" fill="none" stroke={strokeColor} strokeWidth="2" />
            <path d="M40,48.44C55.63,51.56,55.63,64.06,40,67.19" fill="none" stroke={strokeColor} strokeWidth="2" />
            <path d="M40,64.06C55.63,67.19,55.63,79.69,40,82.81" fill="none" stroke={strokeColor} strokeWidth="2" />
            
            {/* 코일 - 왼쪽 */}
            <path d="M40,32.81C24.37,29.69,24.37,39.06,40,35.94" fill="none" stroke={strokeColor} strokeWidth="2" />
            <path d="M40,48.44C24.37,45.31,24.37,54.69,40,51.56" fill="none" stroke={strokeColor} strokeWidth="2" />
            <path d="M40,64.06C24.37,60.94,24.37,70.31,40,67.19" fill="none" stroke={strokeColor} strokeWidth="2" />
            
            {/* 하단 연결선 */}
            <line x1="40" y1="82.81" x2="40" y2="100" stroke={strokeColor} strokeWidth="2" />
            
            {/* 라벨 */}
            <text x="60" y="55" textAnchor="start" fontSize="12" fill={strokeColor} fontWeight="bold">
              {label}
            </text>
            
            {/* 연결 포인트 (circle) */}
            <circle cx="40" cy="0" r="4" fill={strokeColor} style={{ pointerEvents: 'none' }} />
            <circle cx="40" cy="100" r="4" fill={strokeColor} style={{ pointerEvents: 'none' }} />
          </svg>
        );
        
      default:
        return null;
    }
  };

  // SVG viewBox 좌표를 실제 화면 좌표로 변환
  // viewBox가 -5 -5로 시작하므로, SVG 좌표에 +5를 더해야 실제 화면 좌표
  const getHandlePositions = () => {
    switch (data.type) {
      case 'resistor':
        // SVG: width=110, height=70, viewBox="-5 -5 110 70"
        // circle: cx=0,cy=30 -> 화면: (0+5, 30+5) = (5, 35)
        // circle: cx=100,cy=30 -> 화면: (100+5, 30+5) = (105, 35)
        return {
          left: { x: 5, y: 35 },
          right: { x: 105, y: 35 },
        };
      case 'capacitor':
        // SVG: width=90, height=70, viewBox="-5 -5 90 70"
        // circle: cx=0,cy=30 -> 화면: (5, 35)
        // circle: cx=80,cy=30 -> 화면: (85, 35)
        return {
          left: { x: 5, y: 35 },
          right: { x: 85, y: 35 },
        };
      case 'voltage_source':
        // SVG: width=90, height=90, viewBox="-5 -5 90 90"
        // circle: cx=40,cy=0 -> 화면: (45, 5)
        // circle: cx=40,cy=80 -> 화면: (45, 85)
        return {
          top: { x: 45, y: 5 },
          bottom: { x: 45, y: 85 },
        };
      case 'inductor':
        // SVG: width=90, height=130, viewBox="-5 -5 90 130"
        // circle: cx=40,cy=0 -> 화면: (45, 5)
        // circle: cx=40,cy=100 -> 화면: (45, 105)
        return {
          top: { x: 45, y: 5 },
          bottom: { x: 45, y: 105 },
        };
      default:
        return {};
    }
  };

  const handles = getHandlePositions();

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {renderComponent()}
      
      {/* Handle 연결점 - circle 위치와 정확히 일치 */}
      {/* source만 사용하여 양방향 연결 (ConnectionMode.Loose 필요) */}
      {handles.left && (
        <Handle
          type="source"
          position={Position.Left}
          id="left"
          isConnectable={true}
          className="!absolute"
          style={{ 
            left: `${handles.left.x}px`, 
            top: `${handles.left.y}px`,
            width: '10px',
            height: '10px',
            background: 'transparent',
            border: 'none',
            transform: 'translate(-50%, -50%)',
            cursor: 'crosshair',
          }}
        />
      )}
      
      {handles.right && (
        <Handle
          type="source"
          position={Position.Right}
          id="right"
          isConnectable={true}
          className="!absolute"
          style={{ 
            left: `${handles.right.x}px`, 
            top: `${handles.right.y}px`,
            width: '10px',
            height: '10px',
            background: 'transparent',
            border: 'none',
            transform: 'translate(-50%, -50%)',
            cursor: 'crosshair',
          }}
        />
      )}
      
      {handles.top && (
        <Handle
          type="source"
          position={Position.Top}
          id="top"
          isConnectable={true}
          className="!absolute"
          style={{ 
            left: `${handles.top.x}px`, 
            top: `${handles.top.y}px`,
            width: '10px',
            height: '10px',
            background: 'transparent',
            border: 'none',
            transform: 'translate(-50%, -50%)',
            cursor: 'crosshair',
          }}
        />
      )}
      
      {handles.bottom && (
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottom"
          isConnectable={true}
          className="!absolute"
          style={{ 
            left: `${handles.bottom.x}px`, 
            top: `${handles.bottom.y}px`,
            width: '10px',
            height: '10px',
            background: 'transparent',
            border: 'none',
            transform: 'translate(-50%, -50%)',
            cursor: 'crosshair',
          }}
        />
      )}
    </div>
  );
});

CircuitNode.displayName = 'CircuitNode';

export default CircuitNode;
