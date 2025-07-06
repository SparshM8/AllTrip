"use client";

import CampusAmbassadorSection from "@/components/campus-ambassador-section";
import BlogSection from "@/components/blog-section";

export default function ScrollOverlapSection() {
  return (
    <div className="relative">
      <div className="sticky top-0">
        <CampusAmbassadorSection />
      </div>
      <div className="relative z-10">
        <BlogSection />
      </div>
    </div>
  );
}
