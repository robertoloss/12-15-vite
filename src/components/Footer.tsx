import { getWebsiteInfo } from "@/sanity/client";
import FooterIcon from "./FooterIcon";
import { useState, useEffect } from "react";
import { Picture, Website } from "@/sanity/sanity-types";
//import { urlFor } from "@/sanity/client";


export default function Footer() {
	const [website, setWebsite] = useState<Website | null>(null) 

	useEffect(()=>{
		(async ()=>{
			const data = await getWebsiteInfo();
			setWebsite(data[0])
		})()
	},[])
	
	const iconsArray : Picture[][] = []
	if (website?.icons?.length) {
		for (let i=0; i<website.icons.length; i++) {
			const icon = website.icons![i] as unknown as Picture
			const iconHover = website.icons_hover![i] as unknown as Picture
			iconsArray.push([icon, iconHover])
		}
	}

	return (<>
		{website && 
		<div className="flex flex-row flex-wrap w-full h-[210px] items-center justify-between bg-muted text-foreground font-light px-6 gap-y-1">
				<div className="flex flex-row flex-wrap gap-4 justify-center sm:justify-start items-center min-w-[300px] md:min-w-[400px] flex-1">
					<a 
					href={`mailto:${website?.footer_email}`} 
						target="_blank"
						className="h-fit mr-4"
					>
						{website?.footer_email}
					</a>
					<div className="flex flex-row min-w-[200px] gap-x-4">
					{iconsArray.map((iconArr: Picture[], key : number)=>
						<FooterIcon iconArr={iconArr} key={key} index={key} />	
					)}
					</div>
				</div>
				<div className="flex flex-col items-center sm:items-end gap-y-2 min-w-[300px] md:min-w-[400px] flex-1">
					<div className="flex flex-row w-full justify-center sm:justify-end">
						<svg width="16" height="20" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M28 7.75C28 16.5 15.0262 23.5825 14.4737 23.875C14.3281 23.9533 14.1654 23.9943 14 23.9943C13.8346 23.9943 13.6719 23.9533 13.5262 23.875C12.9737 23.5825 0 16.5 0 7.75C0.00231592 5.69528 0.819575 3.72539 2.27248 2.27248C3.72539 0.819575 5.69528 0.00231592 7.75 0C10.3312 0 12.5912 1.11 14 2.98625C15.4088 1.11 17.6688 0 20.25 0C22.3047 0.00231592 24.2746 0.819575 25.7275 2.27248C27.1804 3.72539 27.9977 5.69528 28 7.75Z" fill="#F96263"/>
						</svg>
					</div>
					<div className="flex flex-row justify-end">
						<h1 className="mr-1 text-center sm:text-right">
							{website.footer_right_text!.split('©')[0]}©{website.footer_right_text!.split('©')[1]}
						</h1>
					</div>
					<div className="flex flex-row flex-wrap ">	
						<h1 className="mr-1">
							Web developer | 	
						</h1>
						<h1 className="mr-1 ">
							<a href="https://robertoloss.netlify.app" target="_blank" className="hover:underline">
								Roberto Loss						
							</a>
						</h1>
					</div>
				</div>
		</div>}
	</>)
}
