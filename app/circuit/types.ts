import { Node, Edge } from "reactflow";

export type ComponentType =
  | "resistor"
  | "voltage_source"
  | "current_source"
  | "capacitor"
  | "inductor"
  | "opamp"
  | "ground"
  | "name_node"
  | "csv_voltage_source"
  | "voltage_function_generator"
  | "voltage_step"
  | "current_function_generator"
  | "current_step"
  | "csv_current_source";

export interface ComponentProperties {
  resistance?: number; // 저항값 (Ω)
  voltage?: number; // 전압값 (V)
  current?: number; // 전류값 (A)
  capacitance?: number; // 커패시턴스 (F)
  inductance?: number; // 인덕턴스 (H)
  model?: string; // Op-amp 모델명
  label?: string; // 라벨
}

export interface CircuitNodeData {
  type: ComponentType;
  properties: ComponentProperties;
  connectedHandles?: string[]; // 연결된 핸들 ID 목록
}

export type CircuitNode = Node<CircuitNodeData>;
export type CircuitEdge = Edge;

export interface ComponentTemplate {
  type: ComponentType;
  label: string;
  icon: string;
  defaultProperties: ComponentProperties;
}
