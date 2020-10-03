import React from 'react';
import classes from './Input.css';

const input =(props)=>{
    let inputEle=null;
    let inputClass = [classes.Input];
    let errMessage = null;
    if ( props.touched && props.invalid ){
        
            inputClass.push(classes.Invalid)
            errMessage = <p className={classes.ErrorMessage}>Please enter a valid {props.name} !</p>
      
    }
    switch(props.elementType){
    case ('input') :
        inputEle =<input className={inputClass.join(' ')}
        value={props.config.value}
        onChange={props.inputChange}
        name={props.id}
        placeholder={props.config.placeholder}
        type={props.config.type}/> 
    break;
    case ('select'):
        inputEle=<select className={classes.Select} onChange={props.inputChange}>
            {props.config.options.map(key=>{
                
                return <option key={key.optionValue}>{key.displayValue}</option>
            })}
        </select>
        
        
    break;
    default :
    inputEle =null
     }       
    return (
        <div>
            <label className={classes.Label}>{props.label}</label>
            {inputEle}
            {errMessage}
        </div>
    )
}

export default input;