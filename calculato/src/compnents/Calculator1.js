import React, { useReducer } from 'react'
import './style.css'
import AddNumber from './AddNumber'
import ChooseOperation from './ChooseOperation'

export const Action=
{
Add_number:'add-number',
Choose:'choose-operation',
Clear:'clear',
Result:'result'
}


const reduser = (state, {type, paylode})=>{
    switch(type)
    {
        case Action.Add_number: 
        if(state.overwrite)
        {
            return{
                ...state,
                current_opr: paylode.number,
                overwrite:false
            }
        }
        if(paylode.number==="0"&&state.current_opr==="0")return state
        if(paylode.number==="."&& state.current_opr.includes("."))return state
            return{
                ...state,
                current_opr:`${state.current_opr||""}${paylode.number}`,
            }
        case Action.Choose:
            if(state.current_opr== null && state.prevs==null){
                return state
            }
            if(state.current_opr==null)
            {
                return {
                    ...state,
                    operation:paylode.operation
                }
            }
            if(state.prevs == null)
            {
            return{
                    ...state,
                    operation: paylode.operation,
                    prevs : state.current_opr,
                    current_opr: null
                  }
                }
            return{
                ...state,
                prevs:evaluate(state),
                operation:paylode.operation,
                current_opr:null
                }   

        case Action.Result:
            if(state.current_opr==null|| state.prevs==null||state.operation==null)
            { return state}

            return{
                ...state,
                prevs:null,
                operation:null,
                overwrite:true,
                current_opr:evaluate(state)
            }
        
        case Action.Clear:
            return{}
    }

}



function evaluate({current_opr,operation,prevs})
{
    const cur=parseFloat(current_opr)
    const pre=parseFloat(prevs)
    if(isNaN(pre)||isNaN(cur))return ""

    let total=""
    switch(operation)
    {
        case "+":
            total=pre+cur
            break
        case "-":
            total=pre-cur
            break
        case "x":
            total=pre*cur
            break
        case "/":
            total=pre/cur
            break
    }
    return total.toString()

}
const IntegerFomater= Intl.NumberFormat("en-us",{maximumFractionDigits:0})

function formater(operand)
{
    if(operand==null)
    return 
    const[integer,decimal]=operand.split('.')
    if(decimal==null)return IntegerFomater.format(integer)
    return `${IntegerFomater.format(integer)}.${decimal}`
}



function Calculator1() {
     const [{current_opr,prevs,operation},dispach]=useReducer(reduser,{})

  return (
    <div className='calc-grid'>
        <div className='output-div'>
            <div className='prev-operato' >{formater(prevs)}{operation}</div>
            <div className='current-operato'>{formater(current_opr)}</div>
        </div>
        <button className='span-two'>CE</button>
        <button onClick={()=>{dispach({type:Action.Clear })}}>C</button>
        <ChooseOperation operation='/' dispatch={dispach}/>
        <AddNumber number='9' dispach={dispach}/>
        <AddNumber number='8' dispach={dispach}/>  
        <AddNumber number='7' dispach={dispach}/>  
         <ChooseOperation operation='x' dispatch={dispach}/>
        <AddNumber number='6' dispach={dispach}/>  
        <AddNumber number='5' dispach={dispach}/>
        <AddNumber number='4' dispach={dispach}/>  
        <ChooseOperation operation='-' dispatch={dispach}/>  
        <AddNumber number='3' dispach={dispach}/>  
        <AddNumber number='2' dispach={dispach}/> 
        <AddNumber number='1' dispach={dispach}/>
        <ChooseOperation operation='+' dispatch={dispach}/>
        <AddNumber number='.' dispach={dispach}/>
        <AddNumber number='0' dispach={dispach}/>  
        <button className='span-two'  onClick={()=>{dispach({type:Action.Result })}}>=</button>
        
    </div>
  )
}

export default Calculator1