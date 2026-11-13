import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* Aparición suave al hacer scroll (solo opacity + transform, respeta "reducir movimiento") */
const Reveal = ({ children, className = '', delay = 0, y = 22 }) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
