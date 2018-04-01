import React from 'react'
import {header} from './styles.css'

export default function Title({text}) {
  return <h1 className={header}>{text}</h1>
}
