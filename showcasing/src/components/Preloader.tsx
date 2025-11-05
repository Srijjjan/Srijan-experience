import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloaderRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: "power2.inOut",
          onComplete,
        });
      },
    });

    tl.to(progressBarRef.current, {
      width: "100%",
      duration: 2,
      ease: "power2.out",
    });

    gsap.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      <div
        ref={textRef}
        className="mb-12 opacity-0 translate-y-4"
      >
        <h1 className="text-6xl md:text-8xl font-orbitron font-black gradient-text" style={{ textShadow: '0 0 40px rgba(139, 92, 246, 0.6)' }}>
          SRIJAN
        </h1>
      </div>
      
      <div className="w-64 md:w-96 h-1 bg-muted rounded-full overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full glow-primary"
          style={{ width: "0%" }}
        />
      </div>
      
      <div className="mt-6 text-muted-foreground text-sm tracking-widest">
        LOADING EXPERIENCE
      </div>
    </div>
  );
};

export default Preloader;
