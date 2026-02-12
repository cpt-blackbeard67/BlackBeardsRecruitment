import { motion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInWhenVisibleProps = {
  children: ReactNode;
};

const FadeInWhenVisible = ({ children }: FadeInWhenVisibleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}

      transition={{ duration: 1,
        delay: 0.1
       }}
      className="relative z-1"
    >
      {children}
    </motion.div>
  );
};

export default FadeInWhenVisible;
