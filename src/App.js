import './App.scss';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { softShadows, MeshWobbleMaterial, OrbitControls } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
softShadows();

const SpinningBox = ({ position, args, color, speed, factor }) => {
  const mesh = useRef(null);
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });
  const [expanded, setExpanded] = useState(false);

  const props = useSpring({
    scale: expanded ? [1.5, 1.5, 1.5] : [1, 1, 1],
  });
  return (
    <animated.mesh onClick={() => setExpanded(!expanded)} castShadow position={position} scale={props.scale} ref={mesh}>
      <boxBufferGeometry attach='geometry' args={args} />
      <MeshWobbleMaterial attach='material' color={color} speed={speed} factor={factor} />
    </animated.mesh>
  );
};

export const App = () => {
  return (
    <>
      <Canvas colorManagement shadows camera={{ position: [-5, 2, 10], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[0, -20, -10]} intensity={1.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        <group>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <shadowMaterial attach='material' opacity={0.3} />
          </mesh>
        </group>

        <SpinningBox position={[0, 1, 0]} args={[3, 2, 1]} color='lightred' speed={1} factor={0.6} />
        <SpinningBox position={[-2, 1, -5]} args={[1.5, 1.2, 1]} color='pink' speed={5} factor={0.4} />
        <SpinningBox position={[5, 1, -3]} color='pink' speed={10} factor={0.4} />
        <OrbitControls />
      </Canvas>
    </>
  );
};
