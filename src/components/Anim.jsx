import { useState, useEffect } from "react";
import "../components/Anim.css";

const anims = [
  "Quality clothes for little adventures, only at Sky Kiddies Wears",
  "Sky Kiddies Wears brings your little ones the best in quality and style.",
  "Where every outfit is made for happy, playful kids.",
  "Sky Kiddies Wears — bringing smiles, one outfit at a time.",
  "Stylish, comfy, and fun clothes for your little stars."
];

const Anim = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // duration should match the CSS animation duration
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % anims.length);
    }, 15000); 
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="scroll-container">
      <p key={currentIndex} className="scroll-text">
        {anims[currentIndex]}
      </p>
    </div>
  );
};

export default Anim;