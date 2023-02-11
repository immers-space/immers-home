import React from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, animated, config } from '@react-spring/three'

import bot1 from "./assets/bots/1.glb"
import bot2 from "./assets/bots/2.glb"
import bot3 from "./assets/bots/3.glb"
import bot4 from "./assets/bots/4.glb"

function WorkerBot ({ gltf, show, position, ...props  }) {
  const start = position.slice()
  start[1] += 4
  const { animPos } = useSpring({
    animPos: show ? position : start,
    config: config.gentle
  })
  // move hands out of t-pose
  gltf?.nodes.RightHand?.rotation.set(1.57, -0.10, -0.23)
  gltf?.nodes.RightHand?.position.set(-0.35, -0.08, 0.30)
  gltf?.nodes.LeftHand?.rotation.set(1.57, -0.10, -0.23)
  gltf?.nodes.LeftHand?.position.set(0.35, -0.08, 0.30)
  return (
    <animated.primitive object={gltf.scene} position={animPos} {...props} />
  )
}

export function WorkerBot1(props) {
  const gltf = useGLTF(bot1);
  return (
    <WorkerBot gltf={gltf} {...props} />
  )
}

export function WorkerBot2(props) {
  const gltf = useGLTF(bot2);
  return (
    <WorkerBot gltf={gltf} {...props} />
  );
}

export function WorkerBot3(props) {
  const gltf = useGLTF(bot3);
  return (
    <WorkerBot gltf={gltf} {...props} />
  );
}

export function WorkerBot4(props) {
  const gltf = useGLTF(bot4);
  return (
    <WorkerBot gltf={gltf} {...props} />
  );
}


useGLTF.preload(bot1);
useGLTF.preload(bot2);
useGLTF.preload(bot3);
useGLTF.preload(bot4);


