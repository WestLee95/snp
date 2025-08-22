import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "./App.css";
import birds from "./assets/birds.png";
import logo from "./assets/logo.png";
import attire from "./assets/attire.png";
import clock from "./assets/clock.png";
import nairobi from "./assets/nairobi.mp3";
import Menu from "./Menu";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroRef = useRef(null);
  const birdsRef = useRef(null);
  const h1Ref = useRef(null);
  const attireCardRef = useRef(null);
  const transportCardRef = useRef(null);
  const timeCardRef = useRef(null);
  const detailsRef = useRef(null);

  useEffect(() => {
    // Set initial states
    gsap.set(birdsRef.current, { y: -200, opacity: 0 });
    gsap.set([attireCardRef.current, timeCardRef.current], { opacity: 0, x: -100 });
    gsap.set(transportCardRef.current, { opacity: 0, scale: 0.5 });

    // Birds slide in from top after 2 seconds
    gsap.to(birdsRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
      delay: 2
    });

    // Hero parallax effect
    gsap.to(heroRef.current, {
      yPercent: 0,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // H1 color wave animation after 4 seconds
    const letters = h1Ref.current.querySelectorAll('.letter');
    
    // Create timeline for the color wave effect
    const colorTimeline = gsap.timeline({ delay: 4, repeat: -1, repeatDelay: 2 });
    
    letters.forEach((letter, index) => {
      colorTimeline.to(letter, {
        color: '#your-bg-div4-color', // Replace with your actual bg-div4 color
        duration: 0.3,
        ease: "sine.inOut"
      }, index * 0.1) // Stagger each letter by 0.1s
      .to(letter, {
        color: 'white',
        duration: 0.3,
        ease: "sine.inOut"
      }, index * 0.1 + 0.3); // Return to white after the color change
    });

    // Details section animations
    ScrollTrigger.create({
      trigger: detailsRef.current,
      start: "top 80%",
      onEnter: () => {
        // Attire card fade in from left
        gsap.to(attireCardRef.current, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out"
        });

        // Transport card scale in from middle
        gsap.to(transportCardRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          delay: 0.2
        });

        // Time card fade in from right
        gsap.set(timeCardRef.current, { x: 100 });
        gsap.to(timeCardRef.current, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          delay: 0.4
        });
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Split text into individual letters for animation
  const splitText = (text) => {
    return text.split('').map((char, index) => {
      if (char === ' ') return ' ';
      if (char === '\n') return <br key={index} />;
      
      const isHollow = (text === "SWEET N \nPILIPILI" && (char === 'T' || char === 'L'));
      
      return (
        <span 
          key={index} 
          className={`letter inline-block ${isHollow ? 'hollow-text' : ''}`}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <>
      <section className="hero" ref={heroRef}>
        <h1 ref={h1Ref}>
          {splitText("SWEET N \nPILIPILI")}
        </h1>
        <img
          ref={birdsRef}
          src={birds}
          alt=""
          className="absolute z-10 center right-[20%] w-1/2 h-1/2"
        />
        <audio controls className="rounded-full" src={nairobi}></audio>
      </section>

      {/* Details */}
      <section 
        ref={detailsRef}
        className="mx-auto flex flex-col items-center justify-center gap-[64px] w-full h-[630px] bg-div4 pt-[16px] pb-8"
      >
        <h2>DETAILS</h2>
        <div className="flex justify-center items-center gap-[32px] h-[400px]">
          {/* Attire Card */}
          <div 
            ref={attireCardRef}
            className="detail-card flex justify-center items-center py-2 px-4 h-full bg-div1 relative overflow-hidden group cursor-pointer"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)",
                duration: 0.3
              });
              gsap.to(e.currentTarget.querySelector('.hover-text'), {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                boxShadow: "none",
                duration: 0.3
              });
              gsap.to(e.currentTarget.querySelector('.hover-text'), {
                opacity: 0,
                y: 20,
                duration: 0.3
              });
            }}
          >
            <div className="flex flex-col gap-[50px] mt-10">
              <img className="scale-250 w-[300px]" src={attire} alt="" />
              <h4 className="underline">Attire</h4>
            </div>
            <div className="hover-text absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 transform translate-y-5">
              <p className="text-white text-center px-4">
                Smart casual dress code. <br />
                No flip-flops or shorts. <br />
                Dress to impress!
              </p>
            </div>
          </div>

          {/* Transport Card */}
          <div 
            ref={transportCardRef}
            className="detail-card w-[300px] flex justify-center items-start py-2 px-4 h-full bg-div2 relative overflow-hidden group cursor-pointer"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)",
                duration: 0.3
              });
              gsap.to(e.currentTarget.querySelector('.hover-text'), {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                boxShadow: "none",
                duration: 0.3
              });
              gsap.to(e.currentTarget.querySelector('.hover-text'), {
                opacity: 0,
                y: 20,
                duration: 0.3
              });
            }}
          >
            <div className="flex flex-col justify-center items-center gap-[50px] mt-10">
              <h4 className="text-white underline">Transport</h4>
              <p className="details text-center">Metro <br />200 <br /> <br />Odeon <br />100</p>
            </div>
            <div className="hover-text absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 transform translate-y-5">
              <p className="text-white text-center px-4">
                Matatu fares from <br />
                popular locations. <br />
                Plan your journey!
              </p>
            </div>
          </div>

          {/* Time Card */}
          <div 
            ref={timeCardRef}
            className="detail-card flex flex-col gap-[50px] justify-center items-end py-2 px-4 h-full bg-black relative overflow-hidden group cursor-pointer"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                boxShadow: "inset 0 0 20px rgba(255,255,255,0.3)",
                duration: 0.3
              });
              gsap.to(e.currentTarget.querySelector('.hover-text'), {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                boxShadow: "none",
                duration: 0.3
              });
              gsap.to(e.currentTarget.querySelector('.hover-text'), {
                opacity: 0,
                y: 20,
                duration: 0.3
              });
            }}
          >
            <div className="flex flex-col gap-[50px] mt-10">
              <img className="scale-250 w-[300px]" src={clock} alt="" />
              <h4 className="text-div3 underline">11:00am</h4>
            </div>
            <div className="hover-text absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 opacity-0 transform translate-y-5">
              <p className="text-black text-center px-4">
                Event starts promptly <br />
                at 11:00 AM. <br />
                Please arrive on time!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <Menu />

      {/* Footer */}
      <footer className="mx-auto footer pt-8 w-full h-[350px]">
        <div
          className="flex justify-center items-center gap-[64px] pr-[32px] w-full h-[300px]
           border-t-6 border-b-6 border-dotted border-yellow-500"
        >
          {/* MAP */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8368147260603!2d36.8105495742027!3d-1.270914598716993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17e2b8f79ff9%3A0xa10642ea17b62310!2sSweet%20N%20pillipilli!5e0!3m2!1sen!2ske!4v1755614528522!5m2!1sen!2ske"
            style={{ border: 0 }}
            width="250px"
            height="250px"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Logo */}
          <img className="scale-310 w-[200px]" src={logo} alt="" />
          {/* Date */}
          <h5 className="footer-date text-[50px] text-center text-yellow-500">
            23<span className="align-super text-sm">rd</span> <br />
            Aug/2025
          </h5>
        </div>
      </footer>
    </>
  );
}

export default App;