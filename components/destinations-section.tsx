"use client";

import React from "react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";

const destinations = [
	{
		name: "Goa",
		shortDescription: "Goa is a mesmerizing city that boasts stunning beaches, magnificent churches, and impressive forts. It's a perfect romantic getaway for beach lovers.",
		detailedDescription: "Experience the perfect blend of Portuguese heritage and tropical paradise. From pristine beaches to vibrant nightlife, Goa offers an unforgettable coastal experience with water sports, beach shacks, and sunset views.",
		image: "/destinations/goa.jpg",
		badge: "POPULAR"
	},
	{
		name: "Rishikesh",
		shortDescription: "Rishikesh is a city in India renowned for its temples, ashrams, yoga centers, and natural beauty including waterfalls and greenery. It's also a hub for adventure activities.",
		detailedDescription: "Known as the 'Yoga Capital of the World', Rishikesh offers spiritual awakening alongside thrilling adventures like river rafting, bungee jumping, and trekking in the foothills of the Himalayas.",
		image: "/destinations/kashmir.jpg",
		badge: "POPULAR"
	},
	{
		name: "Jim Corbett",
		shortDescription: "Jim Corbett National Park is a wildlife sanctuary located in Uttarakhand, India. It offers a perfect weekend getaway with adventure activities, wildlife sightings, and mysterious stories.",
		detailedDescription: "India's oldest national park, home to the majestic Bengal tiger. Experience thrilling jungle safaris, bird watching, and stay in luxury resorts while exploring the rich biodiversity of the Terai region.",
		image: "/destinations/Uttarakhand.jpg",
		badge: "POPULAR"
	},
	{
		name: "Amritsar",
		shortDescription: "Amritsar, the heart of Punjab, is a revered site for Sikhs and a pilgrimage destination for many due to the presence of the Golden Temple.",
		detailedDescription: "Explore historical landmarks such as Jallianwala Bagh and Wagah Border, as well as the Harke Bird Sanctuary. Experience the spiritual ambiance of the Golden Temple and taste authentic Punjabi cuisine.",
		image: "/destinations/himachal-pradesh.jpg",
		badge: "POPULAR"
	},
	{
		name: "Kerala",
		shortDescription: "Kerala, known as 'God's Own Country', offers backwaters, hill stations, and pristine beaches with unique cultural experiences.",
		detailedDescription: "Cruise through serene backwaters in traditional houseboats, explore spice plantations in Munnar, and experience Ayurvedic treatments in this tropical paradise.",
		image: "/destinations/kerala.jpg",
		badge: "POPULAR"
	},
	{
		name: "Rajasthan",
		shortDescription: "The land of kings, featuring magnificent palaces, desert landscapes, and rich cultural heritage.",
		detailedDescription: "Explore majestic forts and palaces, experience camel safaris in the Thar Desert, and immerse yourself in the vibrant culture of royal Rajasthan.",
		image: "/destinations/rajasthan.jpg",
		badge: "POPULAR"
	},
	{
		name: "Ladakh",
		shortDescription: "A high-altitude desert offering breathtaking landscapes, monasteries, and adventure activities.",
		detailedDescription: "Discover the moonlike landscapes of Ladakh, visit ancient Buddhist monasteries, and experience thrilling mountain adventures in the Himalayas.",
		image: "/destinations/Ladakh.jpg",
		badge: "POPULAR"
	},
	{
		name: "Himachal Pradesh",
		shortDescription: "Hill stations with snow-capped mountains, apple orchards, and pleasant weather year-round.",
		detailedDescription: "Enjoy the cool mountain air of Shimla and Manali, experience adventure sports, and witness stunning Himalayan landscapes.",
		image: "/destinations/himachal.jpg",
		badge: "POPULAR"
	}
];

export default function DestinationsSection() {
	const ref = useRef<HTMLElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.1 });
	
	// State for cycling through destinations
	const [currentStartIndex, setCurrentStartIndex] = useState(0);
	const destinationsPerPage = 4;
	const [fade, setFade] = useState(false);

	// Auto-rotate destinations every 7 seconds (less frequent)
	useEffect(() => {
		if (!isInView) return;

		const interval = setInterval(() => {
			setFade(true);
			setTimeout(() => {
				setCurrentStartIndex((prevIndex) => {
					const nextIndex = prevIndex + destinationsPerPage;
					return nextIndex >= destinations.length ? 0 : nextIndex;
				});
				setFade(false);
			}, 350); // fade duration
		}, 7000);

		return () => clearInterval(interval);
	}, [isInView]);

	// Get current destinations to display
	const getCurrentDestinations = () => {
		const current = [];
		for (let i = 0; i < destinationsPerPage; i++) {
			const index = (currentStartIndex + i) % destinations.length;
			current.push(destinations[index]);
		}
		return current;
	};

	const currentDestinations = getCurrentDestinations();

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: "easeOut",
			},
		},
	};

	// Memoized card to prevent unnecessary re-renders
	const DestinationCard = React.memo(function DestinationCard({ destination, index, currentStartIndex }: { destination: any, index: number, currentStartIndex: number }) {
		return (
			<div
				key={`${destination.name}-${currentStartIndex}-${index}`}
				className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
			>
				<div className="absolute inset-0">
					<Image
						src={destination.image}
						alt={destination.name}
						fill
						priority={index === 0}
						quality={60}
						className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
					/>
				</div>
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
				<div className="absolute top-4 left-4 z-20">
					<span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
						{destination.badge}
					</span>
				</div>
				<div className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:opacity-0" />
				<div className="absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
				<div className="absolute inset-x-0 bottom-0 p-6 text-white transition-all duration-500 group-hover:opacity-0">
					<h3 className="text-2xl font-bold mb-2 drop-shadow-lg">{destination.name}</h3>
					<p className="text-sm text-white/90 line-clamp-2 mb-4 drop-shadow">
						{destination.shortDescription}
					</p>
				</div>				<div className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center text-white opacity-0 transition-all duration-500 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
					<h3 className="text-3xl font-bold mb-4 drop-shadow-lg">{destination.name}</h3>
					<p className="text-sm text-white/90 mb-6 leading-relaxed drop-shadow">
						{destination.detailedDescription}
					</p>
					<a 
						href={`/destinations/${destination.name.toLowerCase().replace(/\s+/g, '-')}`}
						className="inline-block bg-yellow-400 text-black hover:bg-yellow-500 font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
					>
						View tours
					</a>
				</div>
			</div>
		);
	});

	return (
		<section 
			id="destinations" 
			ref={ref} 
			className="py-20 bg-gradient-to-b from-gray-50 to-white"
		>
			<div className="container mx-auto px-6">				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-6 tracking-wider uppercase">
						Cities Exploration
					</h2>
					<div className="w-24 h-1 bg-yellow-500 mx-auto mb-8"></div>
					<p className="text-lg md:text-xl lg:text-2xl text-black max-w-3xl mx-auto font-bold tracking-wide leading-relaxed">
						Discover incredible destinations across India with our curated travel experiences
					</p>
				</motion.div>{/* Destinations Grid */}
				<div
					className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}
				>
					{currentDestinations.map((destination, index) => (
						<DestinationCard
							key={`${destination.name}-${currentStartIndex}-${index}`}
							destination={destination}
							index={index}
							currentStartIndex={currentStartIndex}
						/>
					))}
				</div>

				{/* Rotation Indicator */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: isInView ? 1 : 0 }}
					transition={{ delay: 1 }}
					className="flex justify-center mt-8"
				>
					<div className="flex space-x-2">
						{Array.from({ length: Math.ceil(destinations.length / destinationsPerPage) }).map((_, index) => (
							<div
								key={index}
								className={`w-2 h-2 rounded-full transition-all duration-300 ${
									Math.floor(currentStartIndex / destinationsPerPage) === index
										? 'bg-yellow-400 w-8'
										: 'bg-gray-300'
								}`}
							/>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
