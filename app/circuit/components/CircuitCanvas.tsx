"use client";

import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  ReactFlowProvider,
  ReactFlowInstance,
  ConnectionLineType,
  ConnectionMode,
} from "reactflow";
import "reactflow/dist/style.css";

import CircuitNode from "./CircuitNode";
import ComponentSidebar from "./ComponentSidebar";
import PropertiesPanel from "./PropertiesPanel";
import {
  CircuitNode as CircuitNodeType,
  CircuitEdge,
  ComponentTemplate,
  ComponentProperties,
} from "../types";

const nodeTypes = {
  circuit: CircuitNode,
};

// 기본 edge 스타일 설정
const defaultEdgeOptions = {
  type: "smoothstep",
  animated: false,
  style: {
    strokeWidth: 2,
    stroke: "#000000", // 검정색 실선
  },
};

function CircuitCanvasContent() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [selectedNode, setSelectedNode] = useState<CircuitNodeType | null>(
    null
  );
  const [nodeIdCounter, setNodeIdCounter] = useState(1);

  // 각 노드의 연결된 핸들 정보를 계산
  const getConnectedHandles = useCallback(() => {
    const connected = new Map<string, Set<string>>();

    edges.forEach((edge) => {
      const sourceKey = edge.source;
      const targetKey = edge.target;
      const sourceHandle = edge.sourceHandle || "default";
      const targetHandle = edge.targetHandle || "default";

      if (!connected.has(sourceKey)) {
        connected.set(sourceKey, new Set());
      }
      if (!connected.has(targetKey)) {
        connected.set(targetKey, new Set());
      }

      connected.get(sourceKey)?.add(sourceHandle);
      connected.get(targetKey)?.add(targetHandle);
    });

    return connected;
  }, [edges]);

  const onConnect = useCallback(
    (params: Connection) => {
      console.log("Connection params:", params);
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
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const templateData = event.dataTransfer.getData("application/reactflow");

      if (!templateData) return;

      const template: ComponentTemplate = JSON.parse(templateData);
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: CircuitNodeType = {
        id: `node-${nodeIdCounter}`,
        type: "circuit",
        position,
        data: {
          type: template.type,
          properties: { ...template.defaultProperties },
          connectedHandles: [],
        },
      };

      setNodes((nds) => nds.concat(newNode));
      setNodeIdCounter((prev) => prev + 1);
    },
    [reactFlowInstance, nodeIdCounter, setNodes]
  );

  // 노드 데이터에 연결 정보 업데이트
  const nodesWithConnections = nodes.map((node) => {
    const connectedHandles = getConnectedHandles();
    const nodeConnections = connectedHandles.get(node.id);

    return {
      ...node,
      data: {
        ...node.data,
        connectedHandles: nodeConnections ? Array.from(nodeConnections) : [],
      },
    };
  });

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: CircuitNodeType) => {
      setSelectedNode(node);
    },
    []
  );

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
          nodes={nodesWithConnections}
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
          connectionLineStyle={{ strokeWidth: 2, stroke: "#000000" }}
          connectionMode={ConnectionMode.Loose}
          fitView
          className="bg-gray-50"
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#aaa" gap={16} />
          <Controls />
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
