import { IoCloseOutline } from "react-icons/io5";
import ProjectsNavBar from "./ProjectsNavBar";
import { Preview } from "@/sanity/sanity-types";
import { Link } from "react-router-dom";


type Props = {
	previews: Preview[] 
	hamMenuHandler: ()=>void
}


export default function NavDrawer({ hamMenuHandler, previews } : Props) {
 
	return (
		<div className="absolute top-0 left-0 w-screen h-screen bg-background p-4 ">
			<div className="flex flex-col gap-y-10 w-full h-full">
				<div className="flex flex-row h-fit w-full mt-1 justify-between items-center" onClick={hamMenuHandler}>
					<Link to={'/'} className="w-fit text-2xl font-semibold">
						Amy N Jackson
					</Link>
					<div className="w-fit -mr-1">
						<IoCloseOutline size='40px'/>
					</div>
				</div>
				<div className="flex flex-col items-center  w-fit">
					<h1 className="self-start text-xl font-normal">Work</h1>
					<ProjectsNavBar hamMenuHandler={hamMenuHandler} previews={previews} />
					<Link to={'/'} onClick={hamMenuHandler} className="self-start text-xl font-normal">
						About
					</Link>
					<Link to={'/'} onClick={hamMenuHandler} className="self-start text-xl font-normal">
						Contact
					</Link>
				</div>
			</div>
		</div>
	)
}
