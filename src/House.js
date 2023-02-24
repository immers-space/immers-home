import React from "react";
import house from "./assets/Immers Home new apt.glb"
import { useCompressedGLTF } from "./util/useCompressedGLTF";

export default function Model(props) {
  const gltf = useCompressedGLTF(house)
  Object.values(gltf.nodes).forEach(n => (n.renderOrder = 2))
  return (
    <primitive object={gltf.scene} {...props} />
  );
}
