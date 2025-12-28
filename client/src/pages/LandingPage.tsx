import HeroSection from "../components/HeroSection";
import AllInOne from "../components/AllInOne";
import Reviews from "../components/Reviews";
import BooksBanner from "../components/BooksBanner";
import Button from "../components/ui/Button";

function LandingPage() {
    return (
        <div className="w-full h-fit px-20 bg-orange-50 pt-5 -z-10">
            {/* Hero Section */}
            <HeroSection></HeroSection>
            {/* All In One Section */}
            <AllInOne></AllInOne>
            {/* Reviews Section */}
            <Reviews></Reviews>
            {/* Books Banner Section */}
            <BooksBanner></BooksBanner>
            {/* Call to Action Section */}
            <span className="flex">
                <Button text='30 days free trial' styles="mx-auto"></Button>
            </span>
        </div>)
}

export default LandingPage;