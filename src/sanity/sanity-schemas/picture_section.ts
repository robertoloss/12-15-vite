import {
  defineArrayMember,
  defineField,
  defineType,
} from "@sanity-typed/types";

export const picture_section = defineType({
	name: 'picture_section',
	type: 'document',
	title: 'Picture Section',
	fields: [
		defineField({
			name: 'description',
			type: 'string',
			title: 'Description'
		}),
		defineField({
			name: 'background_blue',
			type: 'boolean',
			title: 'Background blue? (if not: bg red)'
		}),
		defineField({
			name: 'extra_wide',
			type: 'boolean',
			title: 'Extra wide?'
		}),
		defineField({
			name: 'height',
			type: 'number',
			title: 'Height in pixels'
		}),
		defineField({
			name: 'pictures',
			type: 'array',
			of: [defineArrayMember({type: 'picture'})]
		})
	]
})
