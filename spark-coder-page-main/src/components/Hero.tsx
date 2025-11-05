import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "@phosphor-icons/react";

const Hero = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 50, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.4"
      )
      .fromTo(
        splineRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1.2, ease: "power2.out" },
        "-=1"
      );

    // Floating orbs animation
    gsap.to(".float-orb", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.5,
    });
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Spline 3D Background */}
      <div ref={splineRef} className="absolute inset-0 z-0 opacity-50">
        <iframe
          src="https://my.spline.design/chainmailbackground-qFR2zmPUD5aQJcgc2HjsA2LL/"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
      
      {/* Gradient overlay for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background z-0" />

      {/* Floating Orbs */}
      <div className="float-orb absolute top-20 left-20 w-32 h-32 rounded-full bg-primary/20 blur-3xl" />
      <div className="float-orb absolute bottom-40 right-20 w-40 h-40 rounded-full bg-secondary/20 blur-3xl" />
      <div className="float-orb absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-accent/20 blur-3xl" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1
          ref={headlineRef}
          className="text-6xl md:text-8xl lg:text-9xl font-orbitron font-black mb-6 gradient-text tracking-wider"
          style={{ textShadow: '0 0 60px rgba(139, 92, 246, 0.5), 0 0 100px rgba(139, 92, 246, 0.3)' }}
        >
          HELLO!
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Full Stack Developer crafting immersive digital experiences with cutting-edge technologies
        </p>
        <button
          ref={ctaRef}
          onClick={scrollToContact}
          className="group px-8 py-4 bg-primary/20 border border-primary rounded-full hover:bg-primary/30 transition-all glow-primary inline-flex items-center gap-3 text-lg font-medium"
        >
          Hire Me
          <ArrowRight
            size={24}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </section>
  );
};

export default Hero;
