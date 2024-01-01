import SectionTop from "./SectionTop"
import { createColumns } from "@/utils/create-columns"
import { SectionType } from "@/sanity/sanity-types"
import ThreeColumns from "./ThreeColumns"
import Quote from "./Quote"
import PictureSection from "./PictureSection"

type Props = {
	section: SectionType
	sectionNum: number
}

export default function Section({ section, sectionNum } : Props) {

	const columns = createColumns(section) 
	//console.log("section : ", section)
	//console.log("section.picture_sections : ", section.picture_sections)

	return (<>

		<SectionTop section={section} />

		{section.three_cols_yesNo && <ThreeColumns columns={columns}/>}

		{section.quote && <Quote quote={section.quote} author={section.quote.author!} /> }

		{section.picture_sections  && section.picture_sections
		.map((pSection: typeof section.picture_sections[0], key: number) => {
				const thisBlueNextWhite = key < section.picture_sections!.length -1 &&
																pSection.background_blue &&
																!section.picture_sections![key + 1].background_blue
				return	<PictureSection 
									pictureSection={pSection} 
									len={section.picture_sections!.length} 
									index={key} 
									key={sectionNum*10 + key}
									thisBlueNextWhite={thisBlueNextWhite}
								/>	
			}
		)} 
		
	</>)
}
