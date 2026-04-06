'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEmployees() {
      // 'employees' 테이블에서 모든 데이터를 가져옵니다.
      const { data, error } = await supabase.from('employees').select('*')
      if (data) {
        setEmployees(data)
      }
      setLoading(false)
    }
    fetchEmployees()
  }, [])

  if (loading) return <div style={{ padding: '40px' }}>데이터를 불러오는 중...</div>

  return (
    <div style={{ padding: '40px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ color: '#333', marginBottom: '24px' }}>CLE 2026 팀 대시보드</h1>
      
      {employees.length === 0 ? (
        <p>등록된 팀원이 없습니다. Supabase에 데이터를 추가해 보세요!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {employees.map((emp) => (
            <div key={emp.id} style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              {/* 프로필 이미지 (iimage_url 사용) */}
              {emp.iimage_url && (
                <img src={emp.iimage_url} alt={emp.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }} />
              )}
              
              <h2 style={{ fontSize: '20px', margin: '0 0 4px 0' }}>{emp.name}</h2>
              <p style={{ color: '#007AFF', fontWeight: 'bold', margin: '0 0 8px 0' }}>{emp.rank} ({emp.part})</p>
              
              <div style={{ display: 'inline-block', padding: '4px 12px', backgroundColor: emp.status === 'active' ? '#e1f5fe' : '#eee', borderRadius: '20px', fontSize: '14px' }}>
                {emp.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
