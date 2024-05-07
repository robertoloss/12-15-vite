import { Section } from "@/sanity/sanity-types"
import { PortableText, PortableTextComponents } from "@portabletext/react"

type Props = {
	section: Section 
}

const components : PortableTextComponents = {
  block: {
    normal: ({children}) => <h1 className="text-lg font-light text-left text-foreground leading-6">{children}</h1>,
  },
	marks: {
    em: ({children}) => <p className="text-lg font-normal text-destructive leading-6">{children}</p>,
	},
}

export default function SectionTop({ section } : Props) {

	return (
		<div className="py-10 flex flex-col w-full items-center">
			<div className="flex flex-col items-center gap-y-4 w-full max-w-[640px]">
				<p className={`
					flex flex-row font-bold text-2xl text-background p-4 rounded-sm
					bg-destructive h-10 w-10 items-center justify-center
				`}>
					{section.section_number}
				</p>
				<p className="font-medium text-2xl text-center text-foreground">
					{section.section_title}
				</p>
				<div className="w-full h-0 border-t border-[#8e9098]"/>
				<PortableText components={components} value={section.section_content!} />
			</div>
		</div>
	)
}
