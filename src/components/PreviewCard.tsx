import { PortableText, PortableTextComponents } from "@portabletext/react";
//import arrowLeft from '@/public/arrow_left.svg'
import { Link, useLocation } from "react-router-dom"; 
import { Picture, Preview } from "@/sanity/sanity-types";
import { urlFor } from "@/sanity/client";
//import { IoIosArrowRoundForward } from "react-icons/io";
import { useState } from "react";
import { usePage } from "@/utils/my-store";

type Props = {
	preview: Preview 
}

const components : PortableTextComponents = {
  block: {
    normal: ({children}) => <h1 className="text-lg font-light leading-6 text-foreground">{children}</h1>,
  },
	marks: {
    em: ({children}) => <p className="text-lg font-normal text-destructive leading-6">{children}</p>,
	},
}


export default function PreviewCard({ preview } : Props) {
	const [loading, setLoading] = useState(true)
	const { setPageOpen } = usePage()

	function loadingHandler() {
		setLoading(false)
	}
	
	const location = useLocation().pathname.split('/').slice(-1)[0]
	
	const imgUrl = preview.picture ? urlFor(((preview.picture as unknown) as Picture).image)?.width(2400)?.url() : "" 
	const lqipUrl = preview.picture ? urlFor(((preview.picture as unknown) as Picture).image)?.width(24)?.url() : "" 
	
	return (
		<div className="flex flex-col md:flex-row relative p-6 sm:px-24 py-20 sm:rounded-lg w-full 
			sm:max-w-[960px]  sm:min-h-[456px] bg-muted gap-x-[80px] gap-y-4 transition-all">
			<div className={`relative flex flex-col  ${!preview ? "bg-gray-100 animate-fast-pulse" : ""}
				justify-center items-center w-full h-fit md:h-auto `}>
				<img 
					src={imgUrl}
					onLoad={loadingHandler}
					alt="picture"
					className={`w-full ${loading ? 'h-0' :''}`}
				/>
				{loading && 
				<img 
					src={lqipUrl}
					alt="picture"
					className={`w-full`}
				/>}
			</div>
			<div className="flex flex-col w-full justify-center ">
				<div className="flex flex-col h-fit leading-none gap-y-5">
					<h1 className="text-[28px] font-medium leading-10 text-foreground"> {preview.title}</h1>
					<PortableText components={components} value={preview.description!}/>
						<div className="flex flex-row gap-x-1 items-center">
							<Link 
								to={`/projects/${preview.slug}`} 
								onClick={()=>setPageOpen(false, preview.slug, location)}
							>
								<h1 className={`
									text-base font-semibold bg-destructive px-4 py-1 
									rounded-lg text-background hover:bg-[#FDCECF] transition
								`}>
									Read More
								</h1>
							</Link>
						</div>
				</div>
			</div>
		</div>	
	)
}
