import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import c from "classnames"
import { CatmullRomCurve3 } from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Sky, useScroll, Scroll, Html, Text } from '@react-three/drei'

import Apartment from './Apartment'
import Ocean from './Ocean'

import logoDark from './assets/immers logo dark.png'
import VirtualReign from './VirtualReign'
import NiceFreeTreasures from './NiceFreeTreasures'
import House from './House'
import { font } from './util/consts'
import { WorkerBot1, WorkerBot2, WorkerBot3, WorkerBot4 } from './WorkerBot'

const waveObjName = "Assembly-2001_5";
const debug = new URLSearchParams(window.location.search).has('debug');
const sunPosition = [-1, 0.1, -1]
const qPI = Math.PI / 4


export default function App() {
  const [waypoints, setWaypoints] = useState([])
  const [currentWaypoint, setCurrentWaypoint] = useState(0)
  const [projectHoverActive, setProjectHoverActive] = useState(false)
  const [showUnseenVideo, setShowUnseenVideo] = useState(false)
  const handleWaveClick = (event) => {
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
        <Sky scale={1000} sunPosition={sunPosition} />
        <Suspense fallback={null}>
          <ScrollControls pages={waypoints.length}>
            <group>
              <House scale={1} position={[0, 0, 0]} />
              <Apartment
                handleWaveClick={handleWaveClick}
                setWaypoints={setWaypoints} scale={1} position={[0, 0, 0]}
              />
              <Text
                position={[-0.5, 0.1, 8.5]}
                fontSize={0.75}
                color="#052464"
                anchorX="center"
                anchorY="middle"
                rotation-x={-Math.PI / 2}
                font={font}
                visible={!projectHoverActive}
              >
                Explore Our Projects
              </Text>
              <VirtualReign position={[-3, 0, 7.5]} scale={0.8} setIsActive={setProjectHoverActive} />
              <NiceFreeTreasures position={[2, 0, 7.5]} scale={0.015} setIsActive={setProjectHoverActive} />
              <Ocean position={[0, -0.75, 0]} sunPosition={sunPosition} />
              {waypoints.length && (
                <>
                  <WaypointPath waypoints={waypoints} height={1.2} debug={debug} setCurrentWaypoint={setCurrentWaypoint} />
                  <AtWaypoint waypoints={waypoints} i={0} height={1.2} offset={-5} before={0} after={0.79} />
                  <AtWaypoint waypoints={waypoints} i={1} height={1.2} offset={2} before={0.11} after={0.35}
                              heading='Boutique 3D Web development with a purpose'>
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
                  <AtWaypoint waypoints={waypoints} i={2} height={0.45} offset={2} before={0.45} after={0.075}
                              heading='Your Immersive Web vision, realized'>
                    <p>
                      As industry veterans with expertise in three.js, Babylon JS, A-Frame, Hubs, React Three Fiber, and more,
                      we can make your interactive experience come to life on the Web, working instantly on any device
                      from mobile phone to virtual reality.
                    </p>
                    <p>
                      Click the Great (Vapor)Wave art on the wall above to watch video about how we helped
                      performance artist Tiffany Trenda bring her Un/Seen performance to a virtual audience or{" "}
                      <a href="https://web.immers.space/metaverse-design-service">get started with Immers Space consulting</a>.
                    </p>
                  </AtWaypoint>
                  <AtWaypoint waypoints={waypoints} i={3} offset={2} height={1.2} before={0.2} after={0.1}
                              heading='Free Software for a Free Metaverse'>
                    <p>
                      We're disappointed in the state of the Social Web.
                      We believe that closed platforms designed to manipulate and sell our attention
                      bring out the very worst in us, and that the rigid demands of centralized algorithms
                      and app store reviews stifle creativity and freedom.
                    </p>
                    <p>
                      Our solution is free, open-source, standards-based, self-hostable, and federated.
                      Immers software empowers any creator to join a decentralized Immersive Web network
                      without needing anyone's permission. Connections between immers arise from natural
                      human interaction when immersers discover your site and share it with their friends.
                    </p>
                    <p><a href="https://github.com/immers-space">Learn how to connect your project to the metaverse.</a></p>
                  </AtWaypoint>
                  <AtWaypoint waypoints={waypoints} i={4} offset={2} height={1.2} before={0.2} after={0.1}
                              heading='Use Cases'>
                    <p className='center'>
                      Let's explore some use cases for immersive 3D Websites.
                    </p>
                  </AtWaypoint>
                  <AtWaypoint waypoints={waypoints} i={5} offset={2} height={1.2} before={0.2} after={0.33}
                              heading='Remote Collaboration'>
                    <p>
                      While remote work grows in popularity, physical distance needn't be a barrier to
                      effective collaboration thanks to virtual spaces. We can help build your perfect
                      environment using leading real-time virtual collaboration platforms including{" "}
                      <a href="https://learn.framevr.io" target="_blank" rel="noreferrer">Frame</a> and{" "}
                      <a href="https://hubs.mozilla.com/cloud" target="_blank" rel="noreferrer">Mozilla Hubs</a>.
                    </p>
                  </AtWaypoint>
                  {currentWaypoint > 1 && (
                    <group position={[-3.25, 0.75, 4.25]}>
                      <WorkerBot1 position={[-0.75, 0, -0.75]} rotation={[0, qPI, 0]} show={currentWaypoint === 5} />
                      <WorkerBot2 position={[0.75, 0, 0.75]} rotation={[0,  5 * qPI, 0]} show={currentWaypoint === 5} />
                      <WorkerBot3 position={[-0.75, 0, 0.75]} rotation={[0, 3 * qPI, 0]} show={currentWaypoint === 5} />
                      <WorkerBot4 position={[0.75, 0, -0.75]} rotation={[0,  -1 * qPI, 0]} show={currentWaypoint === 5} />
                    </group>
                  )}
                  <AtWaypoint waypoints={waypoints} i={6} offset={2} height={1} before={0.2} after={0.33}
                              heading='Social Immersive Retail'>
                    <p>
                      While online shopping provides convenience and, in pandemic times, safety,
                      today’s e-commerce solutions lack the social and personal aspects of in-store shopping
                      which have been shown to increase sales.
                    </p>
                  </AtWaypoint>
                  <AtWaypoint waypoints={waypoints} i={7} offset={2} height={0.3} before={0.6} after={0.1}
                              heading='Social Immersive Retail'>
                    <p>
                      What if friends could meet up virtually to shop a digital twin of your store together?
                      What if a live sales representative could join them when needed to answer questions and close the sale?
                      We can help you transform your e-commerce for the metaverse age.
                    </p>
                    <p>
                      <a href="https://web.immers.space/metaverse-design-service/">Contact us for a free consultation</a>.
                    </p>
                  </AtWaypoint>
                </>
              )}
            </group>
            <Scroll html style={{ width: '100%' }}>
              <h1>
                <img src={logoDark} alt="" />
                Immers Space
              </h1>
              <p aria-hidden='true'>Scroll to explore <span className="pointer">👇</span></p>
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

function WaypointPath({waypoints, height, debug, setCurrentWaypoint, ...props}) {
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
    const pickNext = Math.min(pickLast + 1, waypoints.length);
    state.camera.quaternion.slerpQuaternions(
      waypoints[pickLast].quaternion,
      waypoints[pickNext].quaternion,
      scroll.range(pickLast / segments, 1 / segments)
    );
    setCurrentWaypoint(Math.round(t * segments))
    if (debug) {
      console.debug(`Current segment: ${pickLast}. Before: ${1 - (t * segments - pickLast)}. After: ${t * segments - pickLast}`)
      console.debug(`Camera: `, state.camera.position)
    }
  })
  return (
    <line visible={!!debug} position={[0, 0.2, 0]} frustumCulled={false} {...props}>
      <bufferGeometry ref={geo} />
      <lineBasicMaterial color='red' />
    </line>
  )
}

function AtWaypoint({waypoints, i, height, offset, before, after, heading, children, ...props}) {
  const waypoint = waypoints[i]
  const ref = useRef()
  const scroll = useScroll()
  const [visible, setVisible] = useState(false)
  const scrollContainer = useRef(scroll.fixed)
  const scrollTo = useCallback(() => {
    scroll.offset = i / (waypoints.length)
    scroll.el.scrollTop = (i / (waypoints.length)) * scroll.el.scrollHeight;
  }, [scroll, i, waypoints])
  const handleFocus = useCallback(() => {
    window.location.hash = `waypoint${i}`;
  }, [i])
  useEffect(() => {
    const group = ref.current
    group.position.copy(waypoint.position)
    group.position.y += height
    group.quaternion.copy(waypoint.quaternion)
    group.translateZ(-1 * (offset ?? 1))
  }, [waypoint, height, offset])
  // update hash when scrolling
  useEffect(() => {
    if (visible) {
      window.location.hash = `waypoint${i}`;
    }
  }, [visible, i])
  // scroll to this waypoint based on hash at pageload
  useEffect(() => {
    if (window.location.hash === `#waypoint${i}`) {
      // needs a small delay after page load or else the scroll damping goes wild
      const timer = window.setTimeout(scrollTo, 100)
      return () => window.clearTimeout(timer)
    }
  }, [i, scrollTo])
  // scroll to this waypoint based on hashchange after load (e.g. tab navigation)
  useEffect(() => {
    const handleHashchange = () => {
      // visible check prevents triggering scroll when waypoint updates hash itself
      if (window.location.hash === `#waypoint${i}` && !visible) {
        scrollTo()
      }
    }
    window.addEventListener('hashchange', handleHashchange)
    return () => window.removeEventListener('hashchange', handleHashchange)
  }, [visible, i, scrollTo])
  useFrame(() => {
    const segments = waypoints.length - 1
    setVisible(scroll.visible((i - before)  / segments, (before + after) / segments))
  })
  const headerId = `waypoint${i}-header`
  return (
    <group ref={ref} visible={visible} {...props}>
      <Html portal={scrollContainer} center className={c("html3d", { visible })}>
        <section onFocus={handleFocus} onClick={evt => evt.stopPropagation()} aria-labelledby={headerId}>
          <h2 id={headerId}><a href={`#waypoint${i}`}>{heading}</a></h2>
          {children}
        </section>
      </Html>
    </group>
  )
}