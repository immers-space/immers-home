import { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from 'three'
import { useImmersProfile } from "./util/useImmersProfile";
import placeholder from "./assets/shoppers/4.glb";
import { useThree } from "@react-three/fiber";

const boundingBox = new THREE.Box3()
const boundingBoxSize = new THREE.Vector3()
const boundingBoxCenter = new THREE.Vector3()

export function ImmersAvatar({ position, ...props}) {
  const { scene } = useThree()
  const [offsetPosition, setOffsetPosition] = useState([0, 0, 0])
  const [scaling, setScaling] = useState(1)
  const profile = useImmersProfile()
  const gltf = useGLTF(profile?.avatarModel ?? placeholder)

  // scale model and snap to floor
  useEffect(() => {
    boundingBox.setFromObject(gltf.scene)
    boundingBox.getSize(boundingBoxSize)
    boundingBox.getCenter(boundingBoxCenter)
    const scaleFactor = 1.2 / boundingBoxSize.y
    setScaling(scaleFactor)
    const centerToBottom = boundingBoxCenter.y - boundingBox.min.y
    setOffsetPosition([
      0,
      centerToBottom * 1 / scaleFactor,
      0
    ])
  }, [gltf, scene])

  return (
    <group position={position} {...props}>
      <group position={offsetPosition} scale={scaling} >
        <primitive object={gltf.scene} />
      </group>
    </group>
  )
}