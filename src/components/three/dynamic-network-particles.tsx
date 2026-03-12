'use client'

import dynamic from 'next/dynamic'

export const DynamicNetworkParticles = dynamic(
  () =>
    import('@/components/three/network-particles').then(
      (mod) => mod.NetworkParticles,
    ),
  { ssr: false },
)
