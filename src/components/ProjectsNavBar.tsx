//import { NavigationMenuLink } from "@radix-ui/react-navigation-menu" 
import { PortableTextComponents, PortableText } from "@portabletext/react"
import { Link } from "react-router-dom"
import { Preview } from "@/sanity/sanity-types"
import { urlFor } from "@/sanity/client"
import { useState } from "react"

const components : PortableTextComponents = {
  block: {
    normal: ({children}) => <h1 className="text-sm font-normal leading-1 ">{children}</h1>,
  },
	marks: {
    em: ({children}) => <p className="text-lg font-normal text-destructive leading-6">{children}</p>,
	},
}
type Prop = {
	previews: Preview[]
	hamMenuHandler?: ()=>void
	openCurry?: (s: "open" | "close")=>()=>void
	open?: boolean
	navBar?: boolean
	setForceClose?: (b:boolean)=>void
	forceClose?: boolean
}

export default function ProjectsNavBar({ previews, hamMenuHandler, openCurry,   navBar, setForceClose, forceClose} : Prop) {
	const [loading, setLoading] = useState(true)
	
	function loaderHandler() {
		setLoading(false)
	}
	function clickHandler() {
		hamMenuHandler && hamMenuHandler()
		if (openCurry && setForceClose) {
			setForceClose(true)
			openCurry("close")()
			setTimeout(()=>setForceClose(false), 1000)
		}
	}
	
	return (
		<>{!forceClose && 
		<div 
			className={`bg-white flex z-20 flex-col w-[288px] gap-y-2  text-[#3D4048]
				     ${navBar ? 'mt-8' : ''}`}
			onMouseEnter={openCurry ? openCurry("open") : ()=>{}}
			onMouseLeave={openCurry ? openCurry("close") : ()=>{}}
		>
			{previews?.map(( preview, key : number ) => { 
				return (
					<div className="w-full group" key={key} >
						<Link onClick={clickHandler} to={`/projects/${preview.slug}`}>
							<div className="flex flex-col w-full h-20  p-0 ">
								<div className="flex flex-row h-full justify-start gap-x-4 items-center">
									<div className={`relative flex flex-col w-[200px] h-full justify-center`}>
										<img 
											src={urlFor(preview.picture?.image)?.width(200).url()}
											alt="picture"
											className={`w-full ${loading ? 'h-0' :''}`}
											onLoad={loaderHandler}
										/>
										{loading && 
											<img 
												src={urlFor(preview.picture?.image)?.width(20).url()}
												alt="picture"
												className={`w-full`}
											/>}
									</div>
									<div className="flex flex-col h-full w-full overflow-hidden
										text-ellipsis items-start justify-center">
										<h1 className="w-full font-medium group-hover:text-destructive"> {preview.navBarTitle} </h1>
											<PortableText components={components} value={preview.navBarDescription}/>
									</div>
								</div>
							</div>
						</Link>
					</div>
				)
			})}
		</div>}</>
	)
}
