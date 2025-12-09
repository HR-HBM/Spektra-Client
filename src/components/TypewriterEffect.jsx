import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const sentenceSequence = [
  'Quick search tool for car enthusiasts.',
  1500, // Wait
  '',   // Delete
  'Real-time access to specs for a wide range of cars.',
  1500, 
  '', 
  'Helpful insights and quick navigation.',
  1500,
  '',  
  'Trusted third-party automotive data integration.',
  1500,
  '',   
  'A personalized dashboard that remembers what you searched.',
  1500, 
  '',   
];

const TypewriterEffect = () => {
  return (
    <TypeAnimation
      sequence={sentenceSequence}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: '1em', display: 'inline-block', minHeight: '1.2em' }} // Added minHeight to prevent layout shift
    />
  );
};

export default TypewriterEffect;
