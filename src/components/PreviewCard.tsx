import { PortableText, PortableTextComponents } from "@portabletext/react";
//import arrowLeft from '@/public/arrow_left.svg'
import { Link } from "react-router-dom"; 
import { Preview } from "@/sanity/sanity-types";
import { urlFor } from "@/sanity/client";
import { IoIosArrowRoundForward } from "react-icons/io";

type Props = {
	preview: Preview 
}

const components : PortableTextComponents = {
  block: {
    normal: ({children}) => <h1 className="text-lg font-normal leading-6">{children}</h1>,
  },
	marks: {
    em: ({children}) => <p className="text-lg font-normal text-destructive leading-6">{children}</p>,
	},
}


export default function PreviewCard({ preview } : Props) {
	
	const imgUrl = preview.picture ? urlFor(preview.picture?.image)?.width(2400)?.url() : "" 

	return (
		<div className="flex flex-col md:flex-row relative p-6 border-y-2 sm:border-2 sm:rounded-lg w-full 
			sm:max-w-[960px]  min-h-[360px] bg-muted gap-x-[80px] gap-y-4">
			<div className={`relative flex flex-col  ${!preview ? "bg-gray-100 animate-fast-pulse" : ""}
				justify-center items-center w-full h-fit md:h-auto `}>
				{preview.picture && <img src={imgUrl} alt="picture" className=""/>}
			</div>
			<div className="flex flex-col w-full justify-center ">
				<div className="flex flex-col h-fit leading-none gap-y-2">
					<h1 className="text-[28px] font-medium leading-10"> {preview.title}</h1>
					<PortableText components={components} value={preview.description}/>
					<Link to={`/projects/${preview.slug}`}>
						<div className="flex flex-row gap-x-1 items-center">
							<h1 className="text-lg font-medium text-destructive">Read More</h1>
							<IoIosArrowRoundForward size="24px" />
						</div>
					</Link>
				</div>
			</div>
		</div>	
	)
}
