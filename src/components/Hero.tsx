import { PortableText, PortableTextComponents } from '@portabletext/react'
import { getWebsiteInfo } from '@/sanity/client'
import { Website } from '@/sanity/sanity-types'
import { useEffect, useState} from 'react';

const components : PortableTextComponents = {
  block: {
    normal: ({children}) => <h1 className="text-lg font-normal text-center sm:text-left leading-6">{children}</h1>,
  },
	marks: {
    em: ({children}) => <p className="text-lg font-normal text-destructive leading-6">{children}</p>,
	},
}

export default function Hero() {
	const [website, setWebsite] = useState<Website | null>(null);	
	
	useEffect(()=>{
		(async ()=>{
			const data = await getWebsiteInfo();
			setWebsite(data[0]);
		})()
	},[setWebsite])
	
	return (
		<div className="w-full min-h-[200px] flex flex-col justify-center items-center px-8 sm:px-0 pt-20 md:pt-40 pb-20">
			<div className="flex flex-col max-w-[780px] w-full justify-center items-center gap-y-4 "> 
				<h1 className="text-[24px] text-destructive font-semibold font-raleway">{website?.name}</h1>
				<h1 className="text-[32px] text-center">{website?.title}</h1>
				<div className="w-full h-0 border-t border-[B8B9BA]"/>
				{website?.description && <PortableText components={components} value={website!.description!} />}
			</div>
		</div>
	)
}
