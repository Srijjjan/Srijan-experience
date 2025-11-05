import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 60, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );

      // Floating particles
      const particles = footerRef.current?.querySelectorAll(".particle");
      particles?.forEach((particle) => {
        gsap.to(particle, {
          y: -20,
          duration: gsap.utils.random(2, 4),
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: gsap.utils.random(0, 2),
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-16 border-t border-border/30 overflow-hidden"
    >
      {/* Floating Particles */}
      <div className="particle absolute top-10 left-20 w-2 h-2 rounded-full bg-primary/40 blur-sm" />
      <div className="particle absolute top-20 right-40 w-3 h-3 rounded-full bg-secondary/40 blur-sm" />
      <div className="particle absolute bottom-10 left-1/4 w-2 h-2 rounded-full bg-accent/40 blur-sm" />
      <div className="particle absolute bottom-20 right-1/3 w-3 h-3 rounded-full bg-primary/40 blur-sm" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold gradient-text mb-2">Srijan</div>
            <p className="text-muted-foreground text-sm">
              Crafting digital experiences
            </p>
          </div>

          <nav className="flex gap-8">
            {["About", "Projects", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-border/20 text-center text-muted-foreground text-sm flex items-center justify-center gap-2">
          <span>© 2025 Srijan. Made with</span>
          <Heart size={16} weight="fill" className="text-primary animate-pulse-glow" />
          <span>and GSAP</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
