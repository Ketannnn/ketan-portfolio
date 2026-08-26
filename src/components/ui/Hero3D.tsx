import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Center } from '@react-three/drei';
import * as THREE from 'three';

function Avatar({ isInView }: { isInView: boolean }) {
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

  // 3. Mouse Tracking (Only the head, only when Hero is visible)
  useFrame((state) => {
    if (headBone) {
      if (isInView) {
        // Original cursor-following behaviour, unchanged
        headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, state.pointer.x / 2.5, 0.1);
        headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, -state.pointer.y / 2.5, 0.1);
      } else {
        // Lerp back to neutral when Hero is scrolled out of view
        headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, 0, 0.05);
        headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, 0, 0.05);
      }
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

  // DPR clamped to [1, 1.5] via stable array — set once at mount, no re-renders.
  // Previously used useState(1.5) + PerformanceMonitor which triggered a mid-init
  // WebGL framebuffer resize on Safari (slow shader compilation caused onDecline
  // to fire during initialization, causing visible jank on first load).

  // IMPORTANT: initialise to true so Canvas starts in 'always' mode on first render.
  // framer-motion's useInView() returns false until the IntersectionObserver fires,
  // causing the Canvas to start in 'demand' mode and head tracking to wrongly reset to
  // neutral — both regress during initial load. A manual observer starting at true fixes both.
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-50 w-full h-full min-h-[500px]">
      <Canvas 
        frameloop={isInView ? 'always' : 'demand'} 
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 2.5], fov: 40 }}
      >

        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 5, 2]} intensity={2.5} />

        <Suspense fallback={null}>
          <Avatar isInView={isInView} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/avatar.glb');