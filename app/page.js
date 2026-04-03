'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    async function fetchEmployees() {
      const { data, error } = await supabase.from('employees').select('*')
      if (data) setEmployees(data)
    }
    fetchEmployees()
  }, [])

  return (
    <div style={{ padding: '40px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ color: '#333', marginBottom: '24px' }}>CLE 2026 팀 대시보드</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {employees.map((emp) => (
          <div key={emp.id} style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '18px', margin: '0 0 8px 0' }}>{emp.name}</h2>
            <p style={{ color: '#666', margin: 0 }}>{emp.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
