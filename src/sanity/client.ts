//import {defineConfig} from 'sanity'
import {createClient} from '@sanity/client'


//export default defineConfig({
//  name: 'default',
//  title: 'Amy Jackson Portfolio',
//
//  projectId: 'qyyz7qna',
//  dataset: 'production',
//})


export const client = createClient({
  projectId: 'qyyz7qna',
  dataset: 'production',
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})
