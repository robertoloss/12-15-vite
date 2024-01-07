import { useState } from "react"
import { Picture } from "@/sanity/sanity-types"
import { urlFor } from "@/sanity/client"



export default function FooterIcon({key, iconArr} : {key: number, iconArr: Picture[]}) {
	const [hover, setHover] = useState(false) 
	const [icon, iconHover] = iconArr

	return (
		<div className="w-8" key={key} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
			<a href={`${icon.url}`} target="_blank">
				{!hover && <img src={urlFor(icon.image)?.width(32).url()} key={key}/> }
				{hover && <img src={urlFor(iconHover.image)?.width(32).url()} key={key}/> }
			</a>
		</div>
	)
}
