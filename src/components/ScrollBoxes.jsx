// App.jsx
import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollBoxes = () => {
  const demoRef = useRef(null);

 useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      },
    });

    tl.from(demoRef.current, {})
      .from("h1", { x: 80 })
      .from("h2", { x: -80 })
      .from("p", { y: 30 })
      .from("button", { y: 50 })
      .from("#items > g", {
        scale: 0,
        transformOrigin: "50% 50%",
        stagger: 0.1,
      });
  }, demoRef);

  return () => ctx.revert();
}, []);



  return (
     <div className="flex items-center justify-center min-h-screen bg-[#252525] font-['Kanit']">
      <div
        
        ref={demoRef}
        className="relative w-[621px] h-[385px] border border-[#333]"
        style={{
          backgroundImage:
            "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/32887/creative-process-bg.png)",
        }}
      >
        {/* CONTENT */}
        <div className="absolute w-[250px] top-[130px] left-[20px] text-black">
          <h1 className="text-[50px] font-medium">Creative</h1>
          <h2 className="text-[40px] font-extralight -mt-[10px]">
            Process
          </h2>
          <p className="font-extralight mt-[14px] text-[16px] leading-[20px]">
            Learn how to find inspiration in the things you love.
          </p>

          <button className="mt-5 rounded-[17px] px-6 py-[6px] bg-gradient-to-b from-[#ff905c] to-[#ef027d] text-white font-bold">
            READ MORE
          </button>
        </div>

        {/* SVG */}
        <div className="absolute left-[375px] top-[80px]">
          <svg
            width="238.54"
            height="222.9"
            viewBox="0 0 238.54 222.9"
          >
            <g id="items">
              <g>
                <circle cx="40" cy="120" r="22" fill="#1FDDFF" />
              </g>
              <g>
                <circle cx="182" cy="133" r="15" fill="#E61E64" />
              </g>
              <g>
                <circle cx="100" cy="185" r="34" fill="#FF2E2E" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ScrollBoxes;
