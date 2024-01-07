import { create } from 'zustand'

export type CurrentPageState = {
	pageOpen: boolean
	setPageOpen: (b:boolean)=>void 
}

export const usePage = create<CurrentPageState>()((set) => ({
	pageOpen: true,
	setPageOpen: (b:boolean) => set((state)=>({pageOpen: b}))
}))
