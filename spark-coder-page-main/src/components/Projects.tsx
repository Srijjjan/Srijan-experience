import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "@phosphor-icons/react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Developer Workspace",
    description: "Modern development environment with dual monitor setup",
    tech: ["React", "TypeScript", "GSAP"],
    image: project1,
  },
  {
    title: "Holographic UI",
    description: "Futuristic mobile app with holographic interface",
    tech: ["React Native", "Three.js", "Spline"],
    image: project2,
  },
  {
    title: "Analytics Dashboard",
    description: "Real-time data visualization platform",
    tech: ["Next.js", "D3.js", "Tailwind"],
    image: project3,
  },
  {
    title: "AI Chatbot",
    description: "Neural network powered conversation interface",
    tech: ["Python", "TensorFlow", "React"],
    image: project4,
  },
  {
    title: "Creative Landing",
    description: "Award-winning landing page with 3D elements",
    tech: ["React", "Three.js", "GSAP"],
    image: project5,
  },
  {
    title: "Crypto Platform",
    description: "Trading platform with real-time charts",
    tech: ["Vue", "WebSockets", "Chart.js"],
    image: project6,
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-16 text-center gradient-text"
        >
          Featured Projects
        </h2>

        <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card glass rounded-2xl overflow-hidden group cursor-pointer hover:glow-primary transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-primary/10 border border-primary/30 rounded-full text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <button className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                  View Project
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
