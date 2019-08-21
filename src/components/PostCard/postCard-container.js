import React, { useState } from 'react'
import PostCardView from './postCard-view'

function postCardContainer(props) {
  const [isRaised, setIsRaised] = useState(false)
  return (
    <div
      onMouseEnter={() => {
        setIsRaised(true)
      }}
      onMouseLeave={() => {
        setIsRaised(false)
      }}
    >
      <PostCardView {...props} isRaised={isRaised} />
    </div>
  )
}

export default postCardContainer
