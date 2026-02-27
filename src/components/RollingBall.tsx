import { motion, useScroll, useTransform } from 'motion/react';
import footballIcon from '../assets/football_icon.jpg';

export default function RollingBall() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '85vh']);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 1440]); // 4 full rotations

  return (
    <motion.div
      style={{ y, rotate }}
      className="fixed right-4 top-4 z-50 pointer-events-none drop-shadow-xl"
    >
      <img src={footballIcon} alt="Football" className="h-12 w-12 rounded-full object-cover" />
    </motion.div>
  );
}
