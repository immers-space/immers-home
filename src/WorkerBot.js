import React from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, animated, config } from '@react-spring/three'

import bot1 from "./assets/bots/1.glb"
import bot2 from "./assets/bots/2.glb"
import bot3 from "./assets/bots/3.glb"
import bot4 from "./assets/bots/4.glb"

function WorkerBot ({ scene, show, position, ...props  }) {
  const start = position.slice()
  start[1] += 4
  const { animPos } = useSpring({
    animPos: show ? position : start,
    config: config.gentle
  })
  return (
    <animated.primitive object={scene} position={animPos} {...props} />
  )
}

export function WorkerBot1(props) {
  const gltf = useGLTF(bot1);
  return (
    <WorkerBot scene={gltf.scene} {...props} />
  )
}

export function WorkerBot2(props) {
  const gltf = useGLTF(bot2);
  return (
    <WorkerBot scene={gltf.scene} {...props} />
  );
}

export function WorkerBot3(props) {
  const gltf = useGLTF(bot3);
  return (
    <WorkerBot scene={gltf.scene} {...props} />
  );
}

export function WorkerBot4(props) {
  const gltf = useGLTF(bot4);
  return (
    <WorkerBot scene={gltf.scene} {...props} />
  );
}


useGLTF.preload(bot1);
useGLTF.preload(bot2);
useGLTF.preload(bot3);
useGLTF.preload(bot4);


