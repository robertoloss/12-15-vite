import {
  defineArrayMember,
  defineField,
  defineType,
} from "@sanity-typed/types";


export const section = defineType({
	name: 'section',
	type: 'document',
	title: 'Section',
	fields: [
		defineField({
			title: 'Project',
      name: 'project',
      type: 'reference',
      to: [{type: 'project' as const}] 
    }),
		defineField({
			title: 'Section Number',
			name: 'section_number',
			type: 'number'
		}),
		defineField({
			title: 'Section Title',
			name: 'section_title',
			type: 'string'
		}),
		defineField({
			title: 'Section Content',
			name: 'section_content',
			type: 'array',
			of: [defineArrayMember({type: 'block'})]
		}),
		defineField({
			name: 'three_cols_yesNo',
			type: 'boolean',
			title: 'Three Columns?'
		}),
		defineField({
			name: 'three_cols_in_section',
			type: 'three_cols',
			title: 'Three Columns',
		}),
		defineField({
			name: 'quote',
			type: 'quote',
			title: 'Quote'
		}),
		defineField({
			name: 'picture_sections',
			type: 'array',
			of: [defineArrayMember({type: 'picture_section'})]
		})
	]
})
