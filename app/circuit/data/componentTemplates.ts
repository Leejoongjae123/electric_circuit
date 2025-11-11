import { ComponentTemplate } from "../types";

// Passive Elements (수동 소자)
export const passiveElements: ComponentTemplate[] = [
  {
    type: "resistor",
    label: "Resistor",
    icon: "/elements/Resistor.svg",
    defaultProperties: {
      resistance: 100,
      label: "R1",
    },
  },
  {
    type: "capacitor",
    label: "Capacitor",
    icon: "/elements/Capacitor.svg",
    defaultProperties: {
      capacitance: 0.000001,
      label: "C1",
    },
  },
  {
    type: "inductor",
    label: "Inductor",
    icon: "/elements/Inductor.svg",
    defaultProperties: {
      inductance: 0.000001,
      label: "L1",
    },
  },
];

// Active Elements (능동 소자) - 추후 추가 예정
export const activeElements: ComponentTemplate[] = [
  // {
  //   type: 'opamp',
  //   label: 'Op-Amp',
  //   icon: '/elements/OpAmp.svg',
  //   defaultProperties: {
  //     model: 'LM741',
  //     label: 'OA1',
  //   },
  // },
];

// Sources (전원)
export const sources: ComponentTemplate[] = [
  {
    type: "voltage_source",
    label: "Voltage Source",
    icon: "/elements/Voltage Source.svg",
    defaultProperties: {
      voltage: 5,
      label: "V1",
    },
  },
  {
    type: "current_source",
    label: "Current Source",
    icon: "/elements/Current Source.svg",
    defaultProperties: {
      current: 1,
      label: "I1",
    },
  },
];

// Voltage Signal Sources (신호 전압원)
export const voltageSignalSources: ComponentTemplate[] = [
  {
    type: "voltage_function_generator",
    label: "Voltage Function Generator",
    icon: "/elements/Voltage Function Generator.svg",
    defaultProperties: {
      voltage: 5,
      label: "V11",
    },
  },
  {
    type: "voltage_step",
    label: "Voltage Step",
    icon: "/elements/Voltage Step.svg",
    defaultProperties: {
      voltage: 5,
      label: "V12",
    },
  },
  {
    type: "csv_voltage_source",
    label: "CSV Voltage Source",
    icon: "/elements/CSV Voltage Source.svg",
    defaultProperties: {
      voltage: 5,
      label: "V10",
    },
  },
];

// Current Signal Sources (신호 전류원)
export const currentSignalSources: ComponentTemplate[] = [
  {
    type: "current_function_generator",
    label: "Current Function Generator",
    icon: "/elements/Current Function Generator.svg",
    defaultProperties: {
      current: 1,
      label: "I2",
    },
  },
  {
    type: "current_step",
    label: "Current Step",
    icon: "/elements/Current Step.svg",
    defaultProperties: {
      current: 1,
      label: "I3",
    },
  },
  {
    type: "csv_current_source",
    label: "CSV Current Source",
    icon: "/elements/CSV Current Source.svg",
    defaultProperties: {
      current: 1,
      label: "I4",
    },
  },
];

// Ground (접지)
export const grounds: ComponentTemplate[] = [
  {
    type: "ground",
    label: "Ground",
    icon: "/elements/GND (G).svg",
    defaultProperties: {
      label: "GND",
    },
  },
];

// Name Node (노드 이름)
export const nameNodes: ComponentTemplate[] = [
  {
    type: "name_node",
    label: "Name Node",
    icon: "/elements/Name Node (N).svg",
    defaultProperties: {
      label: "NODE",
    },
  },
];

// 모든 컴포넌트 템플릿을 그룹별로 정리
export const componentGroups = [
  {
    name: "Passive Elements",
    label: "Passive Elements",
    components: passiveElements,
  },
  {
    name: "Active Elements",
    label: "Active Elements",
    components: activeElements,
  },
  {
    name: "Sources",
    label: "전원",
    components: sources,
  },
  {
    name: "Voltage Signal Sources",
    label: "Voltage Signal Sources",
    components: voltageSignalSources,
  },
  {
    name: "Current Signal Sources",
    label: "Current Signal Sources",
    components: currentSignalSources,
  },
  {
    name: "Grounds",
    label: "접지",
    components: grounds,
  },
  {
    name: "Name Nodes",
    label: "노드",
    components: nameNodes,
  },
];

// 모든 컴포넌트를 하나의 배열로 (기존 호환성 유지)
export const allComponents: ComponentTemplate[] = [
  ...passiveElements,
  ...activeElements,
  ...sources,
  ...voltageSignalSources,
  ...currentSignalSources,
  ...grounds,
  ...nameNodes,
];
