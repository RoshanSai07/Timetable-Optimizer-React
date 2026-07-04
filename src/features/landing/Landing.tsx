import Navbar from "@/shared/components/Navbar";
import HeroSection from "./components/HeroSection";
import Footer from "@/shared/components/Footer";
import SupportedPrograms from "./components/SupportedPrograms";
import FeaturesSection from "./components/FeaturesSection";

export function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar loggedIn={false} />
      <HeroSection />
      <SupportedPrograms />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
