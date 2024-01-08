import ProjectsNavBar from "./ProjectsNavBar";
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
		return function handler() {
			openHandler(status)
		}
	}

	return (
		<div className="flex flex-row space-x-8 w-fit text-lg font-medium items-center">
			<div className="flex flex-col">
				<div 
					className={`w-fit cursor-pointer z-10 hover:text-destructive`}
					onMouseEnter={openCurry("open")}
					onMouseLeave={openCurry(("close"))}
				>
					Work
				</div >
					{!forceClose &&
						<AnimatePresence> {open &&
							<motion.div 
								className={`absolute grid mt-[32px] -ml-[180px] shadow-xl p-4
										 w-fit overflow-hidden bg-white rounded-lg border-gray-200 border-2 h-fit`}
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
				<div className="w-fit hover:text-destructive" onClick={()=>setPageOpen(false)}>
					About
				</div>
			</Link>
			<Link to={'/contact'}  className="w-fit ">
				<div className="w-fit hover:text-destructive" onClick={()=>setPageOpen(false)}>
					Contact
				</div>
			</Link>
			{/* <ThemeToggle/> */}
		</div>
	)
}
