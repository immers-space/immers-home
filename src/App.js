// import * as THREE from 'three'
import { Suspense, useLayoutEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Sky, useScroll, useGLTF } from '@react-three/drei'

export default function App() {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 0, 10], near: 0.1, far: 1000 }}>
      <ambientLight intensity={0.3} />
      {/* <fog attach="fog" args={['#ffffff', 5, 18]} /> */}
      <spotLight angle={0.14} color="#ffffff" penumbra={1} position={[25, 50, -20]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />
      <Sky scale={1000} sunPosition={[2, 0.4, 10]} />
      <Suspense fallback={null}>
        {/* Wrap contents you want to scroll into <ScrollControls> */}
        <ScrollControls pages={3}>
          <mesh rotation={[0, 3.14, 0]}>
            <Apartment scale={1} position={[0, 0, 0]} />
            <Roof scale={1} position={[0, 0, 0]} />
          </mesh>
        </ScrollControls>
      </Suspense>
    </Canvas>
  )
}

function Apartment({ ...props }) {
  // This hook gives you offets, ranges and other useful things
  const scroll = useScroll()
  const { scene, nodes } = useGLTF('/Apartment 1.glb')
  // const { actions } = useAnimations(animations, scene)
  useLayoutEffect(() => Object.values(nodes).forEach((node) => (node.receiveShadow = node.castShadow = true)))
  // useEffect(() => void (actions['Take 001'].play().paused = true), [actions])
  useFrame((state, delta) => {
    // const action = actions['Take 001']
    // The offset is between 0 and 1, you can apply it to your models any way you like
    const offset = 1 - scroll.offset
    // action.time = THREE.MathUtils.damp(action.time, (action.getClip().duration / 2) * offset, 100, delta)
    state.camera.position.set(Math.sin(offset) * -10, Math.atan(offset * Math.PI * 2) * 5, Math.cos((offset * Math.PI) / 3) * -10)
    state.camera.lookAt(0, 0, 0)
  })
  return <primitive object={scene} {...props} />
}

function Roof({...props}) {
  const { scene, nodes } = useGLTF('/Apartment 1 roof.glb')
  useLayoutEffect(() => Object.values(nodes).forEach((node) => {
    if (node.material) {
      node.material.transparent = true
      node.material.opacity = 0.25
    }
  }))
  return <primitive object={scene} {...props} />
}

useGLTF.preload('/Apartment 1.glb')
useGLTF.preload('/Apartment 1 roof.glb')
