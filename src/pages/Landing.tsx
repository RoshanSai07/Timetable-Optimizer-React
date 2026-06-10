import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

export function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar loggedIn={false} />
      <HeroSection />
      <Footer />
    </div>
  );
}
