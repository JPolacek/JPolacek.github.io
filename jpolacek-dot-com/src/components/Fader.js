import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import '../App.css'

const Fader = ({ text }) => {
    const [fadeProp, setFadeProp] = useState({
        fade: 'fade-in',
    });
	const [count, setCount] = useState(0);

    useEffect(() => {
        const timeout = setInterval(() => {
            if (fadeProp.fade === 'fade-in') {
                setFadeProp({
                    fade: 'fade-out'
                })
			} else {
				setFadeProp({
                    fade: 'fade-in'
                })
			}
        }, 2000);

        return () => clearInterval(timeout)
    }, [count]);

	if (count < 1) {
		setTimeout(() => {
			setCount(count + 1);
		}, 4001);
	}
    return (
        <p data-testid="fader" className={fadeProp.fade}>
            {count === 0 && text}
            {count === 1 && "Goodbye."}
		</p>
    )
}

export default Fader