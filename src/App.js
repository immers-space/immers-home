// import * as THREE from 'three'
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Sky, useScroll, useGLTF } from '@react-three/drei'

import apartment from './assets/Immers Home.glb'
import { CatmullRomCurve3, Vector3 } from 'three'

const alphaName = (a, b) => {
  if (a.name < b.name) {
    return -1
  }
  if (a.name > b.name) {
    return 1
  }
  return 0
}

export default function App() {
  const [waypoints, setWaypoints] = useState([]);

  return (
    <Canvas dpr={[1, 2]} shadows camera={{ position: [10, 10, -10], near: 0.1, far: 1000 }}>
      <ambientLight intensity={0.5} />
      <spotLight angle={0.14} color="#ffffff" penumbra={1} position={[25, 50, -20]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />
      <Sky scale={1000} sunPosition={[2, 0.4, 10]} />
      <Suspense fallback={null}>
        <ScrollControls pages={waypoints.length}>
          <group>
            <Apartment setWaypoints={setWaypoints} scale={1} position={[0, 0, 0]} />
            <WaypointPath waypoints={waypoints} height={1.2} />
          </group>
        </ScrollControls>
      </Suspense>
    </Canvas>
  )
}

function Apartment({ setWaypoints, hideRoof, ...props }) {
  const { scene, nodes } = useGLTF(apartment)
  const roof = useRef();
  useLayoutEffect(() => {
    const waypointNodes = []
    Object.values(nodes).forEach((node) => {
      // node.receiveShadow = node.castShadow = true
      if (node.userData?.gltfExtensions?.MOZ_hubs_components?.waypoint) {
        waypointNodes.push(node)
      }
      if (node.name === 'roof') {
        roof.current = node
        roof.current.visible = !hideRoof
      }
    })
    waypointNodes.sort(alphaName)
    setWaypoints(waypointNodes)
  }, [nodes, setWaypoints, hideRoof])

  return (
    <group>
      <primitive object={scene} {...props} />
    </group>
  )
}

function WaypointPath({waypoints, height, ...props}) {
  const geo = useRef()
  const curve = useRef()
  const target = useRef(new Vector3())
  const scroll = useScroll()

  useEffect(() => {
    if (!waypoints.length) {
      return
    }
    const points = waypoints.map(w => w.position)
    curve.current = new CatmullRomCurve3(points, false)
    geo.current.setFromPoints(curve.current.getPoints(50))
  }, [waypoints])
  useFrame((state, delta) => {
    if (!curve.current) {
      return
    }
    const t = scroll.offset
    curve.current.getPointAt(t, state.camera.position)
    state.camera.position.y += height
    curve.current.getTangentAt(t, target.current)
    target.current.add(state.camera.position)
    state.camera.lookAt(target.current)
  })
  return (
    <line position={[0, 0.2, 0]} frustumCulled={false} {...props}>
      <bufferGeometry ref={geo} />
      <lineBasicMaterial color='red' />
    </line>
  )
}

useGLTF.preload(apartment)
