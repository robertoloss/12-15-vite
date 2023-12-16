import {
  defineArrayMember,
  defineField,
  defineType,
} from "@sanity-typed/types";


export const three_cols = defineType({
	name: 'three_cols',
	type: 'document',
	title: 'Three Columns',
	fields: [
		defineField({
			name: 'are_there_icons',
			type: 'boolean',
			title: 'Icons (= not numbers)?'
		}),
		defineField({
			name: 'icons',
			type: 'array',
			of: [defineArrayMember({type: 'picture'})], 
			title: 'Icons'
		}),
		defineField({
			name: 'figures',
			type: 'array',
			of: [defineArrayMember({type: 'string'})],
			title: 'Figures'
		}),
		defineField({
			name: 'columns_titles',
			type: 'array',
			of: [defineArrayMember({type: 'string'})],
			title: 'Column Titles'
		}),
		defineField({
			name: 'columns_text_1',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'block',
					marks: {
						decorators: [
							{title: 'Strong', value: 'strong'},
							{title: 'Emphasis', value: 'em'},
							{title: 'Code', value: 'code'}
						]
					}
				})
			],
			title: 'Column 1 Text'
		}),
		defineField({
			name: 'columns_text_2',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'block',
					marks: {
						decorators: [
							{title: 'Strong', value: 'strong'},
							{title: 'Emphasis', value: 'em'},
							{title: 'Code', value: 'code'}
						]
					}
				})
			],
			title: 'Column 2 Text'
		}),
		defineField({
			name: 'columns_text_3',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'block',
					marks: {
						decorators: [
							{title: 'Strong', value: 'strong'},
							{title: 'Emphasis', value: 'em'},
							{title: 'Code', value: 'code'}
						]
					}
				})
			],
			title: 'Column 3 Text'
		})
	]
})
		
