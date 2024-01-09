import Footer from "@/components/Footer";
import preloadImage from "@/utils/preloadImage";
import HeaderBar from "@/components/HeaderBar";
import { Preview } from "@/sanity/sanity-types";
import { Outlet } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { urlFor } from "@/sanity/client";

export default function Root() {
	const previews = useLoaderData() as Preview[]
	for (const preview of previews) {
		if (urlFor(preview.picture?.image)?.width(200).url()) {
			preloadImage(urlFor(preview.picture!.image)!.width(200).url())
		}
	}

	return (
		<>
			<HeaderBar previews={previews}/>
			<Outlet/>
			<Footer/>
		</>
	)
}
