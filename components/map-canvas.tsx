"use client";

import React from "react";

const MapCanvas = () => {
  return (
    <div className="absolute inset-0 w-full h-full opacity-10 overflow-hidden">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Map Background */}
        <defs>
          <pattern
            id="mapGrid"
            patternUnits="userSpaceOnUse"
            width="40"
            height="40"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        
        {/* Grid Background */}
        <rect width="100%" height="100%" fill="url(#mapGrid)" />
        
        {/* India Outline (Simplified) */}
        <path
          d="M200 150 L300 140 L380 160 L420 180 L450 220 L480 280 L470 350 L440 420 L400 460 L350 480 L300 470 L250 450 L220 420 L200 380 L180 340 L160 280 L170 220 Z"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        
        {/* Major Cities/Routes */}
        <g stroke="#10b981" strokeWidth="1.5" fill="none">
          {/* Northern Route */}
          <path d="M220 180 Q280 170 350 190" strokeDasharray="3,3" />
          <path d="M350 190 Q390 200 420 230" strokeDasharray="3,3" />
          
          {/* Central Route */}
          <path d="M280 250 Q350 240 400 260" strokeDasharray="3,3" />
          
          {/* Southern Route */}
          <path d="M250 350 Q320 340 380 360" strokeDasharray="3,3" />
          
          {/* Coastal Route */}
          <path d="M180 280 Q190 320 220 380 Q250 420 300 450" strokeDasharray="3,3" />
        </g>
        
        {/* City Markers */}
        <g>
          {/* Kashmir */}
          <circle cx="280" cy="160" r="4" fill="#ef4444" />
          <text x="285" y="155" fontSize="10" fill="#374151" fontWeight="500">Kashmir</text>
          
          {/* Himachal */}
          <circle cx="250" cy="180" r="3" fill="#f59e0b" />
          <text x="255" y="175" fontSize="9" fill="#374151">Himachal</text>
          
          {/* Rajasthan */}
          <circle cx="200" cy="250" r="3" fill="#f59e0b" />
          <text x="205" y="245" fontSize="9" fill="#374151">Rajasthan</text>
          
          {/* Goa */}
          <circle cx="180" cy="350" r="3" fill="#f59e0b" />
          <text x="185" y="345" fontSize="9" fill="#374151">Goa</text>
          
          {/* Kerala */}
          <circle cx="220" cy="420" r="3" fill="#f59e0b" />
          <text x="225" y="415" fontSize="9" fill="#374151">Kerala</text>
          
          {/* Ladakh */}
          <circle cx="320" cy="150" r="3" fill="#f59e0b" />
          <text x="325" y="145" fontSize="9" fill="#374151">Ladakh</text>
        </g>
        
        {/* Decorative Elements */}
        <g opacity="0.6">
          {/* Mountains */}
          <path d="M180 140 L200 120 L220 140 Z" fill="#6b7280" />
          <path d="M240 130 L260 110 L280 130 Z" fill="#6b7280" />
          <path d="M300 125 L320 105 L340 125 Z" fill="#6b7280" />
          
          {/* Rivers */}
          <path
            d="M280 160 Q300 180 320 200 Q340 220 360 240"
            stroke="#3b82f6"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          />
        </g>
        
        {/* Animated Route Lines */}
        <g>
          <path
            d="M220 180 Q350 170 420 230"
            stroke="#10b981"
            strokeWidth="2"
            fill="none"
            strokeDasharray="10,5"
            opacity="0.7"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;-15"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>
          
          <path
            d="M200 250 Q300 240 400 260"
            stroke="#f59e0b"
            strokeWidth="2"
            fill="none"
            strokeDasharray="8,4"
            opacity="0.7"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;-12"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </svg>
    </div>
  );
};

export default MapCanvas;
