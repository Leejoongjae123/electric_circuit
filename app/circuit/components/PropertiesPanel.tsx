'use client';

import { useState } from 'react';
import { CircuitNode, ComponentProperties } from '../types';

interface PropertiesPanelProps {
  selectedNode: CircuitNode | null;
  onUpdateProperties: (nodeId: string, properties: ComponentProperties) => void;
  onClose: () => void;
}

function PropertiesPanelContent({
  selectedNode,
  onUpdateProperties,
  onClose,
}: PropertiesPanelProps) {
  const [properties, setProperties] = useState<ComponentProperties>(
    selectedNode?.data.properties || {}
  );

  if (!selectedNode) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProperties(selectedNode.id, properties);
    onClose();
  };

  const getTitle = () => {
    switch (selectedNode.data.type) {
      case 'resistor':
        return '저항 속성';
      case 'voltage_source':
        return '전원 속성';
      case 'capacitor':
        return '커패시터 속성';
      case 'inductor':
        return '인덕터 속성';
      default:
        return '속성';
    }
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-6 z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">{getTitle()}</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            라벨
          </label>
          <input
            type="text"
            value={properties.label || ''}
            onChange={(e) =>
              setProperties({ ...properties, label: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="예: R1, V1, C1"
          />
        </div>

        {selectedNode.data.type === 'resistor' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              저항값 (Ω)
            </label>
            <input
              type="number"
              step="0.01"
              value={properties.resistance || ''}
              onChange={(e) =>
                setProperties({
                  ...properties,
                  resistance: parseFloat(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="100"
            />
          </div>
        )}

        {selectedNode.data.type === 'voltage_source' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              전압 (V)
            </label>
            <input
              type="number"
              step="0.01"
              value={properties.voltage || ''}
              onChange={(e) =>
                setProperties({
                  ...properties,
                  voltage: parseFloat(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="5"
            />
          </div>
        )}

        {selectedNode.data.type === 'capacitor' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              커패시턴스 (F)
            </label>
            <input
              type="number"
              step="0.000001"
              value={properties.capacitance || ''}
              onChange={(e) =>
                setProperties({
                  ...properties,
                  capacitance: parseFloat(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.001"
            />
            <p className="mt-1 text-xs text-gray-500">
              예: 0.001 = 1mF, 0.000001 = 1μF
            </p>
          </div>
        )}

        {selectedNode.data.type === 'inductor' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              인덕턴스 (H)
            </label>
            <input
              type="number"
              step="0.000001"
              value={properties.inductance || ''}
              onChange={(e) =>
                setProperties({
                  ...properties,
                  inductance: parseFloat(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.000001"
            />
            <p className="mt-1 text-xs text-gray-500">
              예: 0.000001 = 1μH, 0.001 = 1mH
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium"
          >
            적용
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors font-medium"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default function PropertiesPanel(props: PropertiesPanelProps) {
  if (!props.selectedNode) return null;
  
  // key prop으로 selectedNode 변경 시 컴포넌트 리셋
  return <PropertiesPanelContent key={props.selectedNode.id} {...props} />;
}
