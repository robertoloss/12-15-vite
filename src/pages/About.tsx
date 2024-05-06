import { urlFor } from "@/sanity/client"
import { Suspense, useState } from "react"
import { Picture, Website } from "@/sanity/sanity-types"
import { PortableTextComponents, PortableText } from "@portabletext/react"
import { useLoaderData } from "react-router-dom"
import AnimationWrapper from "@/components/AnimationWrapper"
import { useLocation } from "react-router-dom"
import { usePage } from "@/utils/my-store"
import { useEffect } from "react"

const components : PortableTextComponents = {
  block: {
    normal: ({children } ) => <h1 className="text-lg font-light text-left leading-6">{children}</h1>,
  },
	marks: {
    em: ({children}) => <p className="text-lg font-normal text-destructive leading-6">{children}</p>,
	},
}
const componentsExpertise : PortableTextComponents = {
  block: {
    normal: ({children}) => <h1 className="text-lg font-light text-center leading-6">{children}</h1>,
  },
	marks: {
    em: ({children}) => <p className="text-lg font-normal text-destructive leading-6">{children}</p>,
	},
}

export default function About() {
	const [loading, setLoading] = useState(true)

	const { pageOpen, setPageOpen } = usePage()
	const location = useLocation()
	
	useEffect(()=>{
		setPageOpen(true)
	},[setPageOpen,location])


	function loadingHandler() {
		setLoading(false)
	}
	

	const website = useLoaderData() as Website

	window.scrollTo(0,0)

	return (
	<Suspense>
	<div className="min-h-screen text-foreground">
		<AnimationWrapper pageOpen={pageOpen}>
		<div className="flex flex-col min-h-[100vh] mb-[200px]">
		{website && <div className="flex flex-col px-6"> 
			<div className="py-20 flex flex-col w-full items-center">
				<div className="flex flex-col items-center gap-y-4 w-full max-w-[640px]">
					<div className="flex flex-col gap-y-4 items-center">
						<p className="text-4xl font-semibold text-destructive">
							About
						</p>
						<p className="font-semibold text-xl text-center">
							{website?.name}
						</p>
					</div>
					<div className="w-full h-0 border-t border-[#565A66]"/>
					<PortableText components={components} value={website.about_description!} />
				</div>
			</div>
			<div className="py-10 flex flex-col w-full items-center">
				<div className="flex flex-col items-center gap-y-4 w-full max-w-[640px]">
					<div className="flex flex-col items-center">
						<p className="font-bold text-2xl text-center">
							Expertise	
						</p>
					</div>
					<div className="w-full h-0 border-t border-[#565A66]"/>
					<PortableText components={componentsExpertise} value={website.about_expertise!} />
				</div>
			</div>
			<div className="relative flex flex-col w-full max-w-[640px] self-center mt-[40px] mb-[160px]"> 
				<img 
					className={`${loading ? 'h-0' : ''}`}
					src={website?.about_picture ? urlFor(((website.about_picture) as unknown as Picture).image)?.width(2400)?.url() : ""}
					alt="img"
					onLoad={loadingHandler}
				/>
				{loading && 
				<img
					className={`w-full`}
					src={website?.about_picture ? urlFor(((website.about_picture) as unknown as Picture).image)?.width(200)?.url() : ""}
					alt="img"
				/>}
				<h1 className={`sm:text-lg sm:font-medium self-center text-white -mt-[100px] sm:-mt-[200px] max-w-[400px] 
					text-center px-6 ${(loading ) ? 'opacity-0' : ''}`}>
					{website?.about_picture ? ((website.about_picture) as unknown as Picture).name : ""}
				</h1>
			</div>
		</div>}
	</div>
	</AnimationWrapper>
	</div>)
	</Suspense>
	)
}
	
