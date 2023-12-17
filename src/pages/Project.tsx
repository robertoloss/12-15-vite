import { Project } from "@/sanity/sanity-types";
import { urlFor } from "@/sanity/client";
import HeroProject from "@/components/HeroProject";
import BigPicture from "@/components/BigPicture";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProject } from "@/sanity/client";
//import { getProject } from "@/sanity/client";
//import { createColumns } from "@/utils/CreateColumns"

 
export default function ProjectPage() {
	const [project,	setProject] = useState<Project | null>(null)
	
	const location = useLocation();
	const projectSlug = location.pathname.split('/').pop()
	
	useEffect(()=>{
		(async ()=>{
			const data = await getProject(projectSlug!)
			setProject(data[0])
		})()	
	},[projectSlug])
	
	console.log("Project : ", project)
	const imgUrl = project ? 
									project.wide_picture ? 
										urlFor(project.wide_picture.image)?.width(2400)?.url() 
										: "" 
									: ""
	//const columns = createColumns(project)	

	return (
		<div className="flex flex-col items-center px-8 w-full">
			{ !project && <h1>Uh oh! Something went wrong...</h1> }

			{ project && <HeroProject project={project} /> }
			{ (project && project.wide_picture) && <BigPicture imgUrl={imgUrl!}/> }
		</div>
	)
}



//					project.three_cols_yesNo && <ThreeColumns columns={columns} />
//					
//					project.sections?.map((section:any, key: number) => 
//						<Section section={section} sectionNum={key} key={key}/>)

