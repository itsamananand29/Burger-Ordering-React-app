import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/AuxHoc/AuxHoc';
import BackDrop from '../BackDrop/BackDrop';
const modal =(props)=>{
    let style ={
        transform : props.show?'translateY(0)':'translateY(-100vh)',
        opacity:props.show?'1':'0'
    };
return (
    <Aux>
    <BackDrop show={props.show} closed={props.modalClose}/>  
     <div className={classes.Modal} style={style}>
        {props.children}
    </div>
    </Aux>
)};
export default modal;