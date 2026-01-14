import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const boxData = [
  {
    id: 1,
    class: "box-left",
    title: "Hello",
    desc: "Learn GSAP",
    btn: "Read More",
    img: "https://picsum.photos/200/200?1",
    bg: "bg-white",
  },
  {
    id: 2,
    class: "box-center",
    title: "Animate",
    desc: "GSAP Power",
    btn: "Explore",
    img: "https://picsum.photos/200/200?2",
    bg: "bg-blue-300",
  },
  {
    id: 3,
    class: "box-right",
    title: "Create",
    desc: "Creative UI",
    btn: "Start",
    img: "https://picsum.photos/200/200?3",
    bg: "bg-green-300",
  },
];

const Test = () => {
  const containerref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Array of card classes
      const cards = [".box-left", ".box-center", ".box-right"];
     

      // Loop through each card to animate them sequentially
      cards.forEach((card) => {
        
        tl.from(card, {
          y: -300,
          opacity: 0,
         
          
          
          ease: "power3.out",
        })
          .from(`${card} h1`, { y: 30, opacity: 0, duration: 0.6 }, "-=0.4")
          .from(`${card} p`, { y: 30, opacity: 0, duration: 0.6 }, "-=0.4")
          .from(`${card} button`, { y: 30, opacity: 0, duration: 0.6 }, "-=0.4");
      });
    }, containerref);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full px-6 min-h-screen bg-black flex items-center justify-center">
      <div
        ref={containerref}
        className="w-full flex items-center justify-between gap-6"
      >
        {boxData.map((item) => (
          <div
            key={item.id}
            className={`${item.class} ${item.bg} w-48 h-60 rounded-lg shadow-lg flex flex-col items-center justify-center text-black gap-2 p-4`}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-14 h-14 object-cover rounded-full"
            />
            <h1 className="font-bold">{item.title}</h1>
            <p className="text-sm text-center">{item.desc}</p>
            <button className="bg-black text-white px-3 py-1 rounded text-xs">
              {item.btn}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;
