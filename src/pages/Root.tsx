import Footer from "@/components/Footer";
import HeaderBar from "@/components/HeaderBar";
import { Preview } from "@/sanity/sanity-types";
import { Outlet } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

export default function Root() {
	const previews = useLoaderData() as Preview[]

	return (
		<>
			<HeaderBar previews={previews}/>
			<Outlet/>
			<Footer/>
		</>
	)
}
