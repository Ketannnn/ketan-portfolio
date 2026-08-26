import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Center, PerformanceMonitor } from '@react-three/drei';
import { useInView } from 'framer-motion';
import * as THREE from 'three';
function Avatar() {
  const { scene, animations } = useGLTF('/avatar.glb');
  const { actions } = useAnimations(animations, scene);

  const headBone = useMemo(() => {
    return scene.getObjectByName('Head') || scene.getObjectByName('mixamorigHead');
  }, [scene]);

  useEffect(() => {
    // 1. Play Idle Animation
    if (actions && Object.keys(actions).length > 0) {
      actions[Object.keys(actions)[0]]?.play();
    }



    // 2. Fix Hair Color and Materials
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(mat => {
            mat.transparent = false;
            mat.opacity = 1;
          });
        } else if (mesh.material) {
          mesh.material.transparent = false;
          mesh.material.opacity = 1;
        }

        if (mesh.name.toLowerCase().includes('hair')) {
          mesh.material = new THREE.MeshStandardMaterial({
            color: '#1c1917', // Dark charcoal
            roughness: 0.8,
          });
        }
      }
    });
  }, [actions, scene]);

  // 3. Mouse Tracking (Only the head)
  useFrame((state) => {
    if (headBone) {
      // Lerp smooths the movement so it doesn't snap instantly
      headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, state.pointer.x / 2.5, 0.1);
      headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, -state.pointer.y / 2.5, 0.1);
    }
  });

  // INVARIANT FIX: Hardcoded layout coordinates derived from GUI calibration
  return (
    <Center position={[0, -2.5, 0]}>
      <primitive object={scene} scale={350} />
    </Center>
  );
}

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);
  const [dpr, setDpr] = useState(1.5);

  return (
    <div ref={containerRef} className="absolute inset-0 z-50 w-full h-full min-h-[500px]">
      <Canvas 
        frameloop={isInView ? 'always' : 'demand'} 
        dpr={dpr} 
        camera={{ position: [0, 0, 2.5], fov: 40 }}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 5, 2]} intensity={2.5} />

        <Suspense fallback={null}>
          <Avatar />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/avatar.glb');