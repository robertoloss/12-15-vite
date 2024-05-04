import useMediaQuery from "@/utils/useMediaQuery"
import { urlFor } from "@/sanity/client"
import { Picture, Project } from "@/sanity/sanity-types"
import { useState } from "react"

type Props = {
	project: Project
}

export default function BigPicture({ project } : Props) {
		const [loading, setLoading] = useState(true);
	function handleLoading() {
		setLoading(false);
	}

	const screen = useMediaQuery()
	const imgUrl = project ? 
									project.wide_picture ? 
										urlFor((project.wide_picture as unknown as Picture).image)?.width(2400)?.url() 
										: "" 
									: "" 
	const lqipUrl = project ? 
									project.wide_picture ? 
										urlFor((project.wide_picture as unknown as Picture).image)?.width(200)?.url() 
										: "" 
									: ""
	return (<>
		<div 
			className="flex flex-col w-[calc(100%+64px)] bg-bigpic h-fit py-10 px-4 mx-[-16px] items-center justify-center"
			style={{ minHeight: `${screen / 2.3}px` }}> 
				<div className="relative flex flex-col w-full max-w-[1096px] items-center"> 
					<img
						src={imgUrl}
						alt="picture"
						className={`w-full ${loading ? 'h-0' : ''}`}
						onLoad={handleLoading}
					/>	
					{// loading && <div className="w-full h-[800px] animate-pulse rounded-xl bg-gray-200"/>
					}
					{loading && <img src={lqipUrl} alt="picture" className={`w-full `} />}
				</div>
		</div>
	</>)
}


