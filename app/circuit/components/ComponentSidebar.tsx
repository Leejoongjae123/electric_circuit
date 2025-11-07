'use client';

import { ComponentTemplate } from '../types';
import { useState } from 'react';
import { Search } from 'lucide-react';
import ResistorIcon from './ResistorIcon';

const componentTemplates: ComponentTemplate[] = [
  {
    type: 'resistor',
    label: 'Resistor',
    icon: '/elements/Resistor.svg',
    defaultProperties: {
      resistance: 100,
      label: 'R1',
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
      
      <div className="mb-4">
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

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {filteredTemplates.map((template) => (
            <div
              key={template.type}
              draggable
              onDragStart={(e) => onDragStart(e, template)}
              className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border-2 border-gray-200 cursor-move hover:bg-gray-100 hover:border-blue-400 transition-all group"
            >
              <div className="flex items-center justify-center">
                {template.type === 'resistor' && <ResistorIcon />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
