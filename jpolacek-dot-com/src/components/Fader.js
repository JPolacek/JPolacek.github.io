import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import BlurText from "./BlurText/BlurText";
import "../pages/Home.css";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

const Fader = ({ text, children, duration = 2200 }) => {
  const [fadeProp, setFadeProp] = useState({
    fade: "fade-in",
  });
  const [count, setCount] = useState(0);

  const blurTextRef = useRef(null);
  const [animationDone, setAnimationDone] = useState(false);

  // Handler to set animation as done
  const handleFinalAnimationComplete = () => {
    console.log("FINAL ANIMATION COMPLETE");
    setAnimationDone(true);
  };

  useEffect(() => {
    if (count === 0) {
      // Start with fade-in
      setFadeProp({ fade: "fade-in" });

      // After fade-in duration, trigger fade-out
      const fadeOutTimeout = setTimeout(() => {
        setFadeProp({ fade: "fade-out" });

        // After fade-out duration, set count to 1
        const countTimeout = setTimeout(() => {
          setCount(1);
          setFadeProp({ fade: "fade-in" }); // Optional: reset to fade-in for next text
        }, duration); // duration for fade-out
        return () => clearTimeout(countTimeout);
      }, duration); // duration for fade-in

      return () => clearTimeout(fadeOutTimeout);
    }
  }, [count, duration]);

  // After animation, replace the "business" span with a link
  useEffect(() => {
    console.log("ANIMATION EFFECT");
    if (animationDone && blurTextRef.current) {
      console.log("ANIMATION EFFECT IF");
      // Find all spans inside the BlurText output
      const spans = blurTextRef.current.querySelectorAll("span");
      spans.forEach((span) => {
        if (span.textContent.trim() === "business") {
          // Create the <a> element
          const link = document.createElement("a");
          link.className = "App-link";
          link.href = "Jake_Polacek_Resume.pdf";
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          // Move the span inside the link
          link.appendChild(span.cloneNode(true));
          // Replace the span with the link
          span.replaceWith(link);
        }
      });
    }
  }, [animationDone]);

  return (
    <div data-testid="fader" className={fadeProp.fade}>
      {count === 0 && (
        <BlurText
          text={text}
          delay={100}
          animateBy="letters"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-2xl mb-8"
        />
      )}
      {count === 1 && (
        <div ref={blurTextRef}>
          <BlurText
            text={"Here for business or games?"}
            delay={440}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleFinalAnimationComplete}
            className="text-2xl mb-8"
          />
        </div>
      )}
    </div>
  );
};

Fader.propTypes = {
  text: PropTypes.string.isRequired,
  duration: PropTypes.number,
};

export default Fader;
