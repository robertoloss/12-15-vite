import { IoCloseOutline } from "react-icons/io5";
import ProjectsNavBar from "./ProjectsNavBar";
import { Preview } from "@/sanity/sanity-types";
import { Link } from "react-router-dom";
import { useState } from "react";


type Props = {
	previews: Preview[] 
	hamMenuHandler: ()=>void
}

export default function NavDrawer({ hamMenuHandler, previews } : Props) {
	const [show, setShow] = useState<boolean>(false)
	function showHandler() {
		setShow(prev => !prev)
	}
 
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
				<div className="flex flex-col items-center w-full ">
					<h1 className="self-start text-2xl font-normal w-full"
						onClick={showHandler}
					>
						Work
					</h1>
					<div 
						style = {{  
							display: 'grid', 
							gridTemplateRows: `${show ? '1fr' : '0fr'}`,
							transition: 'grid-template-rows 0.3s ease-out', 
						}}
					>
						<div className="overflow-hidden">
							<ProjectsNavBar hamMenuHandler={hamMenuHandler} previews={previews} />
						</div>	
					</div>
					<Link to={'/about'} onClick={hamMenuHandler} className="self-start w-full text-2xl mt-10 font-normal">
						About
					</Link>
					<Link to={'/contact'} onClick={hamMenuHandler} className="self-start text-2xl w-full mt-10 font-normal">
						Contact
					</Link>
				</div>
			</div>
		</div>
	)
}
