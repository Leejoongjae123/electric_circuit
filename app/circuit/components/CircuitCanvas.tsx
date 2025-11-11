"use client";

import { useCallback, useRef, useState, useEffect } from "react";
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
  
  // Undo/Redo를 위한 히스토리 관리
  const [history, setHistory] = useState<Array<{ nodes: CircuitNodeType[], edges: CircuitEdge[] }>>([{ nodes: [], edges: [] }]);
  const [historyIndex, setHistoryIndex] = useState(0);

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

  // 히스토리에 현재 상태 저장
  const saveToHistory = useCallback(() => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ nodes: [...nodes], edges: [...edges] });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [nodes, edges, history, historyIndex]);

  const onConnect = useCallback(
    (params: Connection) => {
      console.log("Connection params:", params);
      saveToHistory();
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges, saveToHistory]
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

      saveToHistory();
      setNodes((nds) => nds.concat(newNode));
      setNodeIdCounter((prev) => prev + 1);
    },
    [reactFlowInstance, nodeIdCounter, setNodes, saveToHistory]
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
      saveToHistory();
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    },
    [setEdges, saveToHistory]
  );

  const handleUpdateProperties = useCallback(
    (nodeId: string, properties: ComponentProperties) => {
      saveToHistory();
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
    [setNodes, saveToHistory]
  );

  // Undo 기능
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setNodes(prevState.nodes);
      setEdges(prevState.edges);
      setHistoryIndex(historyIndex - 1);
      setSelectedNode(null);
    }
  }, [historyIndex, history, setNodes, setEdges]);

  // Delete 키로 선택된 노드/엣지 삭제, Ctrl+Z로 Undo
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+Z로 Undo
      if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
        undo();
        event.preventDefault();
        return;
      }

      if (event.key === 'Delete' || event.key === 'Backspace') {
        // 선택된 노드 삭제
        if (selectedNode) {
          // 삭제 전 현재 상태를 히스토리에 저장
          const newHistory = history.slice(0, historyIndex + 1);
          newHistory.push({ nodes: [...nodes], edges: [...edges] });
          setHistory(newHistory);
          setHistoryIndex(newHistory.length - 1);
          
          // 노드 삭제
          setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
          setEdges((eds) => eds.filter((edge) => 
            edge.source !== selectedNode.id && edge.target !== selectedNode.id
          ));
          setSelectedNode(null);
          event.preventDefault();
        } else {
          // 선택된 엣지 삭제 (ReactFlow의 기본 동작)
          const selectedEdges = edges.filter((edge) => edge.selected);
          if (selectedEdges.length > 0) {
            // 삭제 전 현재 상태를 히스토리에 저장
            const newHistory = history.slice(0, historyIndex + 1);
            newHistory.push({ nodes: [...nodes], edges: [...edges] });
            setHistory(newHistory);
            setHistoryIndex(newHistory.length - 1);
            
            setEdges((eds) => eds.filter((edge) => !edge.selected));
            event.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedNode, edges, nodes, history, historyIndex, setNodes, setEdges, setHistory, setHistoryIndex, undo]);

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
