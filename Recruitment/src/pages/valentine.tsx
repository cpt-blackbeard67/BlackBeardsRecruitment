import '../App.css'
import "../styling/valentine.css"
import Header from '../components/pic'
import confetti from 'canvas-confetti';
import TypewriterComponent from 'typewriter-effect';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BrokenHeartButton from '../components/nay';
import yippeeAudio from '../assets/yippee-tbh.mp3'
import { useEffect } from 'react';

function Valentine() {
    document.title = "Valentine?";

    useEffect(() => {
        document.body.className = "valentine";
    }, []);

    async function sendDiscordNotification() {
        try {
            await fetch("/api/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message1: "<@665743051737792512> SHE SAID YES!!!",
                    message2: `Time: ${new Date().toLocaleString()}`
                })
            });
        } catch (err) {
            console.error("Failed to notify Discord", err);
        }
    }


    const [showButtons, setShowButtons] = useState(false);

    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    const yippee = async () => {
        sendDiscordNotification()
        const audio = new Audio(yippeeAudio)
        audio.currentTime = 0;
        audio.play();

        confetti({
        particleCount: 220,
        spread: 120,          // wider fan
        startVelocity: 120,   // shoots upward
        gravity: 0.9,        // natural fall
        ticks: 200,          // how long particles stay
        origin: { x: 0.5, y: 1 }, // bottom center
        scalar: 1.5
        });

        await sleep(2000)
        window.location.href = '/'
    };


    return (
        <>
            <Header></Header>
            <div className="relative items-center w-full justify-center text-4xl text-black text-center mt-10 pirata-one-regular">
                <TypewriterComponent
                    onInit={(typewriter) => {
                        typewriter
                            .typeString("Yer as sweet as songs from sirens,<br/>")
                            .pauseFor(500)
                            .typeString("and take me breath aw’y fast’r than thy sun sett’n on ey vast oc’n.<br/>")
                            .pauseFor(700)
                            .typeString("Will ye be me Valentine?")
                            .callFunction(() => {
                                setShowButtons(true);
                            })
                            .start();
                    }}
                    options={{
                        delay: 45,
                        cursor: "",
                    }}
                />
            </div>

            <AnimatePresence>
                {showButtons && (
                    <motion.div
                        className="flex gap-6 justify-center mt-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <motion.button
                            onClick={yippee}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-[#FF6F77] text-white rounded-lg text-xl"
                        >
                            Aye ❤️
                        </motion.button>
                        <BrokenHeartButton />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Valentine
