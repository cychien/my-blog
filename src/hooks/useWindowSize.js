import { useState, useEffect, useCallback } from 'react'

function useWindowSize() {
  const isClient = typeof window === 'object'
  console.log(isClient)

  const getSize = useCallback(() => {
    console.log(123)
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }
  }, [isClient])

  const [windowSize, setWindowSize] = useState(getSize())

  useEffect(() => {
    console.log(456)
    if (!isClient) {
      return false
    }

    function handleResize() {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isClient, getSize]) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}

export default useWindowSize
