import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GithubLogo, LinkedinLogo, PaperPlaneTilt } from "@phosphor-icons/react";
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-input",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".social-icon",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".social-links",
            start: "top 90%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center gradient-text">
          Let's Connect
        </h2>
        <p className="text-muted-foreground text-center mb-16 text-lg">
          Have a project in mind? Let's create something amazing together.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="contact-input">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-6 py-4 glass rounded-xl border border-transparent focus:border-primary focus:glow-primary outline-none transition-all bg-input text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="contact-input">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full px-6 py-4 glass rounded-xl border border-transparent focus:border-primary focus:glow-primary outline-none transition-all bg-input text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="contact-input">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              rows={6}
              className="w-full px-6 py-4 glass rounded-xl border border-transparent focus:border-primary focus:glow-primary outline-none transition-all resize-none bg-input text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <button
            type="submit"
            className="contact-input w-full px-8 py-4 bg-primary/20 border border-primary rounded-xl hover:bg-primary/30 transition-all glow-primary flex items-center justify-center gap-3 text-lg font-medium group"
          >
            Send Message
            <PaperPlaneTilt
              size={24}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>
        </form>

        <div className="social-links flex justify-center gap-8 mt-16">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon p-4 glass rounded-full hover:glow-primary transition-all hover:scale-110"
          >
            <GithubLogo size={32} className="text-primary" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon p-4 glass rounded-full hover:glow-primary transition-all hover:scale-110"
          >
            <LinkedinLogo size={32} className="text-primary" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
