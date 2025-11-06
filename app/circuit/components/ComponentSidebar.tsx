'use client';

import { ComponentTemplate } from '../types';

const componentTemplates: ComponentTemplate[] = [
  {
    type: 'resistor',
    label: '저항',
    icon: '🔲',
    defaultProperties: {
      resistance: 100,
      label: 'R1',
    },
  },
  {
    type: 'voltage_source',
    label: '전원',
    icon: '⚡',
    defaultProperties: {
      voltage: 5,
      label: 'V1',
    },
  },
  {
    type: 'capacitor',
    label: '커패시터',
    icon: '⚊⚊',
    defaultProperties: {
      capacitance: 0.001,
      label: 'C1',
    },
  },
  {
    type: 'inductor',
    label: '인덕터',
    icon: '🔄',
    defaultProperties: {
      inductance: 0.000001,
      label: 'L1',
    },
  },
  {
    type: 'opamp',
    label: 'Op-Amp',
    icon: '△',
    defaultProperties: {
      model: 'TL081',
      label: 'OA1',
    },
  },
];

export default function ComponentSidebar() {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    template: ComponentTemplate
  ) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(template));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-gray-900">회로 요소</h2>
      <div className="space-y-2">
        {componentTemplates.map((template) => (
          <div
            key={template.type}
            draggable
            onDragStart={(e) => onDragStart(e, template)}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border-2 border-gray-200 cursor-move hover:bg-gray-100 hover:border-blue-400 transition-all"
          >
            <span className="text-2xl">{template.icon}</span>
            <div className="flex-1">
              <div className="font-medium text-gray-900">{template.label}</div>
              <div className="text-xs text-gray-500">
                {template.type === 'resistor' && `${template.defaultProperties.resistance}Ω`}
                {template.type === 'voltage_source' && `${template.defaultProperties.voltage}V`}
                {template.type === 'capacitor' && `${template.defaultProperties.capacitance}F`}
                {template.type === 'inductor' && `${template.defaultProperties.inductance! * 1000000}µH`}
                {template.type === 'opamp' && template.defaultProperties.model}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-3 bg-blue-50 rounded-lg text-sm text-gray-700">
        <p className="font-medium mb-1">사용 방법:</p>
        <ul className="text-xs space-y-1 list-disc list-inside">
          <li>요소를 드래그하여 캔버스에 배치</li>
          <li>요소를 클릭하여 속성 편집</li>
          <li>상하단 포인트로 와이어 연결</li>
        </ul>
      </div>
    </div>
  );
}
