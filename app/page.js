'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion' // 애니메이션 라이브러리

// 🎨 개별 카드 컴포넌트
function EmployeeCard({ emp }) {
  const logoUrl = "https://mqveznjwafqfmifkffno.supabase.co/storage/v1/object/public/avatars/emp_empty.jpg";

  const getStatusColor = (status) => {
    if (status === "trip") return "#60a5fa"; 
    if (status === "vacation") return "#4ade80"; 
    return "#f87171"; 
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
      <div style={{ position: 'relative', flexShrink: 0, width: '60px', height: '60px' }}>
        <img 
          src={emp.image_url || logoUrl} 
          alt={emp.name} 
          style={{ width: '60px', height: '60px', borderRadius: '100px', objectFit: 'cover' }} 
        />
        {emp.status && emp.status !== 'active' && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            backgroundColor: getStatusColor(emp.status),
            color: 'white', fontSize: '9px', fontWeight: 'medium',
            textAlign: 'center', padding: '2px 0', borderRadius: '30px'
          }}>
            {emp.status === "trip" ? "출장중" : emp.status === "vacation" ? "휴가중" : "온보딩"}
          </div>
        )}
      </div>
      <div style={{ overflow: 'hidden', paddingRight: '12px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px', color: '#111' }}>{emp.name}</h3>
        <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>{emp.rank}</p>
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
    // 💡 2. 전체를 감싸는 상자 (flex-col로 배너를 바닥에 고정)
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      
      {/* 메인 컨텐츠 영역 */}
      <div style={{ flex: 1, padding: '40px' }}>
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

      {/* 🚩 하단 배너 영역 (페이지 하단에 고정) */}
      <div 
        className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 overflow-hidden relative flex-shrink-0 border-t border-gray-900" 
        style={{ height: '40px' }}
      >
        <div className="absolute inset-0 bg-gray-900/60 z-0" />
        <div className="relative flex items-center h-full overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <div className="flex items-center">
              <span className="text-white text-sm font-bold mx-20">모든 사람의 모든 시간이 가치 있도록 로봇과 사람을 잇다.</span>
              <span className="text-white text-sm font-bold mx-20">Connecting people and robots, to make every moment count for everyone.</span>
            </div>
            <div className="flex items-center">
              <span className="text-white text-sm font-bold mx-20">모든 사람의 모든 시간이 가치 있도록 로봇과 사람을 잇다.</span>
              <span className="text-white text-sm font-bold mx-20">Connecting people and robots, to make every moment count for everyone.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
