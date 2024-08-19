import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './ChooChoo.css';

const ChooChoo = ({
  src,
  children,
  alt = 'Sliding Image',
}) => {
  const imageRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState('left');
  const [speed, setSpeed] = useState(30);
  const [countdown, setCountdown] = useState(8000);

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

    setPosition(startPosition);
  }, [direction]);

  useEffect(() => {
    // Start animation after 5 second delay
    const timerId = setTimeout(() => {
      setIsAnimating(true);
    }, 8000);

    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
	  setIsAnimating(true);
	}, countdown);

	return () => clearTimeout(timerId);
  }, [countdown]);

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
			setIsAnimating(false);
			setDirection(Math.floor(Math.random() * 2) >= 1 ? 'left' : 'right');
			setSpeed(Math.round(Math.random() * 100) + 50);
			setCountdown(Math.floor(Math.random() * 5000));

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
      <Link to="/TubeGame">
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className={`sliding-image ${isAnimating ? 'animate' : 'hidden'}`}
          style={{
            transform: `translateX(${position}px)`,
            width: `2300px`,
            height: 'auto',
          }}
        />
      </Link>
    </div>
  );
};

ChooChoo.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
}

export default ChooChoo;
