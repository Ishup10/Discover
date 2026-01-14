import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import download from "../assets/download.jpg";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { title: "Empowering Leaders", desc: "We equip pastors and leaders...", image: download, bg: "bg-red-600" },
  { title: "Training & Discipleship", desc: "Developing strong biblical foundations...", image: download, bg: "bg-blue-600" },
  { title: "Community Outreach", desc: "Serving communities with love...", image: download, bg: "bg-green-600" },
  { title: "Global Mission", desc: "Reaching nations with the Gospel...", image: download, bg: "bg-yellow-500" },
];

const Hero = () => {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * sections.length}`,
          scrub: 0.8, // smooth scrub
          pin: true,
        },
      });

      sectionRefs.current.forEach((section, i) => {
        if (i === 0) return;

        // Offset each section slightly faster for later ones
        const speedFactor = 0.6 + i * 0.1; // 0.6 for 2nd, 0.7 for 3rd, 0.8 for 4th
        tl.fromTo(
          section,
          { yPercent: 100 },
          { yPercent: 0, ease: "power1.out" },
          i - speedFactor
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {sections.map((item, i) => (
        <div
          key={i}
          ref={(el) => (sectionRefs.current[i] = el)}
          className={`absolute inset-0 flex items-center text-cream ${item.bg}`}
          style={{ zIndex: i + 1 }}
        >
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* LEFT TEXT */}
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{item.title}</h2>
              <p className="text-lg opacity-90 max-w-md">{item.desc}</p>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full h-80 md:h-[420px] rounded-xl overflow-hidden shadow-xl">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Hero;
