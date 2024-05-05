import ProjectsNavBar from "./ProjectsNavBar";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { Preview } from "@/sanity/sanity-types.ts";
import { useState } from "react";
import { Link } from "react-router-dom"
import { usePage } from "@/utils/my-store";
import { motion, AnimatePresence } from "framer-motion";

type Prop = {
	previews: Preview[]
}

export default function NavBar({ previews } : Prop) {
	const [open, setOpen] = useState<boolean>(false);
	const [forceClose, setForceClose] = useState(false)
	const [workHover, setWorkHover] = useState(false);
	const again = useRef(false);
	const { setPageOpen } = usePage()
	
	function openHandler(status : "open" | "close") {
		if (status === "open") {
			setOpen(true)
			again.current = true
			setWorkHover(true)
		} else {
			again.current = false
			setTimeout(()=>{
				if (again.current === false) {
					setOpen(false)
					setWorkHover(false)
				}
			}, 200)
		}
	}
	function openCurry(status: "open" | "close") {
		return () => openHandler(status)
	}

	const location = useLocation().pathname.split('/').slice(-1)[0]

	return (
		<div className="flex flex-row space-x-8 w-fit text-lg font-medium items-center">
			<div className="flex flex-col">
				<div 
					className={`w-fit cursor-pointer z-10 hover:text-destructive transition`}
					onMouseEnter={openCurry("open")}
					onMouseLeave={openCurry(("close"))}
				>
					Work
				</div >
					{!forceClose &&
						<AnimatePresence> {open &&
							<motion.div 
								className={`absolute grid mt-[32px] -ml-[56px] shadow-xl p-4
										 w-fit overflow-hidden bg-muted rounded-lg h-fit`}
								initial={{opacity: 0,  scale: .9 }}
								animate={{opacity: 1,  scale: 1 }}
								exit={{opacity: 0, scale: .9 }}
								
							>
								<ProjectsNavBar 
									previews={previews}
									openCurry={openCurry}
									open={open}
									setForceClose={setForceClose}
									forceClose={forceClose}
									workHover={workHover}
								/>
							</motion.div>}
						</AnimatePresence>
					}
			</div>
			<Link to={'/about'}  className="flex relative w-fit">
				<div className="w-fit hover:text-destructive transition" onClick={()=>setPageOpen(false,'about',location)}>
					About
				</div>
			</Link>
			<Link to={'/contact'}  className="w-fit ">
				<div className="w-fit hover:text-destructive transition" onClick={()=>setPageOpen(false,'contact',location)}>
					Contact
				</div>
			</Link>
			{/* <ThemeToggle/> */}
		</div>
	)
}
