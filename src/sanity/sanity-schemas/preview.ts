import {
  defineArrayMember,
  defineField,
  defineType,
} from "@sanity-typed/types";

export const preview = defineType({
	name: 'preview',
	type: 'document',
	title: 'Preview',
	fields: [
		defineField({
			name: 'slug',
			type: 'string',
			title: 'Project Slug'
		}),
		defineField({
			name: 'picture',
			type: 'picture',
			title: 'Picture'
		}),
		defineField({
			name: 'title',
			type: 'string',
			title: 'Title'
		}),
		defineField({
			name: 'description',
			type: 'array',
			of: [defineArrayMember({type: 'block'})],
			title: 'Description',
			validation: Rule => Rule.required()
		}),
		defineField({
			name: 'navBarDescription',
			type: 'array',
			of: [defineArrayMember({type: 'block'})],
			title: 'NavBar Description',
			validation: Rule => Rule.required().max(60)
		})
	]
})
