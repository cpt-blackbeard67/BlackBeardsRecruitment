// images
import FadeInWhenVisible from '../animStuff/fadeIn'
import yarg from '../assets/yarg.jpg'

export function Head() {
    return (
        <>
            <div className='pt-10'>
                <img className=' w-full shadow-md max-h-150' src={yarg} alt="" />
                <FadeInWhenVisible>
                    <p className='text-8xl stroke-black text-white pirata-one-regular text-center pt-10'>Join me crew!</p>
                    <div className='flex pt-25'>
                        <p className='flex-2 text-4xl stroke-black text-white pirata-one-regular text-center'>I need me a legendary crew for these seas, and ye be the matey for the job!</p>
                    </div>
                </FadeInWhenVisible>
            </div>
        </>
    )
}