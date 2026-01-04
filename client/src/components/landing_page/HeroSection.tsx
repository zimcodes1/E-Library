import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";
const HeroSection = () => {
    return (
        <div className="w-full h-fit max-sm:h-fit flex flex-col">
            {/* Hero Content */}
            <HeroLeft></HeroLeft>
            <HeroRight></HeroRight>
        </div>
    )
}

export default HeroSection; 