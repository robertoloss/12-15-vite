import { urlFor } from "@/sanity/client"
import useMediaQuery from "@/utils/useMediaQuery"
import { Picture, PictureSectionType } from "@/sanity/sanity-types"


type Props = {
	pictureSection : PictureSectionType
	index : number
	len : number
	thisBlueNextWhite : boolean
}

export default function PictureSection({ pictureSection , index, len, thisBlueNextWhite} : Props) {
	
	const width = pictureSection.extra_wide ? 1000 : 960
	const bgColor = pictureSection.background_blue ? 'bg-bigpic' : 'bg-background'

	const screen = useMediaQuery()
	console.log("len = ", len)

	return (
		<div className={`flex flex-col w-[calc(100%+64px)] ${bgColor} 
			h-fit  ${index === 0 ? 'pt-20' : 'pt-14 '} ${thisBlueNextWhite ? 'pb-20' : ''}  ${index === len-1 ? 'pb-20' : ''} ${len} px-8 gap-y-4 items-center`}	>
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
				{pictureSection.description && 
					<h1 className="text-background text-base w-fit font-normal ">
						{pictureSection.description}
					</h1>
				}
			</div>
		</div>
	)
}
