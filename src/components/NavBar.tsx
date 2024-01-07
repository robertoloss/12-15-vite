import ProjectsNavBar from "./ProjectsNavBar";
import { useRef } from "react";
import { Preview } from "@/sanity/sanity-types.ts";
import { useState } from "react";
import { Link } from "react-router-dom"
import { usePage } from "@/utils/my-store";

type Prop = {
	previews: Preview[]
}

export default function NavBar({ previews } : Prop) {
	const [open, setOpen] = useState<boolean>(false);
	const [forceClose, setForceClose] = useState(false)
	const again = useRef(false);
	const { setPageOpen } = usePage()
	
	function openHandler(status : "open" | "close") {
		if (status === "open") {
			setOpen(true)
			again.current = true
		} else {
			again.current = false 
			setTimeout(()=>{
				if (again.current === false) setOpen(false)
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
					<div className={`absolute mt-[32px] -ml-[180px] shadow-xl opacity-0 transition-{opacity}
						 w-fit overflow-hidden bg-white rounded-lg 
						${open ? 'h-fit p-4 opacity-100 border-2 border-gray-200':'h-0'}`}>
						<ProjectsNavBar 
							previews={previews}
							openCurry={openCurry}
							open={open}
							setForceClose={setForceClose}
							forceClose={forceClose}
						/>
					</div>}
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
