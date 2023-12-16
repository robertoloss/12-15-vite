import {
  defineArrayMember,
  defineField,
  defineType,
} from "@sanity-typed/types";

export const quote = defineType({
	name: 'quote',
	type: 'document',
	title: 'Quote',
	fields: [
		defineField({
			type: 'string',
			name: 'author',
			title: 'Author'
		}),
		defineField({
			name: 'quote',
			title: 'Quote',
			type: 'array',
			of: [defineArrayMember({type: 'block' })]
		})
	]
})
