'use client';

import { ComponentTemplate } from '../types';
import { useState } from 'react';
import { Search } from 'lucide-react';

const componentTemplates: ComponentTemplate[] = [
  {
    type: 'resistor',
    label: 'Resistor',
    icon: '🔲',
    defaultProperties: {
      resistance: 100,
      label: 'R1',
    },
  },
  {
    type: 'voltage_source',
    label: 'Voltage Source',
    icon: '⚡',
    defaultProperties: {
      voltage: 5,
      label: 'V1',
    },
  },
  {
    type: 'capacitor',
    label: 'Capacitor',
    icon: '⚊⚊',
    defaultProperties: {
      capacitance: 0.001,
      label: 'C1',
    },
  },
  {
    type: 'inductor',
    label: 'Inductor',
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
  const [searchQuery, setSearchQuery] = useState('');
  
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    template: ComponentTemplate
  ) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(template));
    event.dataTransfer.effectAllowed = 'move';
  };

  const filteredTemplates = componentTemplates.filter((template) =>
    template.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto flex flex-col h-full">
      <h2 className="text-lg font-bold mb-4 text-gray-900">요소</h2>
      
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-3 gap-3">
          {filteredTemplates.map((template) => (
            <div
              key={template.type}
              draggable
              onDragStart={(e) => onDragStart(e, template)}
              className="aspect-square flex items-center justify-center p-2 bg-gray-50 rounded-lg border-2 border-gray-200 cursor-move hover:bg-gray-100 hover:border-blue-400 transition-all"
            >
              <div className="text-center">
                <div className="font-medium text-gray-900 text-sm">{template.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="요소 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>
    </div>
  );
}
