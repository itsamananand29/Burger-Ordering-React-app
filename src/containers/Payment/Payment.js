import React ,{Component} from 'react';
import {connect} from 'react-redux';
import * as orderActions from '../../store/actions/orders';
import classes from './Payment.css';

class Payment extends Component{

   
orderplaced=(event)=>{
    event.preventDefault();
}

    componentDidMount(){
        console.log("paypal ingredients",this.props.history.location.state[1]);
        const amount= {
            value: '0.01'
        };
        const placeOrder =()=>{this.props.onOrderPlaced(this.props.history.location.state[1],this.props.token)};
        const orderSuccess =()=> this.props.history.push('/orderSuccess')
        console.log(typeof(this.props.price))
        window.paypal
            .Buttons({
                
                // Set up the transaction
             
                
                createOrder: function(data, actions) {
                   
                    return actions.order.create({
                        purchase_units: [{
                            amount: amount
                        }]
                    });
                },
            
                // Finalize the transaction
                onApprove: function(data, actions) {
                    
                    return actions.order.capture().then(function(details) {
                        // Show a success message to the buyer
                        placeOrder();
                        orderSuccess();
                        console.log(details.payer);
                        
                    });

                }
            }).render("#paypal-button-container")
    }
 render(){
    const ingredients = Object.keys(this.props.ingredients).map(igKeys=>{
        return <li key={igKeys}>{igKeys} &nbsp;:&nbsp; {this.props.ingredients[igKeys]}</li>
        })
        const style={
            listStyleType:'none',
            textTransform:'capitalize',
            
            margin:'auto 10px'            
        };
        
     return(
         <div className={classes.Payment}>
             <h3>Your order summary</h3>
            <div>                               
            <ul style={style}>
                {ingredients}
            </ul>
            </div>
             <p><strong>Total Price: $ {this.props.price.toFixed(2)}</strong></p>
             <div id="paypal-button-container" className={classes.PaypalButtonContainer}></div>
         </div>
     )
 }
}
const mapStateToProps =state=>{
    return({
        ingredients: state.burgerBuilder.ingredients,
        price : +state.burgerBuilder.totalPrice,
        token:state.auth.token,
        userId:state.auth.userId
    })
}
const mapDispatchToProps=dispatch =>{
    return({
        onOrderPlaced :(order,token)=>dispatch(orderActions.orderPlace(order,token))
    })
}
export default connect(mapStateToProps,mapDispatchToProps)(Payment);

