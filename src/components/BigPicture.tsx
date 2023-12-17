
type Props = {
	imgUrl : string
}


export default function BigPicture({ imgUrl } : Props ) {
	
	return (
		<div className="flex flex-col w-[calc(100%+64px)] h-fit bg-bigpic py-10 px-4 mx-[-16px] items-center">
			<div className="relative flex flex-col w-full max-w-[1096px] items-center"> 
				<img src={imgUrl} alt="picture" className="w-full"/>	
			</div>
		</div>
	)
}




//h-[200px]
//sm:h-[280px]
//md:h-[320px]
//lg:h-[400px]
//xl:h-[584px]


