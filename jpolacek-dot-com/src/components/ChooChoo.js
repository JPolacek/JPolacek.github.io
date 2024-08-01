import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './ChooChoo.css';

const ChooChoo = ({
  src,
  alt = 'Sliding Image',
  speed = 5,
  direction = 'left',
  width = 300,
}) => {
  const imageRef = useRef(null);
  const [position, setPosition] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useLayoutEffect(() => {
    // Calculate start and end positions immediately on component mount
    const imageWidth = imageRef.current.offsetWidth;
    const containerWidth = window.innerWidth;

    let startPosition;

    if (direction === 'left') {
      startPosition = containerWidth; // Start from the right
    } else {
      startPosition = -imageWidth;    // Start from the left
    }

    setPosition(startPosition); // Set initial position
  }, [direction]);

  useEffect(() => {
    // Start animation after 5 second delay
    const timerId = setTimeout(() => {
      setIsAnimating(true);
    }, 5000);

    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    if (!isAnimating) return; // Exit if not animating

    const imageWidth = imageRef.current.offsetWidth;
    const containerWidth = window.innerWidth;

    let startPosition;
    let endPosition;

    if (direction === 'left') {
      startPosition = containerWidth;
      endPosition = -imageWidth;
    } else {
      startPosition = -imageWidth;
      endPosition = containerWidth;
    }

    setPosition(startPosition);

    const updatePosition = () => {
      setPosition((prev) => {
        const newPosition = prev + (direction === 'left' ? -speed : speed);
        if (
			(direction === 'left' && newPosition < endPosition) ||
			(direction === 'right' && newPosition > endPosition)
		) {
			// This will prevent the train from moving across the screen more than once.
			// TODO: I'll need to set a time in order to make sure that the train is restarted
			setIsAnimating(false);
			return startPosition;
        }
        return newPosition;
      });
    };

    let animationFrameId;
    const animate = () => {
      updatePosition();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction, speed, isAnimating]);

  return (
    <div className="sliding-image-container">
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`sliding-image ${isAnimating ? 'animate' : 'hidden'}`}
        style={{
          transform: `translateX(${position}px)`,
          width: `${width}px`,
          height: 'auto',
        }}
      />
    </div>
  );
};

ChooChoo.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
	speed: PropTypes.number,
	direction: PropTypes.string,
	width: PropTypes.number,
}

export default ChooChoo;
