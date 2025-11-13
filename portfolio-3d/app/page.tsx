'use client'

import dynamic from 'next/dynamic'

const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="w-full h-screen bg-gradient-to-b from-sky-200 to-blue-300">
      <Scene3D />
    </main>
  )
}

