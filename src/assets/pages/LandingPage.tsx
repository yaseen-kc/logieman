import BentoGrids from "../components/bentogrids";
import HeroSection from "../components/heroSection";
import PostLoad from "../components/postLoad";
import OurService from "../components/ourService";
import TruckList from "../components/truckList";
import Testimonials from "../components/testimonials";
import CTA from "../components/cta";
import StatGrid from "../components/statGrid";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <PostLoad />
      <StatGrid />
      <BentoGrids />
      <OurService />
      <TruckList />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
