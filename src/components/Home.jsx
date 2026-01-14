import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import download from "../assets/download.jpg";

gsap.registerPlugin(ScrollTrigger);

/* ================= HERO SECTIONS ================= */
const heroSections = [
  { id: 1, title: "Section One", desc: "This is section one.", btn: "Learn More", bg: download },
  { id: 2, title: "Section Two", desc: "This is section two.", btn: "Explore", bg: download },
  { id: 3, title: "Section Three", desc: "This is section three.", btn: "Get Started", bg: download },
  { id: 4, title: "Section Four", desc: "This is section four.", btn: "Join Now", bg: download },
];


const stackedSections = [
  { title: "Agriculture Growth", desc: "Sustainable farming techniques.", bg: "#f1f5f9" },
  { title: "Organic Solutions", desc: "Healthy crops without chemicals.", bg: "#dcfce7" },
{ title: "Smart Farming", desc: "Technology driven agriculture.", bg: "#e0f2fe" },
  { title: "Future Vision", desc: "Innovation and sustainability.", bg: "#fae8ff" },
];

const Home = () => {
  const heroRefs = useRef([]);
  const stackWrapperRef = useRef(null);
  const stackedRefs = useRef([]);

  /* ================= HERO ZOOM ================= */
  useEffect(() => {
    heroRefs.current.forEach((section) => {
      gsap.fromTo(
        section,
        { scale: 1 },
        {
          scale: 0.85,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  /* ================= STACKED SCROLL ================= */
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stackWrapperRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 2}`, // 2 viewports
        scrub: 1 ,
        pin: true,
        anticipatePin: 1,
      },
    });

    stackedRefs.current.forEach((section, i) => {
      if (i === 0) return;
      tl.fromTo(
        section,
        { yPercent: 100 },
        { yPercent: 0, ease: "power1.out" },
        (i - 1) * 0.5
      );
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <div>
      {/* ================= HERO ================= */}
      {heroSections.map((item, i) => (
        <section
          key={item.id}
          ref={(el) => (heroRefs.current[i] = el)}
          className="min-h-screen relative flex items-center justify-center text-white overflow-hidden"
          style={{
            backgroundImage: `url(${item.bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative text-center max-w-xl px-4">
            <h1 className="text-5xl font-bold mb-4">{item.title}</h1>
            <p className="mb-6">{item.desc}</p>
            <button className="bg-blue-600 px-6 py-3 rounded-lg">
              {item.btn}
            </button>
          </div>
        </section>
      ))}

      {/* ================= STACKED (FULL VIEWPORT FIXED) ================= */}
      <div
        ref={stackWrapperRef}
        className="relative h-screen overflow-hidden border-2"
      >
        {stackedSections.map((item, i) => (
          <section
            key={i}
            ref={(el) => (stackedRefs.current[i] = el)}
            className="absolute border-2 inset-0 h-screen min-h-screen flex items-center"
            style={{
              background: item.bg,
              zIndex: i + 1,
            }}
          >
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center h-full">
              {/* LEFT TEXT */}
              <div className="flex flex-col justify-center">
                <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
                <p className="text-lg text-gray-700">{item.desc}</p>
              </div>

              {/* RIGHT IMAGE */}
              <div className="flex justify-center">
                <img
                  src={download}
                  alt=""
                  className="w-full max-w-md rounded-xl shadow-lg"
                />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Home;
