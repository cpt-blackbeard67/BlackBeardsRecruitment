
// images
import flag from "../assets/pirate.svg"

export function Navbar () {
    return (
        <>
            <div className="z-10 fixed top-o w-full bg-[#80877b] h-20 black shadow-xl/15">
            <a href="/">
                <div className="flex">
                <img className="w-15 lg:w-20 py-3 ml-5 flex-none" src={flag} />
                <p className="text-black text-2xl flex-1 pirata-one-regular ml-2 py-5">Taco's Crew</p>
                </div>
                </a>
            </div>
        </>
    )
}