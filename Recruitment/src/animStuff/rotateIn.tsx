import { motion } from "framer-motion";
import bart from "../assets/cptJoeBart.webp";

export function Bartin() {
    return (
        <motion.img
            src={bart}
            alt="Drunk Cpt bart"
            className="absolute -right-[30%] xl:-right-[5%] lg:-right-[10%] sm:-right-[19%] top-40 shadow-md max-h-120 max-w-150"

            initial={{
                x: 200,
                rotate: 10,
                scale: 0.8,
                opacity: 0
            }}

            whileInView={{
                x: 0,
                rotate: -45,
                scale: 1,
                opacity: 1
            }}

            transition={{
                type: "spring",
                stiffness: 120,
                damping: 12,
                delay: 0.02
            }}

            viewport={{ once: true }}

        />

    );
}
