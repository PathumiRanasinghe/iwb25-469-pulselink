import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Services from "../../components/Services";
import WhyRegistration from "../../components/WhyRegistration";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <WhyRegistration />
      <Footer />
    </div>
  );
}
