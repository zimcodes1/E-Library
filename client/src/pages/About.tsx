import { useEffect } from "react";
import TopMenu from "../components/TopMenu";
import Footer from "../components/landing_page/Footer";
import AboutHero from "../components/about/AboutHero";
import Mission from "../components/about/Mission";
import Features from "../components/about/Features";
import Stats from "../components/about/Stats";
import Team from "../components/about/Team";
import Button from "../components/ui/Button";

function About() {
    useEffect(() => {
        document.title = 'Libronet | About Us'
    }, [])

    return (
        <div className="w-full h-fit max-sm:px-5 max-[900px]:px-10 px-20 bgImage pt-5 pb-10">
            <TopMenu />
            <AboutHero />
            <Mission />
            <Stats />
            <Features />
            <Team />
            <span className="flex mt-20 max-sm:mt-10">
                <Button text='Start Reading Today' styles="mx-auto mb-10" />
            </span>
            <Footer />
        </div>
    )
}

export default About
