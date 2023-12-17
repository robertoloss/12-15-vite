import { urlFor } from "@/sanity/client";
import { Project } from "@/sanity/sanity-types";
import { ThreeCols } from "@/sanity/sanity-types";

export type ColumnType = {
	title: string, 
	content: ThreeCols["columns_text_1"], 
	iconUrl: string | undefined, 
	figure: string,
	iconsYes: boolean
}


export function createColumns( project : Project ) : ColumnType[] {
	
	const threeCols = project?.three_cols_proj;

	const colTitles = threeCols?.columns_titles ? [ ...threeCols.columns_titles ] : []
	const colIcons = threeCols?.icons ? [ ...threeCols.icons ] : []
	const colFigures = threeCols?.figures ? [ ...threeCols.figures ] : []
	const colContents = [threeCols?.columns_text_1, threeCols?.columns_text_2, threeCols?.columns_text_3]

  const columns : ColumnType[] = [];

	for (let i=0; i<3; i++) {
		const column : ColumnType = { title: "", content: [], iconUrl: "", figure: "", iconsYes: threeCols!.are_there_icons! };
		column.title = colTitles[i];
		column.content = colContents[i]
		column.iconUrl = colIcons[i]?.image ? urlFor(colIcons[i]?.image)?.width(28)?.url() : ""
		column.figure = colFigures[i]
		columns.push(column)
	}

	return columns
}
