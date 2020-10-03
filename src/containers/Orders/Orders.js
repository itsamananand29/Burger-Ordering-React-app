import React ,{Component} from 'react';
import Order from './Order/Order'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/orders';

class Orders extends Component{
    
    componentDidMount(){
        this.props.onFetch(this.props.token,this.props.userId);

    }
render(){
    let orderFinal =(<div>
        {this.props.orders.map(order=>{
          return(  <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
            />)
        })}
    </div>)
    if (this.props.loading){
        orderFinal =<Spinner />
    }
    return (orderFinal)
}
}
const mapStateToProps=state=>{
    
    return{
    orders:state.orders.orders,     
    loading : state.orders.loading,
    token:state.auth.token,
    userId:state.auth.userId

    }
}
const mapDispatchToProps=dispatch=>{
    return ({
        onFetch :(token,userId)=>dispatch(actions.fetchOrders(token,userId))
    })
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios)) ;