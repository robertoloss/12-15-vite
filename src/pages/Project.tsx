import { Project } from "@/sanity/sanity-types";
import Section from "@/components/Section";
import { SectionType } from "@/sanity/sanity-types";
import ThreeColumns from "@/components/ThreeColumns";
import HeroProject from "@/components/HeroProject";
import BigPicture from "@/components/BigPicture";
import { createColumns } from "@/utils/create-columns";
import { useLoaderData } from "react-router-dom";
 
export default function ProjectPage() {
	const projectArray : Project[] | null = useLoaderData() as Project[] | null
	const project : Project | null = projectArray ? projectArray[0] : null
	
	const columns = project ? createColumns(project) : []	

	window.scrollTo(0,0)

	return (
		<div className="flex flex-col items-center px-8 w-full min-h-[100vh]">
			{ ( !project ) && <h1>Uh oh! Something went wrong... 🤔</h1> } {/* deleted loaded && */}

			{ project && <HeroProject project={project} /> }
			{ (project && project.wide_picture) && <BigPicture project={project} /> }
			{ project?.three_cols_yesNo && <ThreeColumns columns={columns} /> }
			{ project?.sections?.map((section: SectionType, key: number) => 
						<Section section={section} sectionNum={key} key={key}/>) }
		</div>
	)
}
