import React from 'react'
const Icon = ({
  type,
  fontSize,
  color,
}) => {
  return (
    <span className={`iconfont ${type}`} style={{ fontSize, color }} />
  )
}

export default Icon