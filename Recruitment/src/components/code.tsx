import FadeInWhenVisible from '../animStuff/fadeIn'
// import rule1 from '../assets/code.jpg'
import Form from './form'
import TypewriterComponent from 'typewriter-effect';

export function Code() {
    const quotes = [
        "\"Mush hahahaha\" -Unknown lass",
        "\"we all mateys in th' tavern\" -Unknown Scallywag",
        "\"I blunddd???\" -Unknown sailor",
        "\"Me pleasure, lass.\" -Unknown landlubber",
    ];
    const shuffleArray = (arr: any) => {
        return [...arr].sort(() => Math.random() - 0.5);
    };

    return (
        <>
            <div className='py-30'>
                <div className=''>
                    <FadeInWhenVisible>
                        <p className='text-4xl stroke-black text-white pirata-one-regular text-center'>Me crew is a crew of discipline and hard work. Are ye willin' to join me battle?</p>
                        <div className='mt-10'>
                            <Form />
                        </div>
                    </FadeInWhenVisible>
                </div>
                <FadeInWhenVisible>
                    <div className='text-3xl stroke-black text-white pirata-one-regular text-center'>
                    <TypewriterComponent
                        options={{
                            strings: shuffleArray(quotes),
                            autoStart: true,
                            loop: true,
                            delay: 45,
                            deleteSpeed: 30,
                            // @ts-expect-error
                            pauseFor: 6000,
                            cursor: "",
                        }}
                    />
                    </div>
                </FadeInWhenVisible>
            </div>
        </>
    )
}