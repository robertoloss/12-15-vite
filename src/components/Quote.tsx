import { PortableText } from "@portabletext/react"
import { PortableTextComponents } from "@portabletext/react"
import { QuoteType } from "@/sanity/sanity-types"

const components : PortableTextComponents = {
  block: {
    normal: ({children}) => <h1 className="text-lg text-background font-light leading-6">{children}</h1>,
  },
}

type Props = {
	quote: QuoteType 
	author: string
}

export default function Quote({quote, author} : Props ) {

	return (
		<div className="bg-bigpic flex flex-col w-[calc(100%+64px)] py-20 px-8 items-center ">
			<div className="flex flex-col w-full max-w-[640px] gap-y-8">
				<PortableText components={components} value={quote.quote!} />
				<h1 className="text-background font-light text-lg">{author}</h1>
			</div>
		</div>
	)
}
