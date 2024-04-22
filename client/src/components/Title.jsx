import clsx from 'clsx'
import React from 'react'

const Title = ({title, className}) => {
  return (
    <div>
      <h2 className={clsx("text-2xl font-semibold capitalize", className)}>{title}</h2>
    </div>
  )
}

export default Title
