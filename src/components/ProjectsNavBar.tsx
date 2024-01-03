//import { NavigationMenuLink } from "@radix-ui/react-navigation-menu" 
import { PortableTextComponents, PortableText } from "@portabletext/react"
import { Link } from "react-router-dom"
import { Preview } from "@/sanity/sanity-types"
import { urlFor } from "@/sanity/client"

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
}

export default function ProjectsNavBar({ previews, hamMenuHandler } : Prop) {

	return (
		<div className="flex flex-col w-[320px] p-4 gap-y-2 text-[#3D4048]" >
			{previews?.map(( preview, key : number ) => { 
				return (
					<div className="w-full" key={key}>
						<Link onClick={hamMenuHandler} to={`/projects/${preview.slug}`}>
								<div className="flex flex-col w-full h-20 hover:bg-accent p-0 ">
									<div className="flex flex-row h-full justify-start gap-x-4 items-center">
										<div className={`relative flex flex-col w-[200px] bg-gray-100 
											${!preview ? "animate-fast-pulse" : ""} h-full justify-center`}>
											{preview.picture && <img src={urlFor(preview.picture.image)?.width(200).url()} alt="picture"/>}
										</div>
										<div className="flex flex-col h-full w-full overflow-hidden text-ellipsis items-start justify-center">
											<h1 className="w-full font-bold"> {preview.navBarTitle} </h1>
												<PortableText components={components} value={preview.navBarDescription}/>
										</div>
									</div>
								</div>
						</Link>
					</div>
				)
			})}
		</div>
	)
}
