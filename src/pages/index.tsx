import { useMemo } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import ControlPanel from "@/components/template/ControlPanel";
import MainScene from "@/components/scene/MainScene";

const Home = () => {
  const fog = useMemo(() => new THREE.Fog(0xffff00), []);

  return (
    <main>
      <Canvas
        gl={{ antialias: true }}
        scene={{ fog }}
        camera={{
          position: [0, 3, 0],
          up: [0, 0, 1],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
      >
        <MainScene />
      </Canvas>

      <ControlPanel />
    </main>
  );
};

export default Home;
