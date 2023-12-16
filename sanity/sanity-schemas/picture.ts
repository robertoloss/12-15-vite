import {
  // defineArrayMember,
  defineField,
  defineType,
} from "@sanity-typed/types";


export const picture = defineType({
  name: 'picture',
  type: 'document',
	title: 'Picture',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name'
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true // <-- Defaults to false
      }
    }),
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alt',
    }),
  ]
})
