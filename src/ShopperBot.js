import React, { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, animated, config } from '@react-spring/three'

import bot1 from "./assets/shoppers/1.glb"
import bot2 from "./assets/shoppers/2.glb"
import bot3 from "./assets/shoppers/3.glb"
// import bot4 from "./assets/shoppers/4.glb"

const count = 3
const size = 3
const gap = 2 * Math.PI / count
const period = 3000

export function ShopperSpinner(props) {
  const shopper1 = useGLTF(bot1)
  const shopper2 = useGLTF(bot2)
  const shopper3 = useGLTF(bot3)
  const [currentShopper, setCurrentShopper] = useState(0)
  const { rotation } = useSpring({
    rotation: [0, currentShopper * gap, 0],
    config: config.stiff
  })
  useEffect(() => {
    const timer = setInterval(
      () => setCurrentShopper(n => (n + 1)),
      period
    )
    return () => clearInterval(timer)
  }, [])
  return (
    <group {...props}>
      <animated.group rotation={rotation}>
        <primitive object={shopper1.scene} {...onCircle(size, 0)} />
        <primitive object={shopper2.scene} {...onCircle(size, gap)} />
        <primitive object={shopper3.scene} {...onCircle(size, 2 * gap)} />
      </animated.group>
    </group>
  )
}

function onCircle (radius, angle) {
  const position = [Math.cos(angle), 0, Math.sin(angle)]
  const rotation = [0, -1 * angle + Math.PI / 2, 0]
  return { position, rotation }
}

useGLTF.preload(bot1);
useGLTF.preload(bot2);
useGLTF.preload(bot3);
// useGLTF.preload(bot4);


