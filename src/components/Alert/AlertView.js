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
    ? { color: '#2c2503', fontSize: '18px' }
    : isConcept
    ? { color: '#041b1d', fontSize: '18px' }
    : { color: '#1c1802', fontSize: '18px' }
  const titleStyle = isTips
    ? { color: '#8a760b', fontSize: '20px', marginBottom: '8px' }
    : isConcept
    ? { color: '#18b7c3', fontSize: '20px', marginBottom: '8px' }
    : { color: '#1c1802', fontSize: '20px', marginBottom: '8px' }

  return (
    <div className="custom-alert" style={bgStyle}>
      {title && <div style={titleStyle}>{title}</div>}
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
      <div style={textStyle}>{children}</div>
    </div>
  )
}

export default AlertView
