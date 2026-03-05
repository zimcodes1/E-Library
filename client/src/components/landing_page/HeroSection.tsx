import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";
const HeroSection = () => {
    return (
        <div className="w-full max-sm:pt-10 h-fit max-sm:h-fit flex max-[900px]:flex-col items-center justify-between gap-10 max-sm:gap-0 mt-20 max-sm:mt-10 max-sm:relative">
            <HeroLeft />
            <HeroRight />
        </div>
    )
}

export default HeroSection; 