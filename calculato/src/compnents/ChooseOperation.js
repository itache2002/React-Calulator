import React from 'react'
import { Action } from './Calculator1'

function ChooseOperation({dispatch,operation}) {
  return (
    <button onClick={()=>{dispatch({type:Action.Choose,paylode:{operation}})}}>{operation}</button>
  )
}

export default ChooseOperation