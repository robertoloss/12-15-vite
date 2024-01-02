import { Project } from "@/sanity/sanity-types";
import Section from "@/components/Section";
import { SectionType } from "@/sanity/sanity-types";
import ThreeColumns from "@/components/ThreeColumns";
import HeroProject from "@/components/HeroProject";
import BigPicture from "@/components/BigPicture";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProject } from "@/sanity/client";
import { createColumns } from "@/utils/create-columns";
 
export default function ProjectPage() {
	const [project,	setProject] = useState<Project | null>(null)
	const [loaded, setLoaded] = useState(false)
	
	const location = useLocation();
	const projectSlug = location.pathname.split('/').pop()
	
	useEffect(()=>{
		(async ()=>{
			const data = await getProject(projectSlug!)
			setProject(data[0]) 
			setLoaded(true)
		})()	
	},[projectSlug])
	
	const columns = project ? createColumns(project) : []	

	return (
		<div className="flex flex-col items-center px-8 w-full min-h-[100vh]">
			{ ( loaded && !project ) && <h1>Uh oh! Something went wrong...</h1> }

			{ project && <HeroProject project={project} /> }
			{ (project && project.wide_picture) && <BigPicture /> }
			{ project?.three_cols_yesNo && <ThreeColumns columns={columns} /> }
			{ project?.sections?.map((section: SectionType, key: number) => 
						<Section section={section} sectionNum={key} key={key}/>) }
		</div>
	)
}
