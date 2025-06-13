"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const destinations = [
	{
		name: "Kashmir",
		description:
			"Nestled in the Himalayas, Kashmir boasts stunning valleys and lakes, with a rich cultural heritage.",
		image: "/destinations/kashmir.jpg",
	},
	{
		name: "Rajasthan",
		description:
			"A land of royal palaces, desert landscapes, and colorful markets, offering a captivating blend of history, culture, and architectural wonders in cities like Jaipur, Udaipur, and Jaisalmer.",
		image: "/destinations/rajasthan.jpg",
	},
	{
		name: "Kerala",
		description:
			"Known as 'God’s Own Country,' Kerala enchants visitors with lush backwaters, serene beaches, and abundant greenery—perfect for a tranquil and rejuvenating escape.",
		image: "/destinations/kerala.jpg",
	},
	{
		name: "Himachal Pradesh",
		description:
			"Famed for its snow-capped mountains, pine forests, and adventure hubs like Manali and Shimla, ideal for trekking, nature walks, and scenic retreats.",
		image: "/destinations/himachal-pradesh.jpg",
	},
	{
		name: "Goa",
		description:
			"Famed for its sun-kissed beaches, vibrant nightlife, and laid-back coastal vibe, a favorite for relaxation, water sports, and lively festivals.",
		image: "/destinations/goa.jpg",
	},
	{
		name: "Uttarakhand",
		description:
			"Home to the Himalayas, spiritual towns, and adventure sports, offering breathtaking views, trekking trails, and peaceful hill stations like Nainital and Mussoorie.",
		image: "/destinations/Uttarakhand.jpg",
	},
	{
		name: "Meghalaya",
		description:
			"Known for its dense rainforests and living root bridges, with tribal culture thriving through unique customs, music, and traditional crafts.",
		image: "/destinations/Meghalaya.jpg",
	},
	{
		name: "Assam",
		description:
			"Lush forests and the mighty Brahmaputra River define Assam’s rich natural environment, while diverse ethnic communities celebrate vibrant folk traditions and festivals.",
		image: "/destinations/assam.jpeg",
	},
	{
		name: "Delhi",
		description:
			"A bustling metropolis blending historic monuments with modern urban life, with a vibrant mix of traditions, festivals, and cuisines.",
		image: "/destinations/delhi.jpg",
	},
	{
		name: "Ladakh",
		description:
			"With dramatic landscapes, high-altitude lakes, and Buddhist monasteries, attracting adventure seekers and those looking for unique Himalayan experiences.",
		image: "/destinations/Ladakh.jpg",
	},
];

export default function DestinationsSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.1 });
	const [page, setPage] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(8);

	// Detect mobile vs large screen
	useEffect(() => {
		const updateCount = () => {
			const mobile = window.matchMedia("(max-width: 640px)").matches;
			setItemsPerPage(mobile ? 4 : 8);
			setPage(0);
		};
		updateCount();
		window.addEventListener("resize", updateCount);
		return () => window.removeEventListener("resize", updateCount);
	}, []);

	const totalPages = Math.ceil(destinations.length / itemsPerPage);
	const start = page * itemsPerPage;
	const currentItems = destinations.slice(start, start + itemsPerPage);

	return (
		<section id="destinations" ref={ref} className="py-20 bg-lavender/20">
			<div className="container px-4 md:px-6">
				<div className="text-center mb-6">
					<h2 className="text-3xl font-bold tracking-tight mb-2">
						Destinations
					</h2>
				</div>

				<motion.div
					className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
					variants={{
						hidden: { opacity: 0 },
						visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
					}}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					key={page}
				>
					{currentItems.map((destination, idx) => (
						<motion.div
							key={idx}
							variants={{
								hidden: { y: 20, opacity: 0 },
								visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
							}}
						>
							<Card className="overflow-hidden h-full transition-shadow duration-300 hover:shadow-lg hover:-translate-y-1">
								<div className="relative h-48 w-full">
									<Image
										src={destination.image}
										alt={destination.name}
										fill
										className="object-cover"
										loading="lazy"
									/>
								</div>
								<CardContent className="p-6">
									<h3 className="text-xl font-semibold mb-2">
										{destination.name}
									</h3>
									<p className="text-muted-foreground">
										{destination.description}
									</p>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>

				{/* Pagination Controls */}
				<div className="flex justify-center items-center space-x-4 mt-8">
					<Button
						variant="outline"
						size="sm"
						onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
						disabled={page === 0}
					>
						<ChevronLeft className="w-4 h-4" /> Prev
					</Button>
					<span className="text-sm">
						Page {page + 1} of {totalPages}
					</span>
					<Button
						variant="outline"
						size="sm"
						onClick={() =>
							setPage((prev) => Math.min(prev + 1, totalPages - 1))
						}
						disabled={page === totalPages - 1}
					>
						Next <ChevronRight className="w-4 h-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
