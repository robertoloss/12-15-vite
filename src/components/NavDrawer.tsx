import { IoCloseOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import ProjectsNavBar from "./ProjectsNavBar";
import { Preview } from "@/sanity/sanity-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronDown } from "lucide-react";


type Props = {
	previews: Preview[] 
	hamMenuCurry: (s:string | undefined)=>(()=>void)
	setNavDrawer: (b:boolean)=>void
	setPageOpen: (b:boolean)=>void
}

export default function NavDrawer({ hamMenuCurry, previews, setNavDrawer, setPageOpen } : Props) {
	const [show, setShow] = useState<boolean>(false)
	function showHandler() {
		setShow(prev => !prev)
	}
 
	return (
		<motion.div 
			initial={{opacity: 0, x: -16}}
			animate={{opacity: 1, x: 0}}
			transition={{duration: .3, ease: "easeOut"}}
			className="absolute top-0 left-0 w-screen h-screen bg-background p-4 "
		>
			<div className="flex flex-col gap-y-10 w-full h-full">
				<div className="flex flex-row h-fit w-full mt-1 justify-between items-center" >
					<Link to={'/'}  className="w-fit text-2xl font-semibold select-none" >
						Amy Jackson
					</Link>
					<div className="w-fit -mr-1" onClick={()=>{setNavDrawer(false); setPageOpen(true)}}>
						<IoCloseOutline size='40px'/>
					</div>
				</div>
				<div className="flex flex-col items-center w-full select-none">
					<div className="flex flex-row gap-x-4 w-full items-center justify-start"
						onClick={showHandler}
					>
						<h1 className={`self-start text-2xl font-normal`}
						>
							Work
						</h1>
						<ChevronDown size={32} strokeWidth={1}
							style={{
								transform: `${show ? 'rotate(180deg)' : 'rotate(0deg)'}`,
								transition: 'all 200ms ease-in-out'
							}}
						/>
					</div>
					<div 
						style = {{  
							display: 'grid', 
							gridTemplateRows: `${show ? '1fr' : '0fr'}`,
							transition: 'grid-template-rows 0.3s ease-out', 
						}}
					>
						<div className="overflow-hidden" >
							<ProjectsNavBar 
								hamMenuCurry={hamMenuCurry} 
								setNavDrawer={setNavDrawer} 
								previews={previews} 
								open={true} 
								navBar={true}
								mobileDrawer={true}
							/>
						</div>	
					</div>
					<Link to={'/about'} onClick={hamMenuCurry('about')} 
						className="self-start select-none w-full text-2xl mt-10 font-normal"
					>
						About
					</Link>
					<Link to={'/contact'} onClick={hamMenuCurry('contact')} 
						className="self-start text-2xl w-full mt-10 font-normal"
					>
						Contact
					</Link>
				</div>
			</div>
		</motion.div>
	)
}
