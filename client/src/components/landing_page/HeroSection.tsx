import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";
const HeroSection = () => {
    return (
        <div className="w-full max-sm:pt-20 h-fit max-sm:h-fit flex max-[900px]:flex-col items-center justify-between gap-10 mt-20 max-sm:mt-10">
            <HeroLeft />
            <HeroRight />
        </div>
    )
}

export default HeroSection; 