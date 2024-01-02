import { 	useEffect, useState } from 'react'
import { Preview } from '../sanity/sanity-types'
import Hero from '@/components/Hero'
import PreviewCard from '@/components/PreviewCard'
import { getPreviews } from '@/sanity/client'

function Home() {
	const [previews, setPreviews] = useState<Preview[] | null>(null)

	useEffect(() => {
    (async () => {
        const data = await getPreviews();
				const onlyPreviews : Preview[] = data.map((obj : {preview: Preview}) => obj.preview)
        setPreviews(onlyPreviews);
    })();
  }, [setPreviews]);


	return (
		<div className="flex flex-col relative sm:px-8 pb-20 items-center min-h-[100vh]">
			<Hero/>
			<div className="flex flex-col items-center gap-y-10 mb-[160px]">
			{previews?.map(( preview: Preview, index: number ) =>
				<PreviewCard key={index} preview={preview}/>
			)}
			</div>
		</div>
	)
}

export default Home
