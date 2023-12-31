import Column from "./Column"
import { ColumnType } from "@/utils/create-columns"

type Props = {
	columns: ColumnType[]
}

export default function ThreeColumns({ columns } : Props) {

	//console.log("Cols in Three cols: ", columns)
	
	return (
		<div className="flex flex-row justify-center  bg-[#EEEFF0] w-[calc(100%+64px)] ">
			<div className="flex flex-wrap py-14 w-full max-w-[720px] justify-around">
				{columns.map(( column: ColumnType, key: number ) => 
					<Column key={key} column={column} />
				)}	
			</div> 
		</div>
	)
}
