import { 	useEffect, useState } from 'react'
import { Project } from '../sanity/sanity-types'
import { client } from '../sanity/client'

function Home() {
	const [projects, setProjects] = useState<Project[] | null>(null)

	useEffect(()=>{
		async function getProjects() {
			const data = await client.fetch(`
				*[_type == "project"]
			`)
			setProjects(data);
		}
		getProjects()

	},[setProjects])

	projects && console.log(projects)

  return (
    <>
			{projects && projects.map((project: Project, key: number) => 
				<h1 key={key}>{project.title}</h1>
			)}
    </>
  )
}

export default Home
