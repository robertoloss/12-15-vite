import { motion, AnimatePresence } from "framer-motion";

type Props = {
	children: React.ReactNode
	isVisible?: boolean
}

export default function AnimationWrapper({ children, isVisible } : Props) {

	return (
		<AnimatePresence>
			{!isVisible && 
			<motion.div
				key={location.pathname}
				initial={{ 
					opacity: 0, 
					//x: 50 
				}}
				animate={{ 
					opacity: 1, 
					//x: 0, 
					transition: {ease: 'easeOut', duration: .5} }}
				exit={{ 
					opacity: 0, 
					//x: -50
				}}
			>
				{children}
			</motion.div>}
		</AnimatePresence>
	)
}
