import React, { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, extend, useThree, useLoader } from '@react-three/fiber'
import { Water } from 'three-stdlib'
import waterNormalsTexture from './assets/waternormals.jpeg'

extend({ Water })

export default function Ocean({ position, sunPosition }) {
  const ref = useRef()
  const gl = useThree((state) => state.gl)
  const waterNormals = useLoader(THREE.TextureLoader, waterNormalsTexture)
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), [])
  const config = useMemo(
    () => ({
      alpha: 0.8,
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(...sunPosition),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 5,
      fog: true,
      format: gl.encoding
    }),
    [waterNormals, sunPosition, gl.encoding]
  )
  useEffect(() => {
    if (ref.current?.material) {
      ref.current.material.transparent = true
    }
  }, [ref])
  useFrame((state, delta) => {
    ref.current.material.uniforms.time.value += delta / 7.5
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) / 20
  })
  return <water ref={ref} args={[geom, config]} position={position} rotation-x={-Math.PI / 2} renderOrder={1} />
}