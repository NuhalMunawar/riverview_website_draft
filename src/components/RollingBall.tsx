import { motion, useScroll, useTransform } from 'motion/react';

export default function RollingBall() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '85vh']);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 1440]); // 4 full rotations

  return (
    <motion.div
      style={{ y, rotate }}
      className="fixed right-4 top-4 z-50 pointer-events-none drop-shadow-xl"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="48" height="48">
        <circle cx="256" cy="256" r="256" fill="#fff"/>
        <path d="M256 192l-59.3 43.1 22.6 70.9h73.4l22.6-70.9L256 192z" fill="#000"/>
        <path d="M103 241.5l41.5 110.6-67.6 49.1C44.3 361.3 21.6 310.7 21.6 256c0-21.8 3.5-42.8 10.1-62.5L103 241.5zM367.5 352.1l41.5-110.6 71.3-47.9c6.6 19.7 10.1 40.7 10.1 62.5 0 54.7-22.7 105.3-55.3 145.2l-67.6-49.2zM256 490.4c-53.7 0-103.2-18.1-142.8-48.5l67.6-49.1h150.4l67.6 49.1C359.2 472.3 309.7 490.4 256 490.4zM186.2 163l-83.2-78.5C142.6 44.9 196.8 21.6 256 21.6c59.2 0 113.4 23.3 153 62.9l-83.2 78.5H186.2z" fill="#000"/>
      </svg>
    </motion.div>
  );
}
