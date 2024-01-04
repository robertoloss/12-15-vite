import { ThemeProvider } from './components/ThemeProvider'
import { RouteObject } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
//import Error from './pages/Error'
import Home from './pages/Home'
import Root from './pages/Root'
import About from './pages/About'
import Project from './pages/Project'
//import { Outlet } from 'react-router-dom'
import Contact from './pages/Contact'
import { getProject } from './sanity/client'
import { getPreviews } from './sanity/client'
import { Preview } from './sanity/sanity-types'
import { getWebsiteInfo } from './sanity/client'

const routerArray = [
  { 
    path: '/',
    element: <Root/>,
    //errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Home />,
				loader: async () => {
					const data = await getPreviews();
					const onlyPreviews : Preview[] = data.map((obj : {preview: Preview}) => obj.preview)
					const dataW = await getWebsiteInfo();
					const website = dataW[0]
					return [ onlyPreviews, website ]
			}
      },
      {
        path: 'about',
        element: <About />,
				loader: async () => {
					const dataW = await getWebsiteInfo();
					const website = dataW[0]
					return website
				}
      },
			{
				path: '/projects/:p',
				element: <Project/>,
				loader: async ({ params } : { params : { p : string } }) => {
					const project = await getProject(params.p);
					return project;
				}
			},
			{
				path: 'contact',
				element: <Contact/>
			}
    ]
  }
]
const router = createBrowserRouter(routerArray as RouteObject[]) 

  
export default function App() {
  return <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme"><RouterProvider 
    router={router} 
    fallbackElement={<div></div>}
  />
	</ThemeProvider>
}
