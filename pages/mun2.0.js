"use client";

import { motion } from "framer-motion";
import Footer from "../components/Footer";
import ConventusChatbot from "../components/ConventusChatBot";
import HeroSection from "../components/mun2herosection";
import Oheader from "../components/OHeader";
import LeadershipSection from "@/components/mun2.oleadershipsec";
import SessionAdjournedBanner from "../components/mun2.0SessionAdjournedBanner";
import SponsorsSection from "../components/mun2.0sponsors";
import LearnMoreSection from "@/components/mun2.0learnmore";
import Contact from "@/components/mun2.0contact";
import MUN2Newsletter from "@/components/mun2.0newsletter";
import MUN2Gallery from "@/components/mun2.0gallery";
import MUN2Winners from "@/components/mun2.0winners";
import MUN2Recap from "@/components/mun2.0recap";
import MUN2Team from "@/components/mun2.0team";

export default function MUN2Page() {
  return (
    <div className="min-h-screen flex flex-col bg-red-50">
      <div className="mb-6">
        <Oheader />
      </div>

      <div className="mt-20">
        <HeroSection />
      </div>

      <div className="mx-4 md:mx-8 lg:mx-16">
        <SessionAdjournedBanner />
      </div>

      <main className="flex-grow container mx-auto px-4 py-12">
        <MUN2Recap />
        <MUN2Newsletter />
        <MUN2Gallery />
        <MUN2Winners />
        <LeadershipSection />
        <MUN2Team />
        <LearnMoreSection />
        <SponsorsSection />
      </main>

      <Contact />
      <ConventusChatbot />
      <Footer />
    </div>
  );
}
