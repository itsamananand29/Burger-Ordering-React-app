import React from 'react';
import classes from './Menu.css';
const menu =(props)=>{
    return(
    <div 
    className={classes.Menu}
    onClick={props.opened}
    >&#9776;
    
    </div>
    ) 
    
};
export default menu;