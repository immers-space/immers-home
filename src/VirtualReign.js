import React, { useCallback, useState } from "react";
import { Text, useGLTF } from "@react-three/drei";
import { cursorPointer, font } from "./util/consts";
import { useSpring, animated, config } from '@react-spring/three'


import queen from "./assets/black_queen.glb"

export default function VirtualReign({ position, scale, setIsActive }) {
  const gltf = useGLTF(queen)
  const [hovered, setHovered] = useState(false)
  const { finalScale } = useSpring({
    finalScale: hovered ? scale * 1.15 : scale,
    config: config.wobbly
  })
  const handleOver = useCallback(() => {
    document.body.classList.add(cursorPointer)
    setHovered(true)
    setIsActive(true)
  }, [setIsActive])
  const handleOut = useCallback(() => {
    document.body.classList.remove(cursorPointer)
    setHovered(false)
    setIsActive(false)
  }, [setIsActive])
  const handleClick = useCallback(() => {
    window.location = 'https://hub.vreign.space'
  }, [])
  return (
    <group position={position}>
      <animated.primitive
        scale={finalScale} object={gltf.scene}
        onClick={handleClick}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
      />
      <Text
        position={[0, 0.1, 1]}
        fontSize={0.75}
        color="#052464"
        anchorX="center"
        anchorY="middle"
        rotation-x={-Math.PI / 2}
        font={font}
        visible={hovered}
      >
        Virtual Reign Immersive Chess
      </Text>
    </group>
  )
}

useGLTF.preload(queen);
