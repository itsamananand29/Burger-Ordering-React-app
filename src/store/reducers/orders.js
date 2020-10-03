import * as actionTypes from '../actions/actionsTypes';

const initialState ={
    orders: [],
    loading: false,
    purchased : false
}

const reducer =(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.FETCH_ORDER_START:
            return({
                ...state,
                loading:true
            })
        case actionTypes.FETCH_ORDER_SUCCESS:
            
            return ({
                ...state,
                orders : action.orders,
                
                loading:false
            })
        case actionTypes.FETCH_ORDER_FAIL:
            return({
                ...state,
                loading:false
            })    
        case actionTypes.PURCHASE_INIT:
            return({
                ...state,
                purchased:false
            })
        case actionTypes.ORDER_PLACE_START:
            return({
                ...state,
                loading:true
            })
        case actionTypes.ORDER_PLACED_SUCCESS:
           let newOrder={
                ...action.order,
                id:action.id
            }
            return({
                ...state,
                orders:state.orders.concat(newOrder),
                loading:false,
                purchased:true
            })
        case actionTypes.ORDER_PLACED_FAIL:
            return({
                ...state,
                loading:true
            })

        default:
            return state
    }
}
export default reducer;