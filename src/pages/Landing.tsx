import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import SupportedPrograms from "../components/SupportedPrograms";

export function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar loggedIn={false} />
      <HeroSection />
      <SupportedPrograms />
      <Footer />
    </div>
  );
}
