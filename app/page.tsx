import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="flex flex-col items-center gap-8 p-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-gray-900">
            회로 설계 툴
          </h1>
          <p className="text-xl text-gray-600">
            드래그 앤 드롭으로 쉽게 회로를 설계하세요
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <Link
            href="/circuit"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            회로 캔버스 시작하기
          </Link>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="p-4 bg-white rounded-lg shadow text-center">
              <div className="text-3xl mb-2">🔲</div>
              <div className="text-sm font-medium text-gray-700">저항</div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow text-center">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-sm font-medium text-gray-700">전원</div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow text-center">
              <div className="text-3xl mb-2">⚊⚊</div>
              <div className="text-sm font-medium text-gray-700">커패시터</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
