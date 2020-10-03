import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from  'react-redux';

class Checkout extends Component {
    
   
    checkoutCancelHandler=()=>{
        
        this.props.history.goBack();

    }
    checkoutContinueHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
        
       
    }
    render(){
        let summary = <Redirect to='/' />;
        if(this.props.ingredients){
           const purchased = this.props.puchasedRedirect ? this.props.history.replace('/orderSuccess'): null;

           summary=
             <div>
                 {purchased}
                 <h1 style={{textAlign:'center'}} >Here's your order</h1>
                <CheckoutSummary 
                    checkoutCancelled={this.checkoutCancelHandler}
                    checkoutContinued={this.checkoutContinueHandler}
                    ingredients={this.props.ingredients}/>
                <Route path={this.props.match.path +'/contact-data'} 
                    component ={ContactData}/>
        </div>
           
        }
        return  summary;
       
    }
}
const mapStateToProps=state=>{
    return({
        ingredients:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        puchasedRedirect:state.orders.purchased,
        purchasing:state.burgerBuilder.purchasing
    })
}


export default connect(mapStateToProps)(Checkout);