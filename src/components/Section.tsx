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
		.map((pSection: typeof section.picture_sections[0], key: number) =>
			<PictureSection pictureSection={pSection} key={sectionNum*10 + key}/>	
		)} 
		
	</>)
}
