import { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import ProgramsSection from "@/components/home/ProgramsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import GallerySection from "@/components/home/GallerySection";
import FaqSection from "@/components/home/FaqSection";
import ContactSection from "@/components/home/ContactSection";
import { getSiteSettings, getActivePrograms, getActiveTestimonials, getActiveFaqs, getActiveHeroSlides, getGalleryItems } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "NG.LEARN - Study Should Be Fun! 🎉",
  description: "Les privat terbaik untuk anak SD hingga SMA. Belajar jadi menyenangkan!",
};

export default async function HomePage() {
  const [settings, programs, testimonials, faqs, slides, gallery] = await Promise.all([
    getSiteSettings(),
    getActivePrograms(),
    getActiveTestimonials(),
    getActiveFaqs(),
    getActiveHeroSlides(),
    getGalleryItems(),
  ]);

  return (
    <>
      <HeroSection settings={settings} slides={slides} />
      <StatsSection />
      <ProgramsSection data={programs} />
      <TestimonialsSection data={testimonials} />
      <GallerySection data={gallery} />
      <FaqSection data={faqs} />
      <ContactSection settings={settings} />
    </>
  );
}
