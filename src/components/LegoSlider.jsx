import { useState, useEffect } from "react";

const images = ["/bilbul1.png", "/bilbul2.png", "/bilbul3.png", "/bilbul4.png"];

export default function LegoSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % images.length),
      2500
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <img
      src={images[index]}
      alt="Lego"
      className="w-45 h-40 object-contain transition-all duration-700"
    />
  );
}
