import { 	useEffect, useState } from 'react'
import { Project } from '../sanity/sanity-types'
import { client } from '../sanity/client'

function Home() {
  const [count, setCount] = useState(0)
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
     
      <h1>Vite + React</h1>
			{projects && projects.map((project: Project, key: number) => 
				<h1 key={key}>{project.title}</h1>
			)}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p >
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Home
