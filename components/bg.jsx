import { useEffect, useRef, useState, useMemo, useLayoutEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AsciiEffect } from 'three-stdlib'

export default function Background() {
  return (
    <Canvas>
      <color attach="background" args={['black']} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <AsciiRenderer fgColor="white" bgColor="black" />
      <Thing />
    </Canvas>
  )
}

function Thing() {
  const ref = useRef()
  useFrame(() => {
    ref.current.rotation.x = ref.current.rotation.y += 0.01
  })
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.2, 128, 32]} />
      <meshStandardMaterial />
    </mesh>
  )
}

function AsciiRenderer({
    renderIndex = 1,
    bgColor = 'black',
    fgColor = 'white',
    characters = ' .:-+*=%@#',
    invert = true,
    color = false,
    resolution = 0.15
  }) {
    // Reactive state
    const { size, gl, scene, camera } = useThree()
  
    // Create effect
    const effect = useMemo(() => {
      const effect = new AsciiEffect(gl, characters, { invert, color, resolution })
      effect.domElement.style.position = 'absolute'
      effect.domElement.style.top = '0px'
      effect.domElement.style.left = '0px'
      effect.domElement.style.pointerEvents = 'none'
      return effect
    }, [characters, invert, color, resolution])
  
    // Styling
    useLayoutEffect(() => {
      effect.domElement.style.color = fgColor
      effect.domElement.style.backgroundColor = bgColor
    }, [fgColor, bgColor])
  
    // Append on mount, remove on unmount
    useEffect(() => {
      gl.domElement.style.opacity = '0'
      gl.domElement.parentNode.appendChild(effect.domElement)
      return () => {
        gl.domElement.style.opacity = '1'
        gl.domElement.parentNode.removeChild(effect.domElement)
      }
    }, [effect])
  
    // Set size
    useEffect(() => {
      effect.setSize(size.width, size.height)
    }, [effect, size])
  
    // Take over render-loop (that is what the index is for)
    useFrame((state) => {
      effect.render(scene, camera)
    }, renderIndex)
  
    // This component returns nothing, it is a purely logical
  }