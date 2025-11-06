import { Node, Edge } from 'reactflow';

export type ComponentType = 'resistor' | 'voltage_source' | 'capacitor' | 'inductor' | 'opamp';

export interface ComponentProperties {
  resistance?: number; // 저항값 (Ω)
  voltage?: number; // 전압값 (V)
  capacitance?: number; // 커패시턴스 (F)
  inductance?: number; // 인덕턴스 (H)
  model?: string; // Op-amp 모델명
  label?: string; // 라벨
}

export interface CircuitNodeData {
  type: ComponentType;
  properties: ComponentProperties;
}

export type CircuitNode = Node<CircuitNodeData>;
export type CircuitEdge = Edge;

export interface ComponentTemplate {
  type: ComponentType;
  label: string;
  icon: string;
  defaultProperties: ComponentProperties;
}
