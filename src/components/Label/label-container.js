import React from 'react'
import LabelView from './label-view'

const typeTable = {
  人生方向: {
    color: 'brown',
    icon: 'star',
  },
  生產力: {
    color: 'purple',
    icon: 'rocket',
  },
  網頁開發: {
    color: 'blue',
    icon: 'computer',
  },
}

function labelContainer({ type }) {
  return (
    <LabelView
      color={typeTable[type].color}
      iconName={typeTable[type].icon}
      text={type}
    />
  )
}

export default labelContainer
