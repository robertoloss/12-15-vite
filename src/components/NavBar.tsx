import ProjectsNavBar from "./ProjectsNavBar";
//import ThemeToggle from "./ThemeToggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../components/ui/navigation-menu.tsx'
import { ThemeToggle } from "./ThemeToggle.tsx";
import { Preview } from "@/sanity/sanity-types.ts";

type Prop = {
	previews: Preview[]
}

export default function NavBar({ previews } : Prop) {

	return (<div className="flex flex-row bg-background space-x-8 w-fit items-center">
		<NavigationMenu>
			<NavigationMenuList>

				<NavigationMenuItem>
					<NavigationMenuTrigger className="text-lg">About</NavigationMenuTrigger>
					<NavigationMenuContent >
						<div className="w-[320px] p-4" >
						<NavigationMenuLink >Link</NavigationMenuLink>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger className="text-lg">Work</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ProjectsNavBar previews={previews} />	
					</NavigationMenuContent>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger className="text-lg">Contact</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div className="w-[320px] p-4" >
						<NavigationMenuLink >Link</NavigationMenuLink>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>


			</NavigationMenuList>
		</NavigationMenu>
		<ThemeToggle/>
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
