import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

const HeroSection = () => {
    return (
        <section className="w-full min-h-[85vh] max-sm:min-h-fit flex flex-row max-[900px]:flex-col items-center justify-between gap-12 max-sm:gap-6 max-sm:mt-4 pb-10">
            <HeroLeft />
            <HeroRight />
        </section>
    )
}

export default HeroSection;