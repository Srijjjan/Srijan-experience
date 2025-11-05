import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Globe, Sparkle, Lightning } from "@phosphor-icons/react";
import profileImage from "@/assets/profile.jpg";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React", icon: Code },
  { name: "TypeScript", icon: Code },
  { name: "Node.js", icon: Globe },
  { name: "GSAP", icon: Sparkle },
  { name: "Three.js", icon: Lightning },
  { name: "Tailwind", icon: Code },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, filter: "blur(10px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -100, rotate: -10 },
        {
          opacity: 1,
          x: 0,
          rotate: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".skill-icon",
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".skill-grid",
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Gradient overlay at top for smooth transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-0" />
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="relative w-80 h-80 mx-auto rounded-full overflow-hidden border-4 border-primary/30 group-hover:border-primary/60 transition-all group-hover:scale-105 duration-500">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              About Me
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              I'm a passionate Full Stack Developer specializing in creating immersive web experiences. 
              With expertise in modern JavaScript frameworks, 3D graphics, and animation libraries, 
              I transform ideas into stunning digital realities.
            </p>
            <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
              My mission is to push the boundaries of web development, combining cutting-edge 
              technologies with elegant design to deliver exceptional user experiences.
            </p>

            {/* Skills Grid */}
            <div className="skill-grid grid grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-icon glass p-4 rounded-xl hover:glow-primary transition-all cursor-pointer group"
                >
                  <skill.icon
                    size={32}
                    className="mx-auto mb-2 text-primary group-hover:scale-110 transition-transform"
                  />
                  <p className="text-center text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {skill.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
