import { PortableText, PortableTextComponents } from '@portabletext/react'
import { Project } from '@/sanity/sanity-types'

const componentsBig : PortableTextComponents = {
  block: {
    normal: ({children}) => <h1 className="text-2xl font-normal leading-8">{children}</h1>,
  },
}
const components : PortableTextComponents = {
  block: {
    normal: ({children}) => <h1 className="text-lg font-normal text-left leading-6">{children}</h1>,
  },
	marks: {
    em: ({children}) => <p className="text-lg font-normal text-destructive leading-6">{children}</p>,
	},
}

export default function HeroProject({ project } : {project: Project}) {
	
	const maxWidth = 432
	
	return (
		<div className="w-full min-h-[200px] flex flex-col justify-center items-center pt-20 md:pt-20 pb-20">
			<div className="flex flex-col max-w-[960px] w-full justify-center items-center gap-y-4 "> 
				<h1 className="text-[18px] text-destructive font-semibold">{project.name}</h1>
				<h1 className="text-[24px] font-semibold">{project.title}</h1>
				<div className="w-full h-0 border-t border-[B8B9BA] "/>
				<div className='flex flex-wrap gap-[52px] items-center w-fit justify-center'>
					<div style={{
						maxWidth: `${maxWidth}px`,
						justifySelf: 'center',
						alignSelf: 'center'
					}}>
						<PortableText components={componentsBig} value={project.description_left!} />
					</div>
					<div style={{
						maxWidth: `${maxWidth}px`
					}}>
						<PortableText components={components} value={project.description_right!} />
					</div>
				</div>
			</div>
		</div>
	)
}
