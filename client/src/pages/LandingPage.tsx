import HeroSection from "../components/HeroSection";
import AllInOne from "../components/AllInOne";
import Reviews from "../components/Reviews";

function LandingPage() {
    return (
    <div className="w-full h-fit px-20 bg-orange-50 pt-5 -z-10">
        {/* Hero Section */}
        <HeroSection></HeroSection>
        {/* All In One Section */}
        <AllInOne></AllInOne>
        {/* Reviews Section */}
        <Reviews></Reviews>
    </div>)
}

export default LandingPage;