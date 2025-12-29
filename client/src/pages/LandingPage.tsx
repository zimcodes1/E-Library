import HeroSection from "../components/landing_page/HeroSection";
import AllInOne from "../components/landing_page/AllInOne";
import Reviews from "../components/landing_page/Reviews";
import BooksBanner from "../components/landing_page/BooksBanner";
import Button from "../components/ui/Button";
import Footer from "../components/landing_page/Footer";

function LandingPage() {
    return (
        <>
            <div className="w-full h-fit px-20 max-sm:px-5 max-[900px]:px-10  bg-orange-50 pt-5 ">
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
                    <Button text='30 days free trial' styles="mx-auto mb-10"></Button>
                </span>
            </div>
            {/* Footer Section */}
            <Footer></Footer>
        </>
    )
}

export default LandingPage;