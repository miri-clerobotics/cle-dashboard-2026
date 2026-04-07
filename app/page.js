'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

// 🎨 [디자인 수정은 여기서!] 개별 카드 컴포넌트
function EmployeeCard({ emp }) {
  const logoUrl = "https://mqveznjwafqfmifkffno.supabase.co/storage/v1/object/public/avatars/emp_empty.jpg";
  return (
    <div style={{ 
      padding: '4px',          
      backgroundColor: 'white', 
      borderRadius: '100px', 
      border: '1px solid #eee',
      boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'                // 사진과 텍스트 사이 간격
    }}>
      {/* 1. 왼쪽 사진 구역 */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <img 
          src={emp.image_url || logoUrl} 
          alt={emp.name} 
        style={{ width: '60px', height: '60px', borderRadius: '100px', objectFit: 'cover' }} 
        />
        
        {/* 상태 오버레이 (출장/휴가/온보딩 등) */}
        {emp.status && (
              <>
                <div className="absolute inset-0 bg-black/50 rounded-md"></div>
                <div
                  className={`absolute bottom-0 left-0 right-0 py-0.5 text-center text-[9px] font-bold rounded-b-md ${
                    emp.status === "trip"
                      ? "bg-blue-400 text-white"
                      : emp.status === "vacation"
                        ? "bg-green-400 text-white"
                        : "bg-red-400 text-white"
                  }`}
                >
                  {emp.status === "trip"
                    ? "출장중"
                    : emp.status === "vacation"
                      ? "휴가중"
                      : "온보딩"}
          </div>
        )}
      </div>

      {/* 2. 오른쪽 정보 구역 */}
      <div style={{ overflow: 'hidden' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0, color: '#111' }}>
          {emp.name}
        </h3>
        <p style={{ fontSize: '12px', color: '#666', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {emp.rank} / {emp.part}
        </p>
      </div>
    </div>
  )
}

// 🏗️ 전체 페이지 레이아웃
export default function Home() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEmployees() {
      const { data } = await supabase.from('employees').select('*')
      if (data) setEmployees(data)
      setLoading(false)
    }
    fetchEmployees()
  }, [])

  if (loading) return <div style={{ padding: '40px' }}>데이터 로딩 중...</div>

  return (
    <div style={{ padding: '40px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '32px' }}>CLE 2026 팀 대시보드</h1>
      
      {/* 카드들이 배치되는 그리드 시스템 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
        gap: '16px' 
      }}>
        {employees.map((emp) => (
          <EmployeeCard key={emp.id} emp={emp} />
        ))}
      </div>
    </div>
  )
}
