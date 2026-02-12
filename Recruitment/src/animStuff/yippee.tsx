import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Yippee from "../assets/yippee-tbh.mp3"; 
import corndogs from '../assets/corndog.jpg'
import yatta from "../assets/yatta.mp3"
const yippeeAudio = new Audio(Yippee);
const yattaAudio = new Audio(yatta);

export default function BouncyCorndog() {
    const handleClick = () => {
        // 10% chance
        const playYatta = Math.random() < 0.25;

        const audio = playYatta ? yattaAudio : yippeeAudio;
        audio.currentTime = 0;
        audio.play();

        // Confetti
        confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 }
        });
    };


    return (
        <motion.img
            draggable={false}
            src={corndogs}
            alt="CORNDOOOOGSS"
            className="select-none justify-center shadow-md max-h-120 max-w-150 pt-10 cursor-pointer"

            whileTap={{ y: -40, rotate: 10 }}
            animate={{ y: [0, -30, 0] }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 10
            }}

            onClick={handleClick}
        />
    );
}
