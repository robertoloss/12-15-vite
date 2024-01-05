import { urlFor } from "@/sanity/client"
import { useState } from "react"
import { Website } from "@/sanity/sanity-types"
import { PortableTextComponents, PortableText } from "@portabletext/react"
import { useLoaderData } from "react-router-dom"

const components : PortableTextComponents = {
  block: {
    normal: ({children}) => <h1 className="text-lg font-normal text-left leading-6">{children}</h1>,
  },
	marks: {
    em: ({children}) => <p className="text-lg font-normal text-destructive leading-6">{children}</p>,
	},
}
const componentsExpertise : PortableTextComponents = {
  block: {
    normal: ({children}) => <h1 className="text-lg font-normal text-center leading-6">{children}</h1>,
  },
	marks: {
    em: ({children}) => <p className="text-lg font-normal text-destructive leading-6">{children}</p>,
	},
}

export default function About() {
	const [loading, setLoading] = useState(true)
	const [loading2, setLoading2] = useState(true)

	function loadingHandler() {
		setLoading(false)
	}
	function loadingHandler2() {
		setLoading2(false)
	}

	const website = useLoaderData() as Website

	return (<div className="flex flex-col min-h-[100vh] mb-[200px]">
		{website && <div className="flex flex-col px-6"> 
			<div className="py-10 flex flex-col w-full items-center">
				<div className="flex flex-col items-center gap-y-4 w-full max-w-[640px]">
					<div className="flex flex-col items-center">
						<p className="font-bold text-2xl text-destructive">
							About
						</p>
						<p className="font-bold text-2xl text-center">
							{website?.name}
						</p>
					</div>
					<div className="w-full h-0 border-t border-[#B8B9BA]"/>
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
					<div className="w-full h-0 border-t border-[#B8B9BA]"/>
					<PortableText components={componentsExpertise} value={website.about_expertise!} />
				</div>
			</div>
			<div className="relative flex flex-col w-full max-w-[1096px] self-center mt-[40px] mb-[160px]"> 
				<img 
					className={`${loading ? 'h-0' : ''}`}
					src={urlFor(website.about_picture?.image)?.width(2400)?.url()}
					alt="img"
					onLoad={loadingHandler}
				/>
				{loading && 
				<img
					className={`w-full ${loading2 ? 'h-0' : ''}`}
					src={urlFor(website.about_picture?.image)?.width(200)?.url()}
					alt="img"
					onLoad={loadingHandler2}
				/>}
				{loading2 && 
				<img className="w-full"
					src={urlFor(website.about_picture?.image)?.width(24)?.url()}
					alt="img"
				/>}
				<h1 className={`sm:text-lg sm:font-medium self-center text-white -mt-[100px] sm:-mt-[200px] max-w-[400px] 
					text-center px-6 ${(loading || loading2) ? 'opacity-0' : ''}`}>
					{website.about_picture?.name}
				</h1>
			</div>
		</div>}
	</div>)
}
	
