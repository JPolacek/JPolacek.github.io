import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import BlurText from "./BlurText/BlurText";
import GradientText from "./GradientText/GradientText";
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
    setTimeout(() => setAnimationDone(true), 2000);
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
      {count === 1 && !animationDone && (
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
      {count === 1 && animationDone && (
        <Splitter>Here for business or games?</Splitter>
      )}
    </div>
  );
};

// Splitter component: splits children string into words and renders each in a styled <span>
const Splitter = ({ children }) => {
  // Convert children to string (in case it's not)
  const text = typeof children === "string" ? children : String(children);
  // Split into words, keeping punctuation (like '?') attached to the last word
  const words = text.match(/\S+\s*/g) || [];

  return (
    <p className="text-2xl mb-8" style={{ display: "flex", flexWrap: "wrap" }}>
      {words.map((word, idx) => {
        // Remove trailing whitespace for matching
        const trimmed = word.trim();
        if (trimmed === "business") {
          return (
            <span
              key={idx}
              className="inline-block will-change-[transform,filter,opacity]"
              style={{ opacity: 1, transform: "none" }}
            >
              <GradientText
                colors={[
                  "#FFFFFF",
                  "#FFFFFF",
                  "#FFFFFF",
                  "#FFFFFF",
                  "#FFFFFF",
                  "#FFFFFF",
                  "#E83323",
                  "#E83323",
                  "#01007C",
                  "#E83323",
                  "#E83323",
                  "#FFFFFF",
                  "#FFFFFF",
                  "#FFFFFF",
                  "#FFFFFF",
                  "#FFFFFF",
                  "#FFFFFF",
                ]} //, "#01007C", "#E83323"]}
                animationSpeed={10}
              >
                <a className="App-link" href="Jake_Polacek_Resume.pdf">
                  {trimmed}&nbsp;
                </a>
              </GradientText>
            </span>
          );
        }
        return (
          <span
            key={idx}
            className="inline-block will-change-[transform,filter,opacity]"
            style={{ opacity: 1, transform: "none" }}
          >
            {trimmed}&nbsp;
          </span>
        );
      })}
    </p>
  );
};

Fader.propTypes = {
  text: PropTypes.string.isRequired,
  duration: PropTypes.number,
};

export default Fader;
