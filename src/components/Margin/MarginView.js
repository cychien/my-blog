import React from 'react'

function MarginView({ top, bottom, children }) {
  return (
    <div style={{ marginTop: top || 0, marginBottom: bottom || 0 }}>
      {children}
    </div>
  )
}

export default MarginView
