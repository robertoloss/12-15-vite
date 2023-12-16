import HeaderBar from "@/components/HeaderBar";
import { Outlet } from "react-router-dom";




export default function Root() {

	return (
		<>
			<HeaderBar/>
			<Outlet/>
		</>
	)
}
