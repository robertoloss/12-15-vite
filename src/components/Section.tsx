import SectionTop from "./SectionTop"
import { createColumns } from "@/utils/create-columns"
import { Picture_section, Quote as QuoteType, Section as SectionType } from "@/sanity/sanity-types"
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

		{((section.quote as unknown) as QuoteType) && 
			<Quote quote={((section.quote as unknown) as QuoteType)} author={((section.quote as unknown) as QuoteType).author!} /> }

		{((section.picture_sections as unknown) as SectionType[])  && ((section.picture_sections as unknown) as Picture_section[]).map((pSection, key: number) => {
				const thisBlueNextWhite = key < section.picture_sections!.length -1 &&
																pSection.background_blue &&
																!((section.picture_sections as unknown) as Picture_section[])[key + 1].background_blue
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
