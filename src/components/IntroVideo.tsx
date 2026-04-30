import { useRef } from 'react';
import { motion } from 'framer-motion';

interface IntroVideoProps {
  onEnd: () => void;
}

export default function IntroVideo({ onEnd }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="fixed inset-0 w-screen h-screen z-50 bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
        onEnded={onEnd}
      >
        <source src="/videos/logo-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
