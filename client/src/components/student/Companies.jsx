import React from "react";
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";

const logos = [
  { src: assets.microsoft_logo, alt: "microsoft" },
  { src: assets.walmart_logo, alt: "walmart" },
  { src: assets.adobe_logo, alt: "adobe" },
  { src: assets.accenture_logo, alt: "accenture" },
  { src: assets.paypal_logo, alt: "paypal" },
];

const Companies = () => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center pt-20 overflow-hidden w-full">
      <p className="text-lg font-medium">Trusted by learners from</p>

      <div className="pt-10 relative w-full overflow-hidden">
        <motion.div
          className="flex flex-row gap-16 w-max"
          animate={{ x: ["0%", "-50%"] }} // move only half (because we duplicated)
          transition={{
            repeat: Infinity,
            duration: 20, // adjust speed
            ease: "linear",
          }}
        >
          {/* First copy of logos */}
          {logos.map((logo, i) => (
            <img
              key={i}
              className="w-32 md:w-40"
              src={logo.src}
              alt={logo.alt}
            />
          ))}

          {/* Second copy for seamless scroll */}
          {logos.map((logo, i) => (
            <img
              key={`dup-${i}`}
              className="w-32 md:w-40"
              src={logo.src}
              alt={logo.alt}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Companies;
