//import { 	useEffect, useState } from 'react'
import AnimationWrapper from '@/components/AnimationWrapper'
import { Preview } from '../sanity/sanity-types'
import Hero from '@/components/Hero'
import PreviewCard from '@/components/PreviewCard'
import { useLoaderData } from 'react-router-dom'
import { Website } from '../sanity/sanity-types'
import { usePage } from '@/utils/my-store'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function Home() {
	const [ previews, website ] = useLoaderData() as [ Preview[], Website ]
	const { pageOpen, setPageOpen } = usePage()
	const location = useLocation()
	
	useEffect(()=>{
		setPageOpen(true)
	},[setPageOpen,location])

		
	return (<div className='min-h-screen'>
		<AnimationWrapper pageOpen={pageOpen}>
			<div  className="flex flex-col relative sm:px-8 pb-20 items-center min-h-[100vh]">
				<Hero website={ website } />
				<div className="flex flex-col items-center gap-y-10 mb-[160px]">
				{previews?.map(( preview: Preview, index: number ) =>
					<PreviewCard key={index} preview={preview}/>
				)}
				</div>
			</div>
		</AnimationWrapper>
		</div>
	)
}

export default Home
