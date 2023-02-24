import React, { useLayoutEffect, useState } from "react";
import { useSpring, animated, config } from '@react-spring/three'
import { Vector3 } from "three";

import apartment from './assets/Immers Home deco.glb'
import { cursorPointer } from "./util/consts";
import { useCompressedGLTF } from "./util/useCompressedGLTF";

export default function Apartment({ setWaypoints, hideRoof, handleWaveClick,  ...props }) {
  const { nodes, materials } = useCompressedGLTF(apartment);
  const [waveHovered, setWaveHovered] = useState(false)
  const { wavePos } = useSpring({
    wavePos: waveHovered ? [3000, 0, 500] : [100, 0, 50],
    config: config.default
  })

  useLayoutEffect(() => {
    const waypointNodes = []
    Object.values(nodes).forEach((node) => {
      if (node.name?.startsWith('Way_Point')) {
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
    <group {...props} dispose={null}>
      <group name="Assembly-7" scale={0.01}>
        <group name="Gray1" rotation={[Math.PI / 2, 0, 0]} >
          <group position={[-100.548676, -100.094498, -241.126678]} scale={0.03339058}>
            <animated.mesh
              name="Assembly-2001_5"
              position={wavePos}
              onPointerOver={handleWaveOver}
              onPointerOut={handleWaveOut}
              onClick={handleWaveClick}
              castShadow receiveShadow
              geometry={nodes.mesh_0.geometry}
              material={materials["Material.043"]}
              
            />

          </group>
        </group>
      </group>
      <group
        name="Cilindro"
        position={[-3.2479558, 0.90702772, 4.2165122]}
        scale={0.14208935}
      >
        <mesh
          name="mesh_1"
          castShadow
          receiveShadow
          geometry={nodes.mesh_1.geometry}
          material={materials["mesa.001"]}
          position={[-100.548676, -100.094498, -241.126678]}
          scale={0.03339058}
        />
        <mesh
          name="mesh_2"
          castShadow
          receiveShadow
          geometry={nodes.mesh_2.geometry}
          material={materials["Material.022"]}
          position={[-100.548676, -100.094498, -241.126678]}
          scale={0.03339058}
        />
        <mesh
          name="mesh_3"
          castShadow
          receiveShadow
          geometry={nodes.mesh_3.geometry}
          material={materials["Material.023"]}
          position={[-100.548676, -100.094498, -241.126678]}
          scale={0.03339058}
        />
      </group>
      <group name="sandglb" position={[-1.5, -12, 31]} scale={0.5}>
        <group
          name="Cube_2"
          position={[0, 0.0000248, -54.3633423]}
          rotation={[-1.56474842, 0, 0]}
        >
          <mesh
            name="mesh_4"
            castShadow
            receiveShadow
            geometry={nodes.mesh_4.geometry}
            material={materials.Mat}
            position={[-100.548676, -100.094498, -241.126678]}
            scale={0.03339058}
          />
        </group>
      </group>
      <group
        name="Floor_Block_4x4x15_Base"
        position={[0, -2.9709239, 1.17780256]}
        scale={[4.5, 2, 4]}
      >
        <mesh
          name="mesh_5"
          castShadow
          receiveShadow
          geometry={nodes.mesh_5.geometry}
          material={materials.CarpetUniform}
          position={[-100.548676, -100.094498, -241.126678]}
          scale={0.03339058}
        />
      </group>
      <group
        name="st-monetization-visible_st-monetization-networked_buddahglb"
        position={[5, 0, 1.5]}
        rotation={[0, 1.57053377, 0]}
        scale={[20.0000019, 20, 20.0000019]}
      >
        <group name="Buddha1" rotation={[-Math.PI / 2, 0, 0]} scale={0.001}>
          <mesh
            name="mesh_6"
            castShadow
            receiveShadow
            geometry={nodes.mesh_6.geometry}
            material={materials["Special Antique Bronze Matte"]}
            position={[-100.548676, -100.094498, -241.126678]}
            scale={0.03339058}
          />
        </group>
      </group>
      <mesh
        name="mesh_7"
        castShadow
        receiveShadow
        geometry={nodes.mesh_7.geometry}
        material={materials["base mesa.001"]}
        position={[-100.548676, -100.094498, -241.126678]}
        scale={0.03339058}
      />
      <mesh
        name="mesh_8"
        castShadow
        receiveShadow
        geometry={nodes.mesh_8.geometry}
        material={materials.PaintSatin}
        position={[-100.548676, -100.094498, -241.126678]}
        scale={0.03339058}
      />
      <mesh
        name="mesh_9"
        castShadow
        receiveShadow
        geometry={nodes.mesh_9.geometry}
        material={materials["Material.002"]}
        position={[-100.548676, -100.094498, -241.126678]}
        scale={0.03339058}
      />
      <mesh
        name="mesh_10"
        castShadow
        receiveShadow
        geometry={nodes.mesh_10.geometry}
        material={materials["Material.011"]}
        position={[-100.548676, -100.094498, -241.126678]}
        scale={0.03339058}
      />
      <mesh
        name="mesh_11"
        castShadow
        receiveShadow
        geometry={nodes.mesh_11.geometry}
        material={materials["Material.003"]}
        position={[-100.548676, -100.094498, -241.126678]}
        scale={0.03339058}
      />
      <mesh
        name="mesh_12"
        castShadow
        receiveShadow
        geometry={nodes.mesh_12.geometry}
        material={materials["Material.007"]}
        position={[-100.548676, -100.094498, -241.126678]}
        scale={0.03339058}
      />
      <mesh
        name="mesh_13"
        castShadow
        receiveShadow
        geometry={nodes.mesh_13.geometry}
        material={materials["Material.001"]}
        position={[-100.548676, -100.094498, -241.126678]}
        scale={0.03339058}
      />
      <mesh
        name="mesh_14"
        castShadow
        receiveShadow
        geometry={nodes.mesh_14.geometry}
        material={materials["Material.008"]}
        position={[-100.548676, -100.094498, -241.126678]}
        scale={0.03339058}
      />
      <mesh
        name="mesh_15"
        castShadow
        receiveShadow
        geometry={nodes.mesh_15.geometry}
        material={materials["Material.009"]}
        position={[-100.548676, -100.094498, -241.126678]}
        scale={0.03339058}
      />
      <mesh
        name="mesh_16"
        castShadow
        receiveShadow
        geometry={nodes.mesh_16.geometry}
        material={materials["Material.004"]}
        position={[-100.548676, -100.094498, -241.126678]}
        scale={0.03339058}
      />
      <mesh
        name="mesh_17"
        castShadow
        receiveShadow
        geometry={nodes.mesh_17.geometry}
        material={materials["Material #49"]}
        position={[-100.548676, -100.094498, -241.126678]}
        scale={0.03339058}
      />
    </group>
  )
}


function alphaName (a, b) {
  if (a.name < b.name) {
    return -1
  }
  if (a.name > b.name) {
    return 1
  }
  return 0
}