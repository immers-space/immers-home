import React from "react";
import { useGLTF } from "@react-three/drei";
import house from "./assets/Immers Home new apt.glb"

export default function Model(props) {
  const gltf = useGLTF(house);
  Object.values(gltf.nodes).forEach(n => (n.renderOrder = 2))
  return (
    <primitive object={gltf.scene} {...props} />
  );
}

useGLTF.preload(house);


