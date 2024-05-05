import { PortableText, PortableTextComponents } from '@portabletext/react'
import { Project } from '@/sanity/sanity-types'

const components : PortableTextComponents = {
  block: {
    normal: ({children}) => <h1 className="text-lg font-thin text-left text-foreground leading-6">{children}</h1>,
  },
	marks: {
    em: ({children}) => <p className="text-lg font-normal text-destructive leading-6">{children}</p>,
	},
}

export default function HeroProject({ project } : {project: Project}) {
	
	
	return (
		<div className="w-full min-h-[200px] text-foreground flex flex-col justify-center items-center pt-20 md:pt-20 pb-20">
			<div className="flex flex-col max-w-[960px] w-full justify-center items-center gap-y-4 "> 
				<h1 className="text-[36px] text-destructive font-semibold font-raleway">{project.name}</h1>
				<h1 className="text-[20px] font-normal">{project.title}</h1>
				<div className="flex flex-col gap-10 max-w-[640px] items-center w-fit justify-center">
					<div className="w-full h-0 border-t border-[B8B9BA] "/>
					<PortableText components={components} value={project.description_left!} />
					<PortableText components={components} value={project.description_right!} />
				</div>
			</div>
		</div>
	)
}
