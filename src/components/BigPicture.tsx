import useMediaQuery from "@/utils/useMediaQuery"
import { urlFor } from "@/sanity/client"
import { Project } from "@/sanity/sanity-types"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { getProject } from "@/sanity/client"


export default function BigPicture() {
	const [project,	setProject] = useState<Project | null>(null)
	const [ , setLoaded] = useState(false)
	
	const location = useLocation();
	const projectSlug = location.pathname.split('/').pop()
	
	useEffect(()=>{
		(async ()=>{
			const data = await getProject(projectSlug!)
			setProject(data[0]) 
			setLoaded(true)
		})()	
	},[projectSlug])

	const screen = useMediaQuery()
	const imgUrl = project ? 
									project.wide_picture ? 
										urlFor(project.wide_picture.image)?.width(2400)?.url() 
										: "" 
									: "" 

	return (<>
		<div 
			className="flex flex-col w-[calc(100%+64px)] bg-bigpic h-fit py-10 px-4 mx-[-16px] items-center justify-center"
			style={{ minHeight: `${screen / 2.3}px` }}> 
				<div className="relative flex flex-col w-full max-w-[1096px] items-center"> 
					<img src={imgUrl} alt="picture" className="w-full"/>	
				</div>
		</div>
	</>)
}


