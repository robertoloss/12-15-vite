import { create } from 'zustand'

export type CurrentPageState = {
	pageOpen: boolean
	setPageOpen: (b:boolean, goTo?: string, currentLoc?: string)=>void 
}

export const usePage = create<CurrentPageState>()((set) => ({
	pageOpen: true,
	setPageOpen: (b:boolean, goTo?:string, currentLoc?:string) => {
		if ((goTo === undefined && currentLoc === undefined) || goTo !== currentLoc) set(()=>({pageOpen: b}))
	}
}))
