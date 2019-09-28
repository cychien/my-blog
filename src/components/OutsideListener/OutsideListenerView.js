import React from 'react'

function OutsideListenerView(props) {
  const { outsideListenerRef, children } = props
  return <div ref={outsideListenerRef}>{children}</div>
}

export default OutsideListenerView
