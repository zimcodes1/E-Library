import Button from "../ui/Button";
function HeroLeft() {
    return (
        <div className="w-1/2 max-sm:w-full h-full max-sm:h-fit max-sm:pt-15 flex flex-col justify-center items-start">
            <h1 className="yusei-magic-regular text-6xl max-[900px]:text-4xl text-purple-950 font-semibold leading-snug">Experience the Freedom of a Boundless Library</h1>
            <p className="text-gray-800 text-md">Access Thousands of Books and Resources From the Comfort of Your Device.</p>
            <Button text="Get Started" styles="mt-4"></Button>
        </div>
    )
}

export default HeroLeft;