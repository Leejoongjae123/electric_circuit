# Electric Circuit Designer

전자 회로를 시각적으로 설계하고 편집할 수 있는 웹 기반 회로 설계 도구입니다.

## 주요 기능

### 🔧 회로 요소
- **Resistor (저항)**: 저항값 설정 가능
- **Voltage Source (전원)**: 전압값 설정 가능
- **Capacitor (커패시터)**: 커패시턴스 설정 가능
- **Inductor (인덕터)**: 인덕턴스 설정 가능
- **Op-Amp (연산 증폭기)**: 모델명 설정 가능

### 🎨 인터페이스
- **드래그 앤 드롭**: 사이드바에서 캔버스로 요소를 끌어다 놓기
- **검색 기능**: 요소 이름으로 빠르게 검색
- **속성 패널**: 선택한 요소의 속성 실시간 편집
- **3열 그리드**: 깔끔한 요소 배치

### 🖱️ 캔버스 기능
- 요소 배치 및 이동
- 요소 간 연결선 그리기
- 줌 인/아웃
- 패닝

## 기술 스택

- **Framework**: Next.js 16.0.1 (App Router)
- **UI Library**: React 19.2.0
- **Flow Diagram**: ReactFlow 11.11.4
- **Styling**: TailwindCSS 4
- **Icons**: Lucide React
- **Language**: TypeScript 5

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000/circuit](http://localhost:3000/circuit)을 열어 애플리케이션을 확인하세요.

### 빌드

```bash
npm run build
```

### 프로덕션 서버 실행

```bash
npm start
```

## 프로젝트 구조

```
app/
├── circuit/
│   ├── components/
│   │   ├── CircuitCanvas.tsx      # 메인 캔버스 컴포넌트
│   │   ├── CircuitNode.tsx        # 개별 회로 노드 컴포넌트
│   │   ├── ComponentSidebar.tsx   # 요소 선택 사이드바
│   │   └── PropertiesPanel.tsx    # 속성 편집 패널
│   ├── page.tsx                   # 회로 페이지
│   └── types.ts                   # 타입 정의
└── ...
```

## 사용 방법

1. **요소 추가**: 왼쪽 사이드바에서 원하는 회로 요소를 캔버스로 드래그
2. **요소 연결**: 요소의 연결점을 클릭하여 다른 요소와 연결
3. **속성 편집**: 요소를 선택하면 오른쪽 패널에서 속성 편집
4. **검색**: 사이드바 하단 검색창에서 요소 검색

## 라이선스

MIT
