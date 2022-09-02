/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useLayoutEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, animated, config } from '@react-spring/three'
import { Vector3 } from "three";

import apartment from './assets/Immers Home.glb'
import { cursorPointer } from "./util/consts";

export default function Apartment({ setWaypoints, hideRoof, handleWaveClick,  ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF(apartment);
  const [waveHovered, setWaveHovered] = useState(false)
  const { wavePos } = useSpring({
    wavePos: waveHovered ? [50, 10, 10] : [10, 0, 0],
    config: config.wobbly
  })

  useLayoutEffect(() => {
    const waypointNodes = []
    Object.values(nodes).forEach((node) => {
      if (node.userData?.gltfExtensions?.MOZ_hubs_components?.waypoint) {
        waypointNodes.push(node.clone().rotateOnWorldAxis(new Vector3(0, 1, 0), Math.PI))
      }
    })
    waypointNodes.sort(alphaName)
    setWaypoints(waypointNodes)
  }, [nodes, setWaypoints, hideRoof])
  const handleWaveOver = () => {
    document.body.classList.add(cursorPointer)
    setWaveHovered(true)
  }
  const handleWaveOut = () => {
    document.body.classList.remove(cursorPointer)
    setWaveHovered(false)
  }
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Floor_Plan" position={[0, 0.01, 0]}>
        <mesh name="navMesh" castShadow receiveShadow geometry={nodes.navMesh.geometry} material={nodes.navMesh.material} />
      </group>
      <group name="Cilindro" position={[-3.25, 0.91, 4.22]} scale={0.14}>
        <mesh name="Cilindro001_0" castShadow receiveShadow geometry={nodes.Cilindro001_0.geometry} material={materials['mesa.001']} />
        <mesh name="Cilindro001_2" castShadow receiveShadow geometry={nodes.Cilindro001_2.geometry} material={materials['Material.022']} />
        <mesh name="Cilindro001_3" castShadow receiveShadow geometry={nodes.Cilindro001_3.geometry} material={materials['Material.023']} />
      </group>
      <group name="Assembly-7" scale={0.01}>
        <group name="3DGeom~6" rotation={[Math.PI / 2, 0, 0]}>
          <mesh name="Assembly-4001_0" castShadow receiveShadow geometry={nodes['Assembly-4001_0'].geometry} material={materials['texture.001']} />
          <mesh name="Assembly-4001_1" castShadow receiveShadow geometry={nodes['Assembly-4001_1'].geometry} material={materials['Material.029']} />
          <mesh name="Assembly-4001_2" castShadow receiveShadow geometry={nodes['Assembly-4001_2'].geometry} material={materials['Material.030']} />
          <mesh name="Assembly-4001_3" castShadow receiveShadow geometry={nodes['Assembly-4001_3'].geometry} material={materials['Material.031']} />
          <mesh name="Assembly-4001_4" castShadow receiveShadow geometry={nodes['Assembly-4001_4'].geometry} material={materials['Material.032']} />
          <mesh name="Assembly-4001_5" castShadow receiveShadow geometry={nodes['Assembly-4001_5'].geometry} material={materials['Material.033']} />
          <mesh name="Assembly-4001_6" castShadow receiveShadow geometry={nodes['Assembly-4001_6'].geometry} material={materials['Material.036']} />
          <mesh name="Assembly-4001_7" castShadow receiveShadow geometry={nodes['Assembly-4001_7'].geometry} material={materials['Material.037']} />
        </group>
        <group name="3DGeom~7" rotation={[Math.PI / 2, 0, 0]}>
          <mesh name="Assembly-6001_0" castShadow receiveShadow geometry={nodes['Assembly-6001_0'].geometry} material={materials['woood.001']} />
          <mesh name="Assembly-6001_1" castShadow receiveShadow geometry={nodes['Assembly-6001_1'].geometry} material={materials['Material.038']} />
        </group>
        <group name="Gray1" rotation={[Math.PI / 2, 0, 0]}>
          <mesh name="Assembly-2001_0" castShadow receiveShadow geometry={nodes['Assembly-2001_0'].geometry} material={materials['color.001']} />
          <mesh name="Assembly-2001_1" castShadow receiveShadow geometry={nodes['Assembly-2001_1'].geometry} material={materials['Material.039']} />
          <mesh name="Assembly-2001_2" castShadow receiveShadow geometry={nodes['Assembly-2001_2'].geometry} material={materials['Material.040']} />
          <mesh name="Assembly-2001_3" castShadow receiveShadow geometry={nodes['Assembly-2001_3'].geometry} material={materials['Material.041']} />
          <mesh name="Assembly-2001_4" castShadow receiveShadow geometry={nodes['Assembly-2001_4'].geometry} material={materials['Material.042']} />
          {/* great (vapor)wave */}
          <animated.mesh
            name="Assembly-2001_5"
            position={wavePos}
            onPointerOver={handleWaveOver}
            onPointerOut={handleWaveOut}
            onClick={handleWaveClick}
            castShadow receiveShadow
            geometry={nodes['Assembly-2001_5'].geometry} material={materials['Material.043']}
          />
          <mesh name="Assembly-2001_6" castShadow receiveShadow geometry={nodes['Assembly-2001_6'].geometry} material={materials['Material.045']} />
        </group>
      </group>
      <group name="sandglb" position={[-1.5, -12, 31]} scale={0.5}>
        <mesh name="Cube_2" castShadow receiveShadow geometry={nodes.Cube_2.geometry} material={materials.Mat} position={[0, 0, -54.36]} rotation={[-1.56, 0, 0]} />
      </group>
      <group name="Floor_Block_4x4x15_Base" position={[0, -2.97, 1.18]} scale={[4.5, 2, 4]}>
        <mesh name="Floor_Block_4x4x15_Base_mesh_0" castShadow receiveShadow geometry={nodes.Floor_Block_4x4x15_Base_mesh_0.geometry} material={materials.CarpetUniform} />
      </group>
      <group name="st-monetization-visible_st-monetization-networked_buddahglb" position={[5, 0, 1.5]} rotation={[0, Math.PI / 2, 0]} scale={20}>
        <mesh name="Buddha1" castShadow receiveShadow geometry={nodes.Buddha1.geometry} material={materials['Special Antique Bronze Matte']} rotation={[-Math.PI / 2, 0, 0]} scale={0.001} />
      </group>
      <group name="roof" visible={!hideRoof} position={[3.72, -0.89, 5.06]} rotation={[0, Math.PI / 2, 0]} scale={[1.2, 1.2, 0.83]}>
        <mesh name="Roof-Cedar_Shingle" geometry={nodes['Roof-Cedar_Shingle'].geometry} material={materials['Roof-Cedar Shingle']} scale={0.01} />
        <mesh name="Brick-Red" geometry={nodes['Brick-Red'].geometry} material={materials['Brick-Red']} scale={0.01} />
        <mesh name="Floor-Deck_Pine" geometry={nodes['Floor-Deck_Pine'].geometry} material={materials['Floor-Deck Pine']} scale={0.01} />
        <mesh name="Wd-Mahogany_Horizontal" geometry={nodes['Wd-Mahogany_Horizontal'].geometry} material={materials['Wd-Mahogany Horizontal']} scale={0.01} />
        <mesh name="Wd-Pine_Horizontal" geometry={nodes['Wd-Pine_Horizontal'].geometry} material={materials['Wd-Pine Horizontal']} scale={0.01} />
        <mesh name="Paint-01" geometry={nodes['Paint-01'].geometry} material={materials['Paint-01']} scale={0.01} />
        <mesh name="Paint-02" geometry={nodes['Paint-02'].geometry} material={materials['Paint-02']} scale={0.01} />
      </group>
      <mesh name="CombinedMesh" castShadow receiveShadow geometry={nodes.CombinedMesh.geometry} material={materials['base mesa.001']} />
      <mesh name="CombinedMesh_1" castShadow receiveShadow geometry={nodes.CombinedMesh_1.geometry} material={materials.PaintSatin} />
      <mesh name="CombinedMesh_2" castShadow receiveShadow geometry={nodes.CombinedMesh_2.geometry} material={materials['Material.002']} />
      <mesh name="CombinedMesh_3" castShadow receiveShadow geometry={nodes.CombinedMesh_3.geometry} material={materials['Material.011']} />
      <mesh name="CombinedMesh_4" castShadow receiveShadow geometry={nodes.CombinedMesh_4.geometry} material={materials['Material.003']} />
      <mesh name="CombinedMesh_5" castShadow receiveShadow geometry={nodes.CombinedMesh_5.geometry} material={materials['Material.007']} />
      <mesh name="CombinedMesh_6" castShadow receiveShadow geometry={nodes.CombinedMesh_6.geometry} material={materials['Material.001']} />
      <mesh name="CombinedMesh_7" castShadow receiveShadow geometry={nodes.CombinedMesh_7.geometry} material={materials['Material.008']} />
      <mesh name="CombinedMesh_8" castShadow receiveShadow geometry={nodes.CombinedMesh_8.geometry} material={materials['Material.009']} />
      <mesh name="CombinedMesh_9" castShadow receiveShadow geometry={nodes.CombinedMesh_9.geometry} material={materials['Material.001']} />
      <mesh name="CombinedMesh_10" castShadow receiveShadow geometry={nodes.CombinedMesh_10.geometry} material={materials['Material #49']} />
    </group>
  )
}

useGLTF.preload(apartment);

function alphaName (a, b) {
  if (a.name < b.name) {
    return -1
  }
  if (a.name > b.name) {
    return 1
  }
  return 0
}