import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "./ui/button";

export default function HeroSection() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [setMouseX, setMouseY]);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 75 },
    visible: { opacity: 1, y: 0 },
  };

  const handleButtonClick = () => {
    navigate('/vpr');
  };

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center text-center px-6 py-32 min-h-screen overflow-hidden bg-gradient-to-b from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800"
    >
      <motion.div
        className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-blue-300 dark:bg-blue-700 opacity-50 blur-3xl"
        animate={{
          x: mouseX * 0.02,
          y: mouseY * 0.02,
        }}
        transition={{ type: "spring", stiffness: 75, damping: 15 }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-purple-300 dark:bg-purple-700 opacity-50 blur-3xl"
        animate={{
          x: mouseX * -0.02,
          y: mouseY * -0.02,
        }}
        transition={{ type: "spring", stiffness: 75, damping: 15 }}
      />

      <motion.h1
        className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white relative z-10"
        variants={fadeUpVariants}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        Visual Place Recognition
      </motion.h1>
      <motion.p
        className="text-lg max-w-2xl mb-8 text-gray-700 dark:text-gray-300 relative z-10"
        variants={fadeUpVariants}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Upload an image and let AI determine the location with high accuracy.
      </motion.p>
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.75 }}
      >
        <Button size="lg" onClick={handleButtonClick}>Try Demo</Button>
      </motion.div>
    </section>
  );
}