import React ,{Component} from 'react';
import Aux from '../../hoc/AuxHoc/AuxHoc';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/BurgerIngredient/OderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/burgerBuilder';
import * as orderActions from '../../store/actions/orders';
import * as authActions from '../../store/actions/auth';

class BurgerBuilder extends Component{
    
    state={
        purchasing:false
        
    }
    componentDidMount(){
        
        this.props.onInitIngredients();
        
        
    }
    updatePurchaseState=(ingredients)=>{
        
        const sum = Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey]
        }).reduce((sum,el)=>{
            return sum+el;}
            ,0);
        return sum > 0;    
    }
   
    purchaseHandler=()=>{
        
        this.setState({purchasing:true});
        
    
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
        console.log(this.state.purchasing)
    }
    purchaseContinueHandler=()=>{
       console.log(this.props)
       this.props.onInitPurchased();
       if(!this.state.isAuthenticated){
           this.props.onSetAuthRedirectPath('/checkout');
           this.props.history.push('/auth')
       }
       else{this.props.history.push('/checkout')}
       
            
    }
    render(){
        const disabledInfo={...this.props.ingredients}
        
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key] <= 0;
        }
        let burger =<Spinner/>
        let orderSummary=null;
        if (this.props.ingredients){
            burger =(<Aux>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls 
                ingredientAdded={this.props.onAddIngredients}
                ingredientRemoved={this.props.onRemoveIngredients}
                disabled={disabledInfo}
                price={this.props.price}
                purchasable={this.updatePurchaseState(this.props.ingredients)} // this is done to automatically call the function
                purchased={this.purchaseHandler}
                isAuthenticated={this.props.isAuthenticated}
                />
            </Aux>);
            orderSummary=<OrderSummary  
            price={this.props.price.toFixed(2)}
            ingredients={this.props.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            isAuthenticated={this.props.isAuthenticated}/>; 
        }
       
        if (this.props.loading){
            orderSummary=<Spinner/>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}> 
                {orderSummary}
                </Modal>
                {burger}
        </Aux>
        );
               
    };
};

const mapStateToProps=state =>{
    return ({
        ingredients: state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        loading :state.burgerBuilder.loading,
        error:state.burgerBuilder.error,
        isAuthenticated : state.auth.token !== null,
        buildingBurger:state.burgerBuilder.buildingBurger
    })
}

const mapDispatchToProps= dispatch=>{
    return ({
        onAddIngredients :(type)=>dispatch(actions.addIngredients(type)),
        onRemoveIngredients :(type)=>dispatch(actions.removeIngredients(type)),
        onInitIngredients :()=>dispatch(actions.initIngredients()),
        onInitPurchased:()=>dispatch(orderActions.purchaseInit()),
        onSetAuthRedirectPath:(path)=>dispatch(authActions.setAuthRedirectPath(path))
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder,axios));