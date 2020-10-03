import React from 'react';
import Aux from '../../../../hoc/AuxHoc/AuxHoc';
import Button from '../../../UI/Button/Button';
const orderSummary=(props)=>{
    const ingredients = Object.keys(props.ingredients).map(igKeys=>{
    return <li key={igKeys}>{igKeys} : {props.ingredients[igKeys]}</li>
    })
    const style={
        listStyleType:'none',
        textTransform:'capitalize'
    };
    return(
        <Aux>
            <h3>Your order summary</h3>
            <ul style={style}>
                {ingredients}
            </ul>
             <p><strong>Total Price: ${props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button clicked={props.purchaseCancelled} btnType="Danger">CANCEL</Button>
            <Button clicked={props.purchaseContinued} btnType="Success">{props.isAuthenticated?"CONTINUE":"SIGN IN"}</Button>
        </Aux>
    )

}
export default orderSummary;