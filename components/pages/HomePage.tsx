import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { PopularProducts } from "@/components/home/PopularProducts";
import { InstallationPromo } from "@/components/home/InstallationPromo";
import { InteriorSolutions } from "@/components/home/InteriorSolutions";
import { About } from "@/components/home/About";
import { Delivery } from "@/components/home/Delivery";
import { Reviews } from "@/components/home/Reviews";
import { Contacts } from "@/components/home/Contacts";

export function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <PopularProducts />
      <InstallationPromo />
      <InteriorSolutions />
      <About />
      <Delivery />
      <Reviews />
      <Contacts />
    </>
  );
}
