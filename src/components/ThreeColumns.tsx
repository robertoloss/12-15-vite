import Column from "./Column"
import { ColumnType } from "@/sanity/sanity-types"

type Props = {
	columns: ColumnType[]
}

export default function ThreeColumns({ columns } : Props) {

	//console.log("Cols in Three cols: ", columns)
	
	return (
		<div className="flex flex-wrap py-14 w-full max-w-[720px] justify-around">
			{columns.map(( column: ColumnType ) => 
				<Column column={column} />
			)}	
		</div> 
	)
}
