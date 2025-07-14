"use client";

import CampusAmbassadorSection from "@/components/campus-ambassador-section";
import BlogSection from "@/components/blog-section";

export default function ScrollOverlapSection() {
  return (
    <div className="relative">
      <div className="shadow-2xl">
        <CampusAmbassadorSection />
      </div>
      <div className="relative z-10 -mt-12">
        <BlogSection />
      </div>
    </div>
  );
}
