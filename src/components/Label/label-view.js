import React from 'react'
import { Icon, Label } from 'semantic-ui-react'
import './label.scss'

function labelView({ color, iconName, text }) {
  return (
    <Label as="span" color={color} className="custom-label">
      <Icon name={iconName} className="custom-label__icon" />
      {text}
    </Label>
  )
}

export default labelView
