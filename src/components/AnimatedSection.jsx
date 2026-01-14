import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis"; // 1. Import Lenis

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AnimatedSection = () => {
  const container = useRef();
  const cardRef = useRef();

  const stackData = [
    {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2070",
      title: "DISCOVER",
      desc: "Begin your journey into the heart of the wild."
    },
    {
      url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=2070",
      title: "SILENCE",
      desc: "Experience the profound tranquility of the open plains."
    },
    {
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2074",
      title: "HORIZON",
      desc: "Where the desert sand meets the infinite sky."
    },
    {
      url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=2070",
      title: "ETERNITY",
      desc: "Architecture designed to withstand the test of time."
    }
  ];

  useGSAP(() => {
    // --- 2. INITIALIZE LENIS ---
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Synchronize Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis to GSAP Ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // --- YOUR ORIGINAL SECTION 1: CAPSULE MORPH ---
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".reveal-section",
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
      }
    });

    tl1.from(".capsule-text", { y: 30, opacity: 0, duration: 1 })
      .to(".bg-fill", { width: "100%", ease: "none", duration: 1 })
      .to(cardRef.current, { 
        width: "100vw", height: "100vh", borderRadius: "0px", 
        duration: 2, ease: "expo.inOut" 
      })
      .to(".inner-image", { opacity: 1, scale: 1, duration: 1.5 }, "<")
      .to(".bg-fill", { opacity: 0, duration: 1 }, "<")
      .to(".corner-ui", { opacity: 1, y: 0, stagger: 0.1, duration: 1 }, "-=1")
      .to(".capsule-text", { opacity: 0, duration: 0.5 }, "<");

    // --- YOUR ORIGINAL SECTION 2: EDITORIAL BLUR ---
    gsap.to(".blur-word", {
      filter: "blur(0px)",
      opacity: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".editorial-section",
        start: "top 70%",
        end: "top 10%",
        scrub: true
      }
    });

    // --- YOUR ORIGINAL SECTION 3: HEADING OVERLAP ---
    gsap.from(".section-3-heading", {
      y: -100,
      opacity: 0.5,
      scrollTrigger: {
        trigger: ".section-three",
        start: "top 90%",
        end: "top 50%",
        scrub: true,
      }
    });

    // --- YOUR ORIGINAL SECTION 4: HORIZONTAL TEXT + STACK ---
    const tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-four",
        start: "top top",
        end: "+=1200%", 
        pin: true,
        scrub: 1,
      }
    });

    tl4.to(".scrolling-text", { x: "-30%", ease: "none", duration: 3 })
      .to(".stack-img-1", {
        width: "100vw", height: "100vh", borderRadius: "0px",
        duration: 3, ease: "power2.inOut"
      }, "<")
      .from(".content-1", { opacity: 0, y: 20, duration: 1.5 });

    [2, 3, 4].forEach((num) => {
      tl4.to(`.stack-img-${num}`, { 
        y: "0%", 
        duration: 3, 
        ease: "power2.inOut" 
      })
      .from(`.content-${num}`, { 
        opacity: 0, 
        y: 30, 
        duration: 1.5 
      });
    });

    // 3. Cleanup Lenis on component unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };

  }, { scope: container });

  const mainText = "Welcome to a world of wild California desert where you will discover exquisite nature observing it from capsule houses, nested in one of the most breathtaking destinations on the United States.";
  const words = mainText.split(" ");
  const features = ["Sustainable", "Nature-care", "Smart", "Privacy", "Spacious", "Glassed-in"];

  return (
    <div ref={container} className="overflow-hidden" style={{ backgroundColor: "#000", position: "relative", color: "#fff" }}>
      
      {/* SECTION 1: CINEMATIC REVEAL */}
      <div className="reveal-section" style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div ref={cardRef} style={{ width: "300px", height: "80px", borderRadius: "40px", backgroundColor: "#1a1a1a", position: "relative", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 10 }}>
          <div className="bg-fill" style={{ position: "absolute", top: 0, left: 0, width: "0%", height: "100%", backgroundColor: "#ff0000", zIndex: 2 }} />
          <div className="inner-image" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b")', backgroundSize: "cover", backgroundPosition: "center", opacity: 0, scale: 1.2, zIndex: 1 }} />
          <span className="capsule-text" style={{ position: "relative", zIndex: 3, color: "white", fontWeight: "900", textTransform: "uppercase" }}>Discover</span>
          <div className="ui-overlay" style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0, zIndex: 4, pointerEvents: "none" }}>
            <div className="corner-ui" style={{ position: "absolute", top: "5%", left: "5%", opacity: 0 }}><span style={{ color: "white", fontSize: "0.8rem", fontWeight: "bold" }}>EXPLORE</span></div>
            <div className="corner-ui" style={{ position: "absolute", top: "5%", right: "5%", opacity: 0 }}><button style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)", border: "1px solid white", color: "white", padding: "10px 20px", borderRadius: "30px" }}>RESERVE →</button></div>
          </div>
        </div>
      </div>

      {/* SECTION 2: EDITORIAL REVEAL */}
      <div className="editorial-section" style={{ minHeight: "100vh", backgroundColor: "#fff", padding: "120px 8%", position: "relative", zIndex: 2 }}>
        <h1 style={{ fontSize: "2.8vw", color: "#111", textAlign: "center", lineHeight: "1.6", maxWidth: "1100px", margin: "0 auto" }}>
          {words.map((word, i) => (
            <span key={i} className="blur-word" style={{ display: "inline-block", marginRight: "10px", filter: "blur(12px)", opacity: 0.2 }}>{word}</span>
          ))}
        </h1>
        <div className="flex-col  md:flex-row " style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "80px" }}>
          <div className="mb-10 md:mb-0" style={{ display: "flex", gap: "30px", width: "55%" }}>
            <div style={{ width: "320px", height: "140px", borderRadius: "110px", overflow: "hidden" }}><img src="https://images.unsplash.com/photo-1544198365-f5d60b6d8190" alt="D1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <div style={{ width: "320px", height: "140px", borderRadius: "110px", overflow: "hidden", marginBottom: "-40px" }}><img src="https://images.unsplash.com/photo-1473580044384-7ba9967e16a0" alt="D2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
          </div>
          <div className="w-full md:w-[35%]" style={{  paddingBottom: "20px" }}>
            <p style={{ fontSize: "1.3rem", color: "#444", lineHeight: "1.7", fontStyle: "italic", fontFamily: "serif" }}>
              A place where you can be with yourself and your loved ones, a place where you can experience unforgettable desert things.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: FEATURES */}
      <div className="section-three " style={{ backgroundColor: "#fff", padding: "0 8% 120px", position: "relative", zIndex: 1 }}>
        <h2 className="section-3-heading" style={{ fontSize: "6vw", textTransform: "uppercase", fontWeight: "900", margin: "0", lineHeight: "0.9", paddingBottom: "60px", borderBottom: "1px solid #eee", color: "#000" }}>
          Choose the one <br /> you like best
        </h2>
        <div className="flex-col  md:flex-row" style={{ display: "flex", marginTop: "80px", justifyContent: "space-between" }}>
          <div className="mb-10 md:mb-0 w-full md:w-45%" ><p style={{ fontSize: "1.2rem", color: "#555", lineHeight: "1.6" }}>You can choose one of three premium capsule houses in our offer. Each of our capsules provides the highest quality.</p></div>
          <div style={{ width: "45%", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px 40px" }}>
            {features.map((item, index) => <div key={index} style={{ fontSize: "1rem", textTransform: "uppercase", fontWeight: "700", color: "#111", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>{item}</div>)}
          </div>
        </div>
      </div>

      {/* SECTION 4: THE DISCOVER SCROLL & STACK */}
      <div className="section-four" style={{ height: "100vh", width: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#000", overflow: "hidden" }}>
        
        <div className="scrolling-text" style={{ position: "absolute", whiteSpace: "nowrap", display: "flex", gap: "100px", fontSize: "15vw", fontWeight: "900", color: "rgba(255,255,255,0.05)", zIndex: 0, textTransform: "uppercase", top: "50%", transform: "translateY(-50%)" }}>
          <span>Discover</span><span>Discover</span><span>Discover</span>
        </div>

        {stackData.map((item, i) => (
          <div key={i} className={`stack-img-${i + 1}`} style={{ 
            position: "absolute", 
            top: i === 0 ? "50%" : 0, 
            left: i === 0 ? "50%" : 0, 
            width: i === 0 ? "600px" : "100vw", 
            height: i === 0 ? "350px" : "100vh", 
            zIndex: 10 + i, 
            transform: i === 0 ? "translate(-50%, -50%)" : "translateY(100%)", 
            overflow: "hidden",
            borderRadius: i === 0 ? "20px" : "0"
          }}>
            <img src={item.url} alt={`S${i+1}`} style={{width: "100%", height: "100%", objectFit: "cover"}} />
            
            <div className={`content-${i + 1}`} style={{
              position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
              display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
              background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.7) 100%)",
              textAlign: "center", padding: "0 10%"
            }}>
              <h2 style={{ fontSize: "9vw", fontWeight: "900", letterSpacing: "-3px", margin: 0, textTransform: "uppercase" }}>{item.title}</h2>
              <p style={{ fontSize: "1.3rem", maxWidth: "600px", marginTop: "20px", fontWeight: "300", letterSpacing: "1px", position: "absolute", bottom: "10%" }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <footer className="footer-section " style={{ minHeight: "100vh", backgroundColor: "#000", display: "flex", alignItems: "center", padding: "0 8%" }}>
        <div className="footer-content flex-col items-center md:items-start  md:flex-row" style={{ width: "100%", display: "flex", justifyContent: "space-between",  }}>
          <div style={{ width: "50%" }}>
            <h2 style={{ fontSize: "5vw", fontWeight: "900", lineHeight: "1", textTransform: "uppercase", marginBottom: "40px" }}>
              Ready for the <br /> <span style={{ color: "#ff0000" }}>extraordinary?</span>
            </h2>
            <button style={{ background: "#fff", color: "#000", border: "none", padding: "20px 50px", borderRadius: "50px", fontSize: "1.1rem", fontWeight: "700", cursor: "pointer", transition: "0.3s" }}>
              BOOK YOUR STAY
            </button>
          </div>

          <div className="mt-20 w-full md:w-[40%] md:mt-0" style={{  textAlign: "right" }}>
            <div style={{ width: "100%", height: "400px", borderRadius: "20px", overflow: "hidden", marginBottom: "30px" }}>
              <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Footer" />
            </div>
            <button 
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              style={{ background: "transparent", color: "#fff", border: "1px solid #333", padding: "10px 20px", borderRadius: "30px", marginTop: "30px", cursor: "pointer" }}>
              BACK TO TOP ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AnimatedSection;