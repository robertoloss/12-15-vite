import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { RxHamburgerMenu } from "react-icons/rx";
import NavDrawer from "./NavDrawer";
import { getPreviews } from "@/sanity/client";
import { Preview } from "@/sanity/sanity-types";
import { Link } from "react-router-dom";

export default function HeaderBar() {
	const [shadow, setShadow] = useState<boolean>(false)
	const [navDrawer, setNavDrawer] = useState<boolean>(false)
	const [previews, setPreviews] = useState<Preview[] | null>(null)

	useEffect(()=>{
    const scroll = () => {
      if (window.scrollY > 20) setShadow(true)
			else setShadow(false)
    }
    window.addEventListener("scroll", scroll, false);
    return  () => window.removeEventListener("scroll", scroll, false);
  },[])

	function hamMenuHandler() {
		setNavDrawer(prev => !prev)
	}

	useEffect(() => {
    (async () => {
        const data = await getPreviews();
				const onlyPreviews : Preview[] = data.map((obj : {preview: Preview}) => obj.preview)
        setPreviews(onlyPreviews);
    })();
  }, [setPreviews]);

	console.log(previews)
	
	return (
		<div className="top-0 sticky z-50 flex flex-col items-center h-20 w-full bg-background"
			style={{
			boxShadow: `${shadow ? "0px 2px 2px rgb(130,130,130,0.2)" : ''}`,
				transition: 'all 0.5s '
			}}
		>
			<div className="flex flex-row h-full w-full max-w-7xl justify-between items-center text-foreground p-4" >
				<Link to={'/'}
					className="w-fit text-2xl font-semibold"
				>
					Amy N Jackson
				</Link>
				<div className="hidden md:block"><NavBar previews={previews}/></div>
				<div className="block md:hidden" onClick={hamMenuHandler}><RxHamburgerMenu size='32px'/></div>
				{navDrawer && <NavDrawer previews={previews} hamMenuHandler={hamMenuHandler}/> }
			</div>
		</div>
	)
}
