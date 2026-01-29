import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background noise-texture">
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default Index;
