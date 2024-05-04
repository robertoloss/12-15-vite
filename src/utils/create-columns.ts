import { urlFor } from "@/sanity/client";
import { Picture, Section as SectionType } from "@/sanity/sanity-types";
import { Project } from "@/sanity/sanity-types";
import { Three_cols as ThreeCols } from "@/sanity/sanity-types";

export type ColumnType = {
	title: string, 
	content: ThreeCols["columns_text_1"], 
	iconUrl: string | undefined, 
	figure: string,
	iconsYes?: boolean | undefined
}

export function createColumns( project : Project | SectionType ) : ColumnType[] {
	
	function isProject(project: Project | SectionType): project is Project {
		return (project as Project).three_cols_proj !== undefined;
	}
	
	let threeCols : ThreeCols;
	
	if (isProject(project)) {
		threeCols = ((project!.three_cols_proj as unknown) as ThreeCols)
	} else {
		threeCols = ((project!.three_cols_in_section as unknown) as ThreeCols)
	}
	
	const colTitles = threeCols?.columns_titles ? [ ...threeCols.columns_titles ] : []
	const colIcons = threeCols?.icons ? [ ...threeCols.icons ] : []
	const colFigures = threeCols?.figures ? [ ...threeCols.figures ] : []
	const colContents = [threeCols?.columns_text_1, threeCols?.columns_text_2, threeCols?.columns_text_3]

  const columns : ColumnType[] = [];

	for (let i=0; i<3; i++) {
		const column : ColumnType = { 
			title: "", 
			content: [], 
			iconUrl: "", 
			figure: "", 
		};
		column.iconsYes = threeCols?.are_there_icons ? threeCols.are_there_icons : false
		column.title = colTitles[i];
		column.content = colContents[i]
		column.iconUrl = ((colIcons[i] as unknown) as Picture).image ? 
												urlFor(((colIcons[i] as unknown) as Picture).image)?.width(28)?.url() : ""
		column.figure = colFigures[i]
		columns.push(column)
	}

	return columns
}
