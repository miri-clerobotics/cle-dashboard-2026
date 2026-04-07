'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion' // 💡 애니메이션을 위해 추가

// 🎨 개별 카드 컴포넌트
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
      gap: '12px'
    }}>
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <img 
          src={emp.image_url || logoUrl} 
          alt={emp.name} 
          style={{ width: '60px', height: '60px', borderRadius: '100px', objectFit: 'cover' }} 
        />
        {emp.status && emp.status !== 'active' && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            backgroundColor: emp.status === 'trip' ? '#60a5fa' : '#4ade80',
            color: 'white', fontSize: '9px', fontWeight: 'bold',
            textAlign: 'center', borderRadius: '6px', padding: '2px 0'
          }}>
            {emp.status === 'trip' ? '출장중' : '휴가중'}
          </div>
        )}
      </div>
      <div style={{ overflow: 'hidden' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0, color: '#111' }}>{emp.name}</h3>
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
    // 전체 화면을 가득 채우고(h-screen), 요소를 세로로 배치(flex-col)
    <div className="flex flex-col min-h-screen bg-[#f9f9f9]">
      
      {/* 상단 메인 컨텐츠 영역 (성장하는 영역) */}
      <div className="flex-grow p-10">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">CLE 2026 팀 대시보드</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {employees.map((emp) => (
            <EmployeeCard key={emp.id} emp={emp} />
          ))}
        </div>
      </div>

      {/* 🚩 Bottom Banner - 하단 고정 */}
      <div 
        className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 overflow-hidden relative flex-shrink-0 border-t border-gray-900" 
        style={{ height: '40px' }}
      >
        <div className="absolute inset-0 bg-gray-900/60 z-0" />
        
        {/* Scrolling Text Container */}
        <div className="relative flex items-center h-full overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {/* 첫 번째 세트 */}
            <div className="flex items-center">
              <span className="text-white text-sm font-bold mx-20">모든 사람의 모든 시간이 가치 있도록 로봇과 사람을 잇다.</span>
              <span className="text-white text-sm font-bold mx-20">Connecting people and robots, to make every moment count for everyone.</span>
            </div>
            
            {/* 두 번째 세트 */}
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
