'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion' 

// 🎨 개별 카드 컴포넌트 (조직도)
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
            color: 'white', fontSize: '9px', fontWeight: 'bold',
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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      
      {/* 메인 컨텐츠 */}
      <div style={{ flex: 1, padding: '0px' }}>
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

      {/* 🚩 하단 배너 (Tailwind 없이 오직 style로만!) */}
      <div style={{ 
        height: '40px', 
        background: 'linear-gradient(to right, #374151, #1f2937, #374151)', 
        position: 'relative', 
        overflow: 'hidden',
        borderTop: '1px solid #111'
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 0 }} />
        
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%', overflow: 'hidden' }}>
          <motion.div
            style={{ display: 'flex', whiteSpace: 'nowrap' }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {/* 💡 글자 스타일을 여기서 직접 조절하세요! */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold', margin: '0 60px' }}>
                모든 사람의 모든 시간이 가치 있도록 로봇과 사람을 잇다.
              </span>
              <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold', margin: '0 60px' }}>
                Connecting people and robots, to make every moment count for everyone.
              </span>
            </div>
            {/* 무한 루프를 위한 복제본 */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold', margin: '0 60px' }}>
                모든 사람의 모든 시간이 가치 있도록 로봇과 사람을 잇다.
              </span>
              <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold', margin: '0 60px' }}>
                Connecting people and robots, to make every moment count for everyone.
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
