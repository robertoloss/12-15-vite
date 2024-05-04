import { Project, Section as SectionType } from "@/sanity/sanity-types";
import Section  from "@/components/Section";
import ThreeColumns from "@/components/ThreeColumns";
import HeroProject from "@/components/HeroProject";
import BigPicture from "@/components/BigPicture";
import { createColumns } from "@/utils/create-columns";
import { useLoaderData, useLocation } from "react-router-dom";
import AnimationWrapper from "@/components/AnimationWrapper";
import { usePage } from "@/utils/my-store";
import { Suspense, useEffect } from "react";
 
export default function ProjectPage() {
	const projectArray : Project[] | null = useLoaderData() as Project[] | null
	const project : Project | null = projectArray ? projectArray[0] : null
	const columns = project ? createColumns(project) : []	
	const { pageOpen, setPageOpen } = usePage()
	const location = useLocation()
	
	useEffect(()=>{
		setPageOpen(true)
	},[setPageOpen,location])

	window.scrollTo(0,0)
	return (
		<Suspense>
			<div className="min-h-screen">
				<AnimationWrapper pageOpen={pageOpen}>
					<div className="flex flex-col items-center px-8 w-full">
						{ ( !project ) && <h1>Uh oh! Something went wrong... 🤔</h1> } {/* deleted loaded && */}

						{ project && <HeroProject project={project} /> }
						{ (project && project.wide_picture) && <BigPicture project={project} /> }
						{ project?.three_cols_yesNo && <ThreeColumns columns={columns} /> }
						{ ((project?.sections as unknown) as SectionType[]).map((section, key: number) => 
									<Section section={section} sectionNum={key} key={key}/>) }
					</div>
				</AnimationWrapper>
			</div>
		</Suspense>
	)
}
