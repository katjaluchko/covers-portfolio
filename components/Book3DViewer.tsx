import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useLanguage } from '../context/LanguageContext';

const BookModel = ({ frontUrl }: { frontUrl: string }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Load textures
  const frontTexture = useLoader(THREE.TextureLoader, frontUrl);
  
  // Apply settings to texture
  useMemo(() => {
    if (frontTexture) {
      frontTexture.anisotropy = 16;
      frontTexture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [frontTexture]);

  const spineColor = "#1a1a1a";
  const backColor = "#0f0f0f";
  const pagesColor = "#e8e4d9";

  return (
    <group>
      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[1.5, 2.2, 0.2]} />
        
        {/* Order: [Right, Left(Spine), Top, Bottom, Front, Back] */}
        <meshStandardMaterial attach="material-0" color={pagesColor} roughness={0.8} />
        <meshStandardMaterial attach="material-1" color={spineColor} roughness={0.3} />
        <meshStandardMaterial attach="material-2" color={pagesColor} roughness={0.8} />
        <meshStandardMaterial attach="material-3" color={pagesColor} roughness={0.8} />
        <meshStandardMaterial attach="material-4" map={frontTexture} roughness={0.2} metalness={0.1} />
        <meshStandardMaterial attach="material-5" color={backColor} roughness={0.3} />
      </mesh>
    </group>
  );
};

const Book3DViewer: React.FC = () => {
  const { t } = useLanguage();
  const frontCoverUrl = "https://i.ibb.co/vCFHf483/ebook.jpg";

  return (
    <section className="py-24 bg-black relative overflow-hidden border-b border-white/5">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 text-center">
        <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
                {t.book3d?.title || "3D Preview"}
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
                {t.book3d?.subtitle || "Взаємодійте з макетом: крутіть книгу мишкою, щоб роздивитися деталі."}
            </p>
        </div>

        <div className="w-full h-[500px] md:h-[600px] cursor-grab active:cursor-grabbing">
          <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
            
            <Suspense fallback={null}>
              <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <BookModel frontUrl={frontCoverUrl} />
              </Float>
              <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
              <Environment preset="city" />
            </Suspense>

            <OrbitControls 
                enableZoom={false} 
                minPolarAngle={Math.PI / 3} 
                maxPolarAngle={Math.PI / 1.5} 
                autoRotate 
                autoRotateSpeed={1}
            />
          </Canvas>
        </div>
        
        <div className="mt-8 flex flex-col items-center">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 uppercase tracking-widest animate-bounce">
                <span>Крутіть книгу мишкою</span>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Book3DViewer;