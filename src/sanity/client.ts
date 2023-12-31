import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { Picture } from './sanity-types'


export const client = createClient({
  projectId: 'qyyz7qna',
  dataset: 'production',
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})


const builder = imageUrlBuilder(client) 
export function urlFor(source: Picture["image"] | undefined) {
	if (source) {
			return builder.image(source)
	}
} 

export async function getWebsiteInfo() {
  return await client.fetch(
    `*[_type == "website"]`,
  )
}

export async function getPreviews() {
	return await client.fetch(
		`*[_type == "project"] | order(rank asc) { preview }`
	)
}

export async function getProject(slug:string) {
	return await client.fetch(
		`*[_type == "project" && preview.slug == "${slug}"]`
	)
}

