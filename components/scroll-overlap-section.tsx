"use client";

import CampusAmbassadorSection from "@/components/campus-ambassador-section";
import BlogSection from "@/components/blog-section";

export default function ScrollOverlapSection() {
  return (
    <div className="relative">
      <div>
        <CampusAmbassadorSection />
      </div>
      <div className="relative z-10 -mt-12">
        <BlogSection />
      </div>
    </div>
  );
}
