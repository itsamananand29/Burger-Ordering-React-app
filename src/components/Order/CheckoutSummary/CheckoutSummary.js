import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';
const checkoutSummary=(props)=>{
    return(
        <div className={classes.CheckoutSummary}>
            
           <Burger ingredients={props.ingredients} />
            
            <div style={{textAlign:'center',margin:'10px 15px'}}>
                <Button btnType="Danger" clicked={props.checkoutCancelled} >CANCEL</Button>
                <Button btnType="Success" clicked={props.checkoutContinued} >CONTINUE</Button>
            </div>
            
        </div>

    )
}
export default checkoutSummary;