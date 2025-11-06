'use client';

import { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  ReactFlowProvider,
  ReactFlowInstance,
  ConnectionLineType,
  ConnectionMode,
} from 'reactflow';
import 'reactflow/dist/style.css';

import CircuitNode from './CircuitNode';
import ComponentSidebar from './ComponentSidebar';
import PropertiesPanel from './PropertiesPanel';
import { CircuitNode as CircuitNodeType, CircuitEdge, ComponentTemplate, ComponentProperties } from '../types';

const nodeTypes = {
  circuit: CircuitNode,
};

// 기본 edge 스타일 설정
const defaultEdgeOptions = {
  type: 'smoothstep',
  animated: false,
  style: { 
    strokeWidth: 2, 
    stroke: '#000000' // 검정색 실선
  },
};

function CircuitCanvasContent() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [selectedNode, setSelectedNode] = useState<CircuitNodeType | null>(null);
  const [nodeIdCounter, setNodeIdCounter] = useState(1);

  const onConnect = useCallback(
    (params: Connection) => {
      console.log('Connection params:', params);
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const isValidConnection = useCallback(() => {
    // 모든 연결 허용
    return true;
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const templateData = event.dataTransfer.getData('application/reactflow');

      if (!templateData) return;

      const template: ComponentTemplate = JSON.parse(templateData);
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: CircuitNodeType = {
        id: `node-${nodeIdCounter}`,
        type: 'circuit',
        position,
        data: {
          type: template.type,
          properties: { ...template.defaultProperties },
        },
      };

      setNodes((nds) => nds.concat(newNode));
      setNodeIdCounter((prev) => prev + 1);
    },
    [reactFlowInstance, nodeIdCounter, setNodes]
  );

  const onNodeClick = useCallback((_event: React.MouseEvent, node: CircuitNodeType) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onEdgeDoubleClick = useCallback(
    (_event: React.MouseEvent, edge: CircuitEdge) => {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    },
    [setEdges]
  );

  const handleUpdateProperties = useCallback(
    (nodeId: string, properties: ComponentProperties) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                properties,
              },
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  return (
    <div className="flex h-screen w-full">
      <ComponentSidebar />
      
      <div className="flex-1 relative" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          isValidConnection={isValidConnection}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onEdgeDoubleClick={onEdgeDoubleClick}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineType={ConnectionLineType.SmoothStep}
          connectionLineStyle={{ strokeWidth: 2, stroke: '#000000' }}
          connectionMode={ConnectionMode.Loose}
          fitView
          className="bg-gray-50"
        >
          <Background color="#aaa" gap={16} />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              switch (node.data.type) {
                case 'resistor':
                  return '#fbbf24';
                case 'voltage_source':
                  return '#3b82f6';
                case 'capacitor':
                  return '#10b981';
                case 'inductor':
                  return '#8b5cf6';
                default:
                  return '#6b7280';
              }
            }}
          />
        </ReactFlow>

        <PropertiesPanel
          selectedNode={selectedNode}
          onUpdateProperties={handleUpdateProperties}
          onClose={() => setSelectedNode(null)}
        />
      </div>
    </div>
  );
}

export default function CircuitCanvas() {
  return (
    <ReactFlowProvider>
      <CircuitCanvasContent />
    </ReactFlowProvider>
  );
}
