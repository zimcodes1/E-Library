import { useEffect } from "react";
import HeroSection from "../components/landing_page/HeroSection";
import PoweredBy from "../components/landing_page/PoweredBy";
import Reviews from "../components/landing_page/Reviews";
import BooksBanner from "../components/landing_page/BooksBanner";
import Button from "../components/ui/Button";
import Footer from "../components/landing_page/Footer";
import Categories from "../components/landing_page/Categories";

function LandingPage() {
    useEffect(()=>{
        document.title = 'Libronet | Welcome Page'
    }, [])

    return (
        <>
            <div className="w-full h-fit max-sm:px-5 max-[900px]:px-10 px-20 bgImage pt-5 ">
                {/* Hero Section */}
                <HeroSection></HeroSection>
                {/* Powered-By Section */}
                <PoweredBy></PoweredBy>
                {/* Categories */}
                <Categories></Categories>
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