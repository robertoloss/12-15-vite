import {
  defineArrayMember,
  defineField,
  defineType,
} from "@sanity-typed/types";


export const project = defineType({
  name: 'project',
  type: 'document',
	title: 'Projects',
  fields: [	
		defineField({
			name: 'preview',
			type: 'preview',
			title: 'Preview'
		}),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Project Name (eg: Case Study 01)'
    }),
		defineField({
			name: 'title',
			type: 'string',
			title: 'Project Title'
		}),
		defineField({
			name: 'rank',	
			type: 'string',
			title: 'Project Order of Appearance'
		}),
		defineField({
			name: 'description_left',
			type: 'array',
			of: [defineArrayMember({type: 'block'})],
			title: 'Description Left (Big)'
		}),
		defineField({
			name: 'description_right',
			type: 'array',
			of: [defineArrayMember({type: 'block'})],
			title: 'Description Right (Small)'
		}),
		defineField({
			name: 'wide_picture',
			type: 'picture',
			title: 'Wide Picture'
		}),
		defineField({
			name: 'three_cols_yesNo',
			type: 'boolean',
			title: 'Insert three cols section?'
		}),
		defineField({
			name: 'three_cols_proj',
			type: 'three_cols',
			title: 'Three Columns (Project)'
		}),
		defineField({
			name: 'sections',
			type: 'array',
			of: [defineArrayMember({type: 'section'})]
		})
  ]
})
