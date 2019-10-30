import React from 'react'
import IdeaIcon from '../../assets/icons/idea.svg'
import SignIcon from '../../assets/icons/sign.svg'
import './alert.scss'

function AlertView({ isTips, isConcept, title, children }) {
  const bgStyle = isTips
    ? { backgroundColor: '#fbf3cc', paddingTop: title ? '12px' : '26px' }
    : isConcept
    ? { backgroundColor: '#dff9fb', paddingTop: title ? '12px' : '26px' }
    : {
        backgroundColor: '#e3dcdc',
        paddingTop: title ? '8px' : '26px',
        lineHeight: '2em',
      }
  const textStyle = isTips
    ? { color: '#2c2503' }
    : isConcept
    ? { color: '#041b1d' }
    : { color: '#1c1802' }
  const titleStyle = isTips
    ? { color: '#8a760b' }
    : isConcept
    ? { color: '#18b7c3' }
    : { color: '#1c1802' }

  return (
    <div className="custom-alert" style={bgStyle}>
      {title && (
        <div className="custom-alert__title" style={titleStyle}>
          {title}
        </div>
      )}
      {isTips && (
        <div className="custom-alert__icon">
          <img src={IdeaIcon} width="50px" />
        </div>
      )}
      {isConcept && (
        <div className="custom-alert__icon">
          <img src={SignIcon} width="50px" />
        </div>
      )}
      <div className="custom-alert__text" style={textStyle}>
        {children}
      </div>
    </div>
  )
}

export default AlertView
