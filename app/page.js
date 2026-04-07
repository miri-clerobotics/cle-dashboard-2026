'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

// 🎨 개별 카드 컴포넌트
function EmployeeCard({ emp }) {
  const logoUrl = "https://mqveznjwafqfmifkffno.supabase.co/storage/v1/object/public/avatars/emp_empty.jpg";

  // 상태에 따른 배경색 결정
  const getStatusColor = (status) => {
    if (status === "trip") return "#60a5fa";    // 파랑 (출장)
    if (status === "vacation") return "#4ade80"; // 초록 (휴가)
    return "#f87171";                            // 빨강 (온보딩)
  };

  return (
    <div style={{ 
      padding: '4px',          
      backgroundColor: 'white', 
      borderRadius: '100px', 
      border: '1px solid #eee',
      boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      {/* 1. 왼쪽 사진 구역 */}
      <div style={{ position: 'relative', flexShrink: 0, width: '60px', height: '60px' }}>
        <img 
          src={emp.image_url || logoUrl} 
          alt={emp.name} 
          style={{ width: '60px', height: '60px', borderRadius: '100px', objectFit: 'cover' }} 
        />
        
        {/* 상태 뱃지 (안전하게 조건부 렌더링) */}
        {emp.status && emp.status !== 'active' && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: getStatusColor(emp.status),
            color: 'white',
            fontSize: '9px',
            fontWeight: 'medium',
            textAlign: 'center',
            padding: '2px 0',
            borderRadius: '30px'
          }}>
            {emp.status === "trip" ? "출장중" : emp.status === "vacation" ? "휴가중" : "온보딩"}
          </div>
        )}
      </div>

      {/* 2. 오른쪽 정보 구역 */}
      <div style={{ overflow: 'hidden', paddingRight: '12px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: 4px, color: '#111' }}>
          {emp.name}
        </h3>
        <p style={{ fontSize: '12px', color: '#666', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {emp.rank}
        </p>
      </div>
    </div>
  );
}

// 🏗️ 전체 페이지 레이아웃
export default function Home() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const { data } = await supabase.from('employees').select('*')
        if (data) setEmployees(data)
      } catch (error) {
        console.error("데이터 로딩 에러:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchEmployees()
  }, [])

  if (loading) return <div style={{ padding: '40px' }}>데이터 로딩 중...</div>

  return (
    <div style={{ padding: '40px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '32px' }}>CLE 2026 팀 대시보드</h1>
      
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
  );
}
