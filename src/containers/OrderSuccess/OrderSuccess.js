import React,{Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Burger from '../../components/Burger/Burger';
import {connect} from  'react-redux';

class OrderSuccess extends Component {
    
   
    checkoutCancelHandler=()=>{
        
        this.props.history.replace('/');

    }
    checkoutContinueHandler=()=>{
        this.props.history.replace('/orders');
        
       
    }
    render(){
        let summary = null;
        if(this.props.ingredients){
           
           summary=
             <div style={{margin:'5px',textAlign:'center'}}>
                 <h1  style={{color:'green'}}>Order Placed Successfully</h1>
                 <h3>Your order will be at your door step soon!!</h3>
                <br/>
                 <Burger ingredients={this.props.ingredients} />
            
            <div style={{textAlign:'center',margin:'10px 15px'}}>
                <Button btnType="Danger" clicked={this.checkoutContinueHandler} >ORDERS</Button>
                <Button btnType="Success" clicked={this.checkoutCancelHandler} >HOME</Button>
            </div>
        </div>
           
        }
        return  summary;
       
    }
}
const mapStateToProps=state=>{
    return({
        ingredients:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        purchasing:state.burgerBuilder.purchasing
    })
}


export default connect(mapStateToProps)(OrderSuccess);