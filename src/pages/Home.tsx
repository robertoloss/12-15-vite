import { 	useEffect, useState } from 'react'
import { Preview } from '../sanity/sanity-types'
import Hero from '@/components/Hero'
import PreviewCard from '@/components/PreviewCard'
import { getPreviews } from '@/sanity/client'

function Home() {
	const [previews, setPreviews] = useState<Preview[] | null>(null)
	//const [show, setShow] =useState(false)

	useEffect(() => {
    (async () => {
        const data = await getPreviews();
				const onlyPreviews : Preview[] = data.map((obj : {preview: Preview}) => obj.preview)
        setPreviews(onlyPreviews);
    })();
  }, [setPreviews]);

	//function showHandler() {
	//	setShow(prev => !prev)
	//}

	return (
		<div className="flex flex-col relative sm:px-8 pb-20 items-center">
			<Hero/>
			{/*<button onClick={showHandler}> Show </button>
			{show && <h1 className="-left-8 animate-enter-from-left"> Hello </h1> }*/}
			<div className="flex flex-col items-center gap-y-10">{previews?.map(( preview: Preview, index: number ) =>
						<PreviewCard key={index} preview={preview}/>
				)}
			</div>
		</div>
	)
}

export default Home
