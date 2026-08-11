import HomePageCarousel from "../components/HomePageCarousel";
import Anim from "../components/Anim";
import Hero from "../components/Hero";

export default function HomePage() {
  return (
    <div style={{overflowY: "scroll", height: "80vh"}}>
      <Anim/>
      <Hero/>
      <HomePageCarousel/>
    </div>
  )
}