import React from 'react'
import './AutoChangeColorBtn.scss'

function AutoChangeColorBtnView() {
  return (
    <div className="demo1">
      <div className="demo1__btn1">
        <button>I can change color</button>
      </div>
      <div className="demo1__btn2">
        <button>
          <span>I can, too</span>
        </button>
      </div>
    </div>
  )
}

export default AutoChangeColorBtnView
