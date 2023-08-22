import React from 'react'
import { Action } from './Calculator1'

function AddNumber({dispach , number}) {
  return (
    <button 
    onClick={()=>{dispach({type:Action.Add_number,paylode:{number}})}}> 
        {number}
    </button>
  )
}

export default AddNumber