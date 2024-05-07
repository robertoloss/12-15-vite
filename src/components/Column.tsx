import { PortableText, PortableTextComponents} from "@portabletext/react"
import { ColumnType } from "@/utils/create-columns"

const components : PortableTextComponents = {
  block: {
    normal: ({children}) => <h1 className="text-lg font-light text-center sm:text-left leading-6">{children}</h1>,
  },
	marks: {
    em: ({children}) => <p className="text-lg font-normal text-destructive leading-6">{children}</p>,
	},
}

export default function Column({ column } : { column : ColumnType }) {

	return (
		<div className="flex flex-col max-w-[240px] min-w-[240px] items-center sm:items-start gap-y-4 p-10">
			{column.iconsYes && <img src={column.iconUrl} alt="icon" />}
			{column.iconsYes === false && <h1 className="font-normal w-fit text-5xl text-destructive"> { column.figure } </h1>}
			<h1 className="text-2xl font-medium">{column.title}</h1>
			<PortableText components={components} value={column!.content!}/>
		</div>
	)
}

