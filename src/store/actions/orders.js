import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const orderPlacedSuccess =(id,order)=>{
    return ({
        type:actionTypes.ORDER_PLACED_SUCCESS,
        id:id,
        order:order
    })
} 

export const orderPlacedFail =(error)=>{
    return ({
        type:actionTypes.ORDER_PLACED_FAIL,
        error:error
    })
}
export const orderPlaceStart =()=>{
    return({
        type:actionTypes.ORDER_PLACE_START
    
    })
}
export const orderPlace =(order,token)=>{
    return dispatch =>{
        dispatch(orderPlaceStart()); 
        axios.post('/order.json?auth='+token,order)
        .then(
            response=>
            {
                dispatch(orderPlacedSuccess(response.data.name,order))
            }
        )
        .catch(
              error=>{
                  dispatch( orderPlacedFail(error))
              }  
        ); 
    }
}
export const purchaseInit =()=>{
    return ({
        type:actionTypes.PURCHASE_INIT
    })
}

export const fetchOrdersSuccess =(orders)=>{
    
    return ({
        type : actionTypes.FETCH_ORDER_SUCCESS,
        orders:orders
    })
}
export const fetchOrdersFail =(error)=>{
    console.log(error,"error")
    return({
        type:actionTypes.FETCH_ORDER_FAIL,
        error:error
        
    })
}
export const fetchedOrdersStart =()=>{
    
    return ({
        type:actionTypes.FETCH_ORDER_START
    })
}
export const fetchOrders =(token,userId)=>{
return dispatch =>{
    dispatch(fetchedOrdersStart());
    const queryParams='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
    axios.get('/order.json'+queryParams)
        .then(response=>{
            const fetchedOrders =[];    
            for( let i in response.data){
                    
                fetchedOrders.push({
                    
                        ...response.data[i],
                        id:i
                    })
                }
            dispatch(fetchOrdersSuccess(fetchedOrders))        
           
        })
        .catch(error=>{
           
            dispatch(fetchOrdersFail(error))
        })   
}
}