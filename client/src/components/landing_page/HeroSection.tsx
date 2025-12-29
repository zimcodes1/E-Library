import TopMenu from "../TopMenu";
import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";
const HeroSection = () => {
    return (
        <div className="w-full h-130 max-sm:h-fit flex relative max-sm:flex-col">
            {/* Top Menu */}
            <TopMenu></TopMenu>
            {/* Hero Content */}
            <HeroLeft></HeroLeft>
            <HeroRight></HeroRight>
        </div>
    )
}

export default HeroSection;