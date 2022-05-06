import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CatmullRomCurve3, Vector3 } from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Sky, useScroll, useGLTF, Scroll, Html } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'

import apartment from './assets/Immers Home.glb'
import logoDark from './assets/immers logo dark.png'

const waveObjName = "Assembly-2001_5";

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
  const [showUnseenVideo, setShowUnseenVideo] = useState(false)
  const handleAptClick = (event) => {
    if (event.object.name === waveObjName) {
      event.stopPropagation();
      setShowUnseenVideo(true)
    }
  }
  const handleCloseVideo = (event) => {
    if (event.target.classList.contains('overlay')) {
      setShowUnseenVideo(false);
    }
  }
  return (
    <>
      <Canvas dpr={[1, 2]} shadows camera={{ position: [10, 10, -10], near: 0.1, far: 1000 }}>
        <ambientLight intensity={0.5} />
        <spotLight angle={0.14} color="#ffffff" penumbra={1} position={[25, 50, 20]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />
        <Sky scale={1000} sunPosition={[-1, 0.1, -1]} />
        <Suspense fallback={null}>
          <ScrollControls pages={waypoints.length}>
            <group>
              <Apartment
                onClick={handleAptClick}
                setWaypoints={setWaypoints} scale={1} position={[0, 0, 0]}
              />
              {waypoints.length && (
                <>
                  <WaypointPath waypoints={waypoints} height={1.2}  />
                  <AtWaypoint waypoints={waypoints} i={1} height={1.2} offset={2} before={0.63} after={0.2}>
                    <h3>Boutique 3D Web development with a purpose</h3>
                    <p>
                      We dream of a democratized new era of the Web where creators own their content,
                      users own their data, and no single entity exhibits undue influence on the community as a whole.
                    </p>
                    <p>
                      As a <a target="_blank" rel="noreferrer" href="https://disco.coop">DisCO</a> cooperative, we use the proceeds from
                      our contract work to fund development of open-source software that breaks down
                      walls between platforms and returns control to users and creators.
                    </p>
                    <p>
                      <a href="https://web.immers.space/about-us">Learn more about our company</a>
                    </p>
                  </AtWaypoint>
                  <AtWaypoint waypoints={waypoints} i={2} height={0.4} offset={2} before={0.45} after={0.075}>
                    <h3>Your Immersive Web vision, realized</h3>
                    <p>
                      As industry veterans with expertise in three.js, Babylon JS, A-Frame, Hubs, React Three Fiber, and more,
                      we can make your interactive experience come to life on the Web, working instantly on any device
                      from mobile phone to virtual reality.
                    </p>
                    <p>
                      Click the Great (Vapor)Wave art on the wall above to watch video about how we helped
                      performance artist Tiffany Trenda bring her Un/Seen performance to a virtual audience or{" "}
                      <a href="https://web.immers.space/consulting">get started with Immers Space consulting</a>.
                    </p>
                  </AtWaypoint>
                </>
              )}
            </group>
            <Scroll html style={{ width: '100%' }}>
              <h1>
                <img src={logoDark} alt="Immers Space logo" />
                Immers Space
              </h1>
              <p>Scroll to explore <span className="pointer">👇</span></p>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
      {showUnseenVideo && (
        <div className='overlay' onClick={handleCloseVideo}>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/HeqxVUm5PEA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      )}
    </>
  )
}

function Apartment({ setWaypoints, hideRoof,  ...props }) {
  const { scene, nodes } = useGLTF(apartment)
  const roof = useRef();
  useLayoutEffect(() => {
    const waypointNodes = []
    Object.values(nodes).forEach((node) => {
      // node.receiveShadow = node.castShadow = true
      if (node.userData?.gltfExtensions?.MOZ_hubs_components?.waypoint) {
        waypointNodes.push(node.clone().rotateOnWorldAxis(new Vector3(0, 1, 0), Math.PI))
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

function WaypointPath({waypoints, height, debug, ...props}) {
  const geo = useRef()
  const curve = useRef()
  const scroll = useScroll()

  useEffect(() => {
    const points = waypoints.map(w => w.position)
    curve.current = new CatmullRomCurve3(points, false)
    geo.current.setFromPoints(curve.current.getPoints(50))
  }, [waypoints])
  useFrame((state, delta) => {
    if (!curve.current) {
      return
    }
    const t = scroll.offset
    curve.current.getPoint(t, state.camera.position)
    state.camera.position.y += height
    const segments = waypoints.length - 1;
    const pickLast = Math.floor(t * segments);
    const pickNext = pickLast + 1;
    state.camera.quaternion.slerpQuaternions(
      waypoints[pickLast].quaternion,
      waypoints[pickNext].quaternion,
      scroll.range(pickLast / segments, 1 / segments)
    );
    if (debug) {
      console.log(`Current segment: ${pickLast}. Before: ${1 - (t * segments - pickLast)}. After: ${t * segments - pickLast}`)
      console.log(`Camera: `, state.camera.position)
    }
  })
  return (
    <line visible={!!debug} position={[0, 0.2, 0]} frustumCulled={false} {...props}>
      <bufferGeometry ref={geo} />
      <lineBasicMaterial color='red' />
    </line>
  )
}

function AtWaypoint({waypoints, i, height, offset, before, after, children, ...props}) {
  const waypoint = waypoints[i]
  const ref = useRef()
  const scroll = useScroll()
  const [visible, setVisible] = useState(false)
  const { scale } = useSpring({ scale: visible ? 1 : 0 })
  const scrollContainer = useRef(scroll.fixed)
  useEffect(() => {
    const group = ref.current
    group.position.copy(waypoint.position)
    group.position.y += height
    group.quaternion.copy(waypoint.quaternion)
    group.translateZ(-1 * (offset ?? 1))
  }, [waypoint, height, offset])
  useFrame(() => {
    const segments = waypoints.length - 1
    setVisible(scroll.visible((i - before)  / segments, (before + after) / segments))
  })
  return (
    <animated.group ref={ref} visible={visible} scale={scale} {...props}>
      <Html portal={scrollContainer} scale={0.125} transform className="html3d">
        {children}
      </Html>
    </animated.group>
  )
}

useGLTF.preload(apartment)
