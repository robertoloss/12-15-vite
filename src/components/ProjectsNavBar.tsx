//import { NavigationMenuLink } from "@radix-ui/react-navigation-menu" 
import { PortableTextComponents, PortableText } from "@portabletext/react"
import { Link,useLocation } from "react-router-dom"
import { Preview } from "@/sanity/sanity-types"
import { urlFor } from "@/sanity/client"
import { useState } from "react"
import { usePage } from "@/utils/my-store"

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
	hamMenuCurry?: (s:string | undefined)=>()=>void
	openCurry?: (s: "open" | "close")=>()=>void
	open?: boolean
	navBar?: boolean
	setForceClose?: (b:boolean)=>void
	forceClose?: boolean
	workHover?: boolean
	setNavDrawer?: (b:boolean)=>void
}


export default function ProjectsNavBar({	previews, 
																					//hamMenuCurry, 
																					setNavDrawer,
																					openCurry,   
																					navBar, 
																					setForceClose, 
																					forceClose,
																					workHover } : Prop) {
	const [loading, setLoading] = useState(true)
	const { setPageOpen } = usePage()
	
	const location = useLocation().pathname.split('/').slice(-1)[0]

	function loaderHandler() {
		setLoading(false)
	}
	function clickHandler(slug:string | undefined) {
		setPageOpen(false, slug, location)
		setNavDrawer && setNavDrawer(false)
		//hamMenuCurry && hamMenuCurry(slug)
		if (openCurry && setForceClose) {
			setForceClose(true)
			openCurry("close")()
			setTimeout(()=>setForceClose(false), 1000)
		}
	}
	function clickHandlerCurry(slug: string | undefined) {
		return () => {
			clickHandler(slug)
		}
	}

	
	return (
		<>{!forceClose && 
		<div 
			className={`flex z-20 flex-col w-[288px] gap-y-2  text-[#3D4048] transition-[scale()]
				     ${navBar ? 'mt-8' : ''}
						 ${workHover ? 'scale-100' : 'scale-90' }`}
			onMouseEnter={openCurry ? openCurry("open") : ()=>{}}
			onMouseLeave={openCurry ? openCurry("close") : ()=>{}}
		>
			{previews?.map(( preview, key : number ) => { 
				return (
					<div 
						className={`w-full group `} 
						key={key}
					>
						<Link onClick={clickHandlerCurry(preview.slug)} to={`/projects/${preview.slug}`}>
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
										<h1 className="w-full font-medium group-hover:text-destructive">
											{preview.navBarTitle} 
										</h1>
											<PortableText
												components={components}
												value={preview.navBarDescription}
											/>
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
