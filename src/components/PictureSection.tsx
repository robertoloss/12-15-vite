import { urlFor } from "@/sanity/client"
import useMediaQuery from "@/utils/useMediaQuery"
import { Picture, PictureSectionType } from "@/sanity/sanity-types"


type Props = {
	pictureSection : PictureSectionType
}

export default function PictureSection({ pictureSection } : Props) {
	
	const width = pictureSection.extra_wide ? 1000 : 960
	const bgColor = pictureSection.background_blue ? 'bg-bigpic' : 'bg-background'

	const screen = useMediaQuery()
	//console.log("screen: ", screen)
	//console.log("Height = ", height)

	return (
		<div className={`flex flex-col w-[calc(100%+64px)] ${bgColor} h-fit py-8 sm:py-20 px-8 gap-y-4 items-center`}	>
			<div className={`flex flex-col w-full h-fit gap-y-8`} style = {{ maxWidth:`${width}px`}}>
					<div className={`flex justify-between  gap-x-8 gap-y-8 h-fit`}
						style={{ flexDirection: `${screen < 640 ? 'column' : 'row'}` }}
					>
						{pictureSection?.pictures?.map((picture: Picture , key: number) => 
								<div className={ `flex flex-col relative w-full h-fit` } key={key}>
										<img src={urlFor(picture.image!)?.width(2400).url()} alt=""/>
								</div>
						)}	
					</div>
					<h1 className="text-background text-base w-fit font-normal ">{pictureSection.description}</h1>
			</div>
		</div>
	)
}
