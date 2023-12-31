import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { RxHamburgerMenu } from "react-icons/rx";
import NavDrawer from "./NavDrawer";
import { Preview } from "@/sanity/sanity-types";
import { Link, useLocation } from "react-router-dom";
import { usePage } from "@/utils/my-store";
//import { AnimatePresence, motion } from "framer-motion";

type Props = {
	previews: Preview[]
}

export default function HeaderBar({ previews } : Props) {
	const [shadow, setShadow] = useState<boolean>(false)
	const [navDrawer, setNavDrawer] = useState<boolean>(false)
	const { setPageOpen } = usePage()

	useEffect(()=>{
    const scroll = () => {
      if (window.scrollY > 20) setShadow(true)
			else setShadow(false)
    }
    window.addEventListener("scroll", scroll, false);
    return  () => window.removeEventListener("scroll", scroll, false);
  },[])

	const location = useLocation().pathname
																.split('/')
																.slice(-1)[0]

	function hamMenuHandler(slug: string | undefined) {
		setPageOpen(false, slug, location)
		setNavDrawer(prev => !prev)
	}
	function hamMenuCurry(slug:string | undefined) {
		return ()=>	hamMenuHandler(slug)
	}

	
	return (
		<div className={`top-0 sticky z-50 flex flex-col select-none 
		items-center h-20 w-full ${shadow ? 'bg-white' : 'bg-background'}`}
			style={{
			boxShadow: `${shadow ? "0px 2px 2px rgb(130,130,130,0.2)" : ''}`,
				transition: 'all 0.5s '
			}}
		>
			<div className="flex flex-row select-none h-full w-full max-w-7xl justify-between items-center  p-4" >
				{!navDrawer && <Link to={'/'}
					className="w-fit text-2xl font-raleway select-none font-light text-destructive"
					onClick={()=>setPageOpen(false,'',location)}
				>
					Amy Jackson 
				</Link>}
				<div className="hidden md:block">
					<NavBar previews={previews!}/>
				</div>
				<div className="block md:hidden" onClick={()=>{setPageOpen(false); setNavDrawer(p=>!p)}}>
					{!navDrawer && <RxHamburgerMenu size='32px'/>}
				</div>
					{navDrawer && 
						<NavDrawer 
							previews={previews!} 
							setNavDrawer={setNavDrawer} 
							setPageOpen={setPageOpen} 
							hamMenuCurry={hamMenuCurry}
						/> 
					}
			</div>
		</div>
	)
}
