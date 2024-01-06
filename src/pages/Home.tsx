//import { 	useEffect, useState } from 'react'
import AnimationWrapper from '@/components/AnimationWrapper'
import { Preview } from '../sanity/sanity-types'
import Hero from '@/components/Hero'
import PreviewCard from '@/components/PreviewCard'
import { useLoaderData } from 'react-router-dom'
import { Website } from '../sanity/sanity-types'
//import { getPreviews } from '@/sanity/client'

function Home() {
	const [ previews, website ] = useLoaderData() as [ Preview[], Website ]

	return (
		<AnimationWrapper>
			<div className="flex flex-col relative sm:px-8 pb-20 items-center min-h-[100vh]">
				<Hero website={ website } />
				<div className="flex flex-col items-center gap-y-10 mb-[160px]">
				{previews?.map(( preview: Preview, index: number ) =>
					<PreviewCard key={index} preview={preview}/>
				)}
				</div>
			</div>
		</AnimationWrapper>
	)
}

export default Home
