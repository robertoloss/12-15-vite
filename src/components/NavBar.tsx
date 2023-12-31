import ProjectsNavBar from "./ProjectsNavBar";
//import ThemeToggle from "./ThemeToggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  //NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../components/ui/navigation-menu.tsx'
//import { ThemeToggle } from "./ThemeToggle.tsx";
import { Preview } from "@/sanity/sanity-types.ts";
import { useState } from "react";
import { Link } from "react-router-dom"


type Prop = {
	previews: Preview[]
}

export default function NavBar({ previews } : Prop) {
	const [open, setOpen] = useState<boolean | undefined>(true);
	function openHandler() {
		setOpen(false);
		setTimeout(()=>{
			setOpen(true)
		},500)
		console.log("open = ", open)
	}

	return (<div className="flex flex-row bg-background space-x-8 w-fit items-center">
		<NavigationMenu>
			<NavigationMenuList>

				<NavigationMenuItem>
					<NavigationMenuTrigger className="text-lg">About</NavigationMenuTrigger>
					<NavigationMenuContent onClick={openHandler}>
						{open && <div className="w-[320px] p-4" >
							<Link to={'/about'}  className="self-start w-fit text-2xl mt-10 font-normal">
								<div className="w-full p-2 text-xl hover:bg-gray-100">
									About
								</div>
							</Link>
						</div>}
					</NavigationMenuContent>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger  className="text-lg">Work</NavigationMenuTrigger>
					<NavigationMenuContent onClick={openHandler}  >
						{open && <ProjectsNavBar previews={previews} /> }	
					</NavigationMenuContent>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger className="text-lg">Contact</NavigationMenuTrigger>
					<NavigationMenuContent onClick={openHandler}>
						{open && <div className="w-[320px] p-4" >
							<Link to={'/contact'}  className="self-start w-fit text-2xl mt-10 font-normal">
								<div className="w-full p-2 text-xl hover:bg-gray-100">
									Contact
								</div>
							</Link>
						</div>}
					</NavigationMenuContent>
				</NavigationMenuItem>


			</NavigationMenuList>
		</NavigationMenu>
		{/* <ThemeToggle/> */}
	</div>)
}






//<div
//			className="flex flex-row bg-background space-x-8 items-center"
//		>
//			<Link href={"/about"} className="text-lg font-semibold">
//				About
//			</Link>
//			<WorkButton/>		
//			<Link href={"/contact"} className="text-lg font-semibold">
//				Contact
//			</Link>
//			<ThemeToggle/>
//		</div>
