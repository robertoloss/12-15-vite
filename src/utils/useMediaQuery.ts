import { useEffect, useState } from 'react'

function useMediaQuery() {

  const [size, setSize] = useState<number>(window.innerWidth)

  useEffect(()=>{
    function handleResize() {
      setSize(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  },[size]);

  return  size
}

export default useMediaQuery 
