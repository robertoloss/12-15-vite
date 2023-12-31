import {
  defineArrayMember,
  defineField,
  defineType,
} from "@sanity-typed/types";

export const website = defineType({
	name: 'website',
	type: 'document',
	title: 'Website',
	fields: [
		defineField({
			name: 'name',
			type: 'string',
			title: 'Your Name'
		}),
		defineField({
			name: 'title',
			type: 'string',
			title: 'Title',
		}),
		defineField({
			name: 'description',
			type: 'array',
			of: [defineArrayMember({type: 'block'})],
			title: 'Description'
		}),
		defineField({
			name: 'about_description',
			type: 'array',
			of: [defineArrayMember({type: 'block'})],
			title: 'ABOUT: Description'
		}),
		defineField({
			name: 'about_expertise',
			type: 'array',
			of: [defineArrayMember({type: 'block'})],
			title: 'ABOUT: Expertise'
		}),
		defineField({
			name: 'about_picture',
			type: 'picture',
			title: 'ABOUT: Picture'
		}),
	]
})
