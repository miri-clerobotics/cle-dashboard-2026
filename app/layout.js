// app/layout.js
import './globals.css' // 여기서 globals.css를 연결합니다!

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <title>CLE 2026 팀 대시보드</title>
      </head>
      <body>
        {/* children은 우리가 page.js에 만든 내용들이 들어오는 자리입니다 */}
        {children}
      </body>
    </html>
  )
}
