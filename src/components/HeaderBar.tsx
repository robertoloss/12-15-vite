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
	const [_shadow, setShadow] = useState<boolean>(false)
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
		<div className={`top-0 sticky z-50 flex flex-col select-none text-foreground 
		items-center h-20 w-full bg-background`}
			style={{
				//borderBottom: `${shadow ? "solid  white" : ''}`,
				//transition: 'all 0.5s '
			}}
		>
			<div className="flex flex-row select-none h-full w-full max-w-7xl justify-between items-center  p-4" >
				{!navDrawer && <Link to={'/'}
					className="w-fit text-2xl font-raleway select-none font-light text-destructive"
				>
					<div className={`
							flex flex-row bg-destructive text-background text-2xl
							font-extrabold p-4 rounded-sm w-[52px] h-[52px] items-center justify-center
							transition
						`}
						onClick={()=>setPageOpen(false,'',location)}
					>
						AJ
					</div>
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
