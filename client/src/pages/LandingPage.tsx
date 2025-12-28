import HeroSection from "../components/HeroSection";
import AllInOne from "../components/AllInOne";

function LandingPage() {
    return (
    <div className="w-full h-fit px-20 bg-orange-50 pt-5 -z-10">
        {/* Hero Section */}
        <HeroSection></HeroSection>
        {/* All In One Section */}
        <AllInOne></AllInOne>
    </div>)
}

export default LandingPage;