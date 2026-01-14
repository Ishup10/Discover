import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AnimatedSection = () => {
const container = useRef();
  const cardRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".reveal-section",
        start: "top top", 
        end: "+=350%", // Increased for smoother transitions
        pin: true,
        scrub: 1,
      }
    });

    // 1. Text fades in
    tl.from(".capsule-text", { 
      opacity: 0, 
      letterSpacing: "10px", // Professional entrance
      duration: 1 
    })
    
    // 2. FILL FROM LEFT (X-AXIS)
    // We animate width from 0% to 100%
    .to(".bg-fill", { 
        width: "100%", 
        ease: "power2.inOut", 
        duration: 1.5 
    })

    // 3. SCALE UP TO FULL SCREEN
    .to(cardRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        duration: 2,
        ease: "expo.inOut"
    })

    // 4. SMOOTH IMAGE REVEAL
    // We use autoAlpha for a cleaner fade-in than just opacity
    .to(".inner-image", {
        autoAlpha: 1, // Fades opacity and handles visibility
        scale: 1,
        duration: 1.5,
        ease: "sine.inOut"
    }, "-=1"); // Starts during the final scale-up

  }, { scope: container });

  return (
  <div ref={container} style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <div style={{ height: "100vh" }} /> 

      <div className="reveal-section" style={{ 
        height: "100vh", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center" 
      }}>
        
        <div ref={cardRef} style={{
          width: "300px",
          height: "80px", 
          borderRadius: "40px",
          backgroundColor: "#1a1a1a",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid rgba(255,255,255,0.1)"
        }}>
          
          {/* THE FILL: Changed to left: 0 and width: 0 */}
          <div className="bg-fill" style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "0%",
            height: "100%",
            backgroundColor: "#ff4500", // Bright Orange
            zIndex: 1
          }} />

          {/* THE IMAGE: Starts hidden and slightly zoomed out */}
          <div className="inner-image" style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0,
            visibility: "hidden", // Handled by autoAlpha
            scale: 1.1, 
            zIndex: 2
          }} />

          {/* THE TEXT */}
          <span className="capsule-text" style={{
            position: "relative",
            zIndex: 3,
            color: "white",
            fontWeight: "900",
            fontSize: "1rem",
            textTransform: "uppercase"
          }}>
            Discover
          </span>
        </div>
      </div>

      <div style={{ height: "100vh" }} />
    </div>
  );
};
export default AnimatedSection;