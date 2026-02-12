import placeholder from '../assets/ew.png'
import rose from '../assets/rose.png'
import heart from '../assets/heart.svg'
import { motion } from "framer-motion";
import type { Variants } from 'framer-motion';
import  WaveBackground  from './WaveBG'

const roseVariants: Variants = {

    hidden: {
        scale: 0,
        opacity: 0,
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 12,
            mass: 0.5,
        },

    },

};



export default function Header() {
    return (
        <>
            
            <div className="relative w-full h-full">
                <WaveBackground />
                <div className="flex flex-col w-full h-full justify-center items-center pt-10">
                    <p className='text-4xl self-start pl-10 pb-10 text-black pirata-one-regular'> Ahoy Mads,</p>
                    <img className='w-[50vw] h-auto' src={placeholder} alt="" /> {/* CHANGE BEFORE SENDING */}
                </div>
                <div className=''>
                    <div className="">
                        <motion.img
                            src={rose}
                            className="absolute w-[15vw] bottom-10 right-[15%] -rotate-10"
                            alt="rose"
                            variants={roseVariants}
                            initial="hidden"
                            animate="visible"
                        />

                        <motion.img
                            src={rose}
                            className="scale-x-[-1] absolute w-[15vw] bottom-10 left-[15%] rotate-10"
                            alt="rose"
                            variants={roseVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 1.50 }} // slight stagger

                        />
                        <motion.img
                            className="absolute w-[15vw] bottom-[75%] right-[15%] rotate-40"
                            src={heart}
                            alt="heart"
                            animate={{
                                y: [0, -20, 0],
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </div>
                </div>

            </div>
        </>
    )
}