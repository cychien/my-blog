import React, { Fragment, useRef, useEffect } from 'react'
import OutsideListenerView from './OutsideListenerView'

function OutsideListenerContainer(props) {
  const { onClickOutside, children } = props

  const outsideListenerRef = useRef(null)

  useEffect(() => {
    const handleClick = event => {
      if (
        outsideListenerRef &&
        !outsideListenerRef.current.contains(event.target)
      ) {
        onClickOutside()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [onClickOutside])

  return (
    <Fragment>
      <OutsideListenerView
        outsideListenerRef={outsideListenerRef}
        children={children}
      />
    </Fragment>
  )
}

export default OutsideListenerContainer
