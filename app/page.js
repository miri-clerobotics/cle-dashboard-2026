'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion' // 애니메이션 효과용

export default function Home() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    async function fetchEmployees() {
      const { data } = await supabase.from('employees').select('*')
      if (data) setEmployees(data)
    }
    fetchEmployees()
  }, [])

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">CLE 2026 팀 대시보드</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {employees.map((emp) => (
          <motion.div
            key={emp.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* 카드 본체 */}
            <div className="bg-white rounded-lg p-2 border border-gray-200 shadow hover:shadow-lg transition-all hover:scale-105">
              <div className="flex items-center gap-3">
                
                {/* 왼쪽: 프로필 이미지 및 상태 뱃지 */}
                <div className="relative flex-shrink-0">
                  <img
                    src={emp.iimage_url || 'https://via.placeholder.com/150'}
                    alt={emp.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  {/* 상태(status)가 있을 때만 오버레이 표시 */}
                  {emp.status && (
                    <>
                      <div className="absolute inset-0 bg-black/40 rounded-md"></div>
                      <div
                        className={`absolute bottom-0 left-0 right-0 py-0.5 text-center text-[9px] font-bold rounded-b-md text-white ${
                          emp.status === "trip" ? "bg-blue-400" : 
                          emp.status === "vacation" ? "bg-green-400" : "bg-red-400"
                        }`}
                      >
                        {emp.status === "trip" ? "출장중" : 
                         emp.status === "vacation" ? "휴가중" : "온보딩"}
                      </div>
                    </>
                  )}
                </div>

                {/* 오른쪽: 이름 및 직급 정보 */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 text-sm font-bold truncate">
                    {emp.name}
                  </h3>
                  <p className="text-gray-600 text-xs truncate">
                    {emp.rank} / {emp.part}
                  </p>
                </div>

              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
