import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NavigationContext } from '../context/NavigationContext';
import '../App.css';

const SplashScreen = ({ direction }) => {
  const navigate = useNavigate();
  const { setDirection } = useContext(NavigationContext);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleStart = () => {
    setDirection(1); // forward
    navigate('/home');
  };

  return (
    <motion.div
      className="splash-container"
      initial={{ x: direction > 0 ? 0 : '-100%' }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: direction > 0 ? '-100%' : '100%', opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="splash-content">
        <div className="splash-logo">🌴TripGood</div>
        <h1>Plan your<br />next<br />adventure!</h1>
        <button className="splash-button" onClick={handleStart}>
          Get started
        </button>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
