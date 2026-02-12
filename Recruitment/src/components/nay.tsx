import { motion, useAnimation } from "framer-motion";
import sad from '../assets/sad.mp3'
export default function BrokenHeartButton() {
    const controls = useAnimation();

    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };


    const crack = async () => {
        const audio = new Audio(sad)
        audio.currentTime = 0;
        audio.play();

        // micro shake first
        await controls.start({
            x: [0, -2, 2, -2, 2, 0],
            transition: { duration: 0.15 }
        });

        // split
        controls.start("split");


        sendDiscordNotification();

        await sleep(2000)

        window.location.href = '/'
    };

    const halfStyle =
        "absolute inset-0 flex items-center justify-center bg-gray-500 text-white text-xl rounded-lg";

    async function sendDiscordNotification() {
        try {
            await fetch("/api/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message1: "<@665743051737792512> She said no 🥀",
                    message2: `Time: ${new Date().toLocaleString()}`
                })
            });
        } catch (err) {
            console.error("Failed to notify Discord", err);
        }
    }


    return (
        <div className="relative w-fit h-fit">
            {/* LEFT HALF */}
            <motion.div
                className={halfStyle}
                style={{
                    clipPath: "polygon(0 0, 52% 0, 48% 20%, 55% 35%, 45% 55%, 52% 75%, 48% 100%, 0 100%)"
                }}
                variants={{
                    initial: { x: 0, rotate: 0 },
                    split: {
                        x: -60,
                        rotate: -10,
                        transition: { duration: 0.3, ease: "easeOut" }
                    }
                }}
                initial="initial"
                animate={controls}
            >
                Nay 💔
            </motion.div>

            {/* RIGHT HALF */}
            <motion.div
                className={halfStyle}
                style={{
                    clipPath: "polygon(52% 0, 100% 0, 100% 100%, 48% 100%, 52% 75%, 45% 55%, 55% 35%, 48% 20%)"
                }}
                variants={{
                    initial: { x: 0, rotate: 0 },
                    split: {
                        x: 60,
                        rotate: 10,
                        transition: { duration: 0.3, ease: "easeOut" }
                    }
                }}
                initial="initial"
                animate={controls}
            >
                Nay 💔
            </motion.div>

            {/* CLICK LAYER */}
            <motion.button
                onClick={crack}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-6 py-3 opacity-0"
            >
                Nay 💔
            </motion.button>
        </div>
    );
}
