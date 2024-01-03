import { getWebsiteInfo } from "@/sanity/client";
import { useState, useEffect } from "react";
import { Website } from "@/sanity/sanity-types";
import { urlFor } from "@/sanity/client";


export default function Footer() {
	const [website, setWebsite] = useState<Website | null>(null) 

	useEffect(()=>{
		(async ()=>{
			const data = await getWebsiteInfo();
			setWebsite(data[0])
		})()
	},[])

	return (<>
		{website && <div className="flex flex-col w-full h-[210px] items-center justify-center bg-[#EEEFF0] font-light px-6 gap-y-1">
			<div className="flex flex-row flex-wrap w-full max-w-[1200px] justify-between items-center gap-y-4">
				<div className="flex flex-row flex-wrap gap-4 items-center">
					<a 
					href={`mailto:${website?.footer_email}`} 
						target="_blank"
						className="h-fit mr-4"
					>
						{website?.footer_email}
					</a>
					<div className="flex flex-row min-w-[200px] gap-x-4">
					{website?.icons!.map((icon, key : number)=>
						<div className="w-8" key={key}>
							<a href={`${icon.url}`} target="_blank">
								<img src={urlFor(icon.image)?.width(32).url()} key={key}/>
							</a>
						</div>
					)}
					</div>
				</div>
				<div className="flex flex-col gap-y-2">
					<div className="flex flex-row flex-wrap">	
						<h1 className="mr-1 min-w-[200px]">
							{website.footer_right_text!.split('©')[0]}
						</h1>
						<h1 className="mr-1 min-w-[200px]">
							©{website.footer_right_text!.split('©')[1]}
						</h1>
					</div>
				</div>
			</div>
			<div className="flex flex-row flex-wrap w-full max-w-[1200px] justify-start min-[904px]:justify-end items-center gap-y-4">
				<div className="flex flex-row flex-wrap ">	
					<h1 className="mr-1">
						Web development	
					</h1>
					<h1 className="mr-1 min-w-[200px]">
						© 2024 Roberto Loss						
					</h1>
				</div>
			</div>
		</div>}
	</>)
}
