import { ComponentTemplate } from '../types';

// Passive Elements (수동 소자)
export const passiveElements: ComponentTemplate[] = [
  {
    type: 'resistor',
    label: 'Resistor',
    icon: '/elements/Resistor.svg',
    defaultProperties: {
      resistance: 100,
      label: 'R1',
    },
  },
  {
    type: 'capacitor',
    label: 'Capacitor',
    icon: '/elements/Capacitor.svg',
    defaultProperties: {
      capacitance: 0.000001,
      label: 'C1',
    },
  },
  {
    type: 'inductor',
    label: 'Inductor',
    icon: '/elements/Inductor.svg',
    defaultProperties: {
      inductance: 0.000001,
      label: 'L1',
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

// Sources (전원) - 추후 추가 예정
export const sources: ComponentTemplate[] = [
  // {
  //   type: 'voltage_source',
  //   label: 'Voltage Source',
  //   icon: '/elements/VoltageSource.svg',
  //   defaultProperties: {
  //     voltage: 5,
  //     label: 'V1',
  //   },
  // },
];

// 모든 컴포넌트 템플릿을 그룹별로 정리
export const componentGroups = [
  {
    name: 'Passive Elements',
    label: 'Passive Elements',
    components: passiveElements,
  },
  {
    name: 'Active Elements',
    label: 'Active Elements',
    components: activeElements,
  },
  {
    name: 'Sources',
    label: '전원',
    components: sources,
  },
];

// 모든 컴포넌트를 하나의 배열로 (기존 호환성 유지)
export const allComponents: ComponentTemplate[] = [
  ...passiveElements,
  ...activeElements,
  ...sources,
];
