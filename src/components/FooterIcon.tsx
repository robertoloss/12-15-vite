import { useState, useEffect } from "react"
import preloadImage from "@/utils/preloadImage"
import { Picture } from "@/sanity/sanity-types"
import { urlFor } from "@/sanity/client"



export default function FooterIcon({iconArr} : {iconArr: Picture[], index: number}) {
	const [hover, setHover] = useState(false) 
	const [icon, iconHover] = iconArr

	useEffect(()=>{
		urlFor(icon.image)?.width(32).url && preloadImage(urlFor(icon.image)!.width(32).url())
		urlFor(iconHover.image)?.width(32).url() && preloadImage(urlFor(iconHover.image)!.width(32).url())
	},[icon.image, iconHover.image])

	
	return (
		<div className="w-8"  onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
			<a href={`${icon.url}`} target="_blank">
				{!hover && <img src={urlFor(icon.image)?.width(32).url()} /> }
				{hover && <img src={urlFor(iconHover.image)?.width(32).url()} /> }
			</a>
		</div>
	)
}
