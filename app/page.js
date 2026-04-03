'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { User, Briefcase, MapPin } from 'lucide-react';

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);

  // 1. Supabase 창고에서 데이터 꺼내오기
  useEffect(() => {
    const fetchEmployees = async () => {
      const { data } = await supabase.from('employees').select('*');
      if (data) setEmployees(data);
    };
    fetchEmployees();
  }, []);

  return (
    <div style={{ padding: '40px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#1e293b' }}>
        CLE 2026 팀 대시보드
      </h1>

      {/* 2. 피그마 카드 레이아웃 스타일 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {employees.map((emp) => (
          <motion.div 
            key={emp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              backgroundColor: 'white', padding: '24px', borderRadius: '16px', 
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', border: '1px solid #e2e8f0'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* 이미지 주소가 있으면 보여주고, 없으면 아이콘 표시 */}
              {emp.image_url ? (
                <img src={emp.image_url} alt={emp.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '60px', height: '60px', backgroundColor: '#f1f5f9', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <User size={30} color="#94a3b8" />
                </div>
              )}
              
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>{emp.name}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
                  <Briefcase size={14} /> <span>{emp.rank}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '14px' }}>
                  <MapPin size={14} /> <span>{emp.part}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
