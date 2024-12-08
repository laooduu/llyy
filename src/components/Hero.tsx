"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import React from 'react';
import { useRef, useEffect } from "react";
import Typed from 'typed.js';

const options = {
	strings: [
		"Hi, I'm Markus ^100",
		"a full-stack <font color='#115e59'>&lt;Engineer /&gt;</font>, ^200", 
		"a big data <font color='#5b21b6'>&lt;Engineer /&gt;</font>, ^200", 
		"and try my best to be an AI <font color='#86198f'>&lt;Engineer /&gt;</font>. ^200"
	],
	typeSpeed: 80, // 打印速度
	startDelay: 300, // 开始之前的延迟300毫秒
	loop: true,
	smartBackspace: true, // this is a default
	backSpeed: 60,
};

export const Hero = () => {

	// Create reference to store the DOM element containing the animation
	const el = useRef(null);
	useEffect(() => {
		const typed = new Typed(el.current, options);

		return () => {
			// Destroy Typed instance during cleanup to stop animation
			typed.destroy();
		};
	}, []);

	return (
		<div className='hero-section'>
			<section className='container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10 '>
				<div className='text-center lg:text-start space-y-6'>
					<main className='text-5xl md:text-6xl font-bold text-balance'>
						<h1 className='inline'>
							<span className='inline bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-transparent bg-clip-text'>
								Next AI
							</span>{" "}
							with
						</h1>{" "}
						<h2 className='inline'>
							<span className='inline bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-transparent bg-clip-text'>
								Markus
							</span>{" "}
						</h2>
					</main>
					<p className='text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0 text-balance'>
						AI subscriptions are intimidating, but we don&apos;t have to be. Let&apos;s prove it.
					</p>

					<div className='space-y-4 md:space-y-0 md:space-x-4'>
						<Button className='w-full md:w-1/3'>Get Started</Button>
						<a
							rel='noreferrer noopener'
							// href='https://github.com/leoMirandaa/shadcn-landing-page.git'
							herf=""
							target='_blank'
							className={`w-full md:w-1/3 ${buttonVariants({
								variant: "outline",
							})}`}
						>
							Github Repository
							<GitHubLogoIcon className='ml-2 w-5 h-5' />
						</a>
					</div>
				</div>
				<div>
					<div>
						<span ref={el} />
					</div>
				</div>

				{/* <div className='z-10'>
					<Image
						src='/hero.png'
						width={986}
						height={512}
						alt=''
						className='rounded-md select-none pointer-events-none'
					/>
				</div> */}
			</section>
		</div>
	);
};
