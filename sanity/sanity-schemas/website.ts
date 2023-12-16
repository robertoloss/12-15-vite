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
		})
	]
})
