import * as actionType from '../actions/actionsTypes';
const initialState ={
    ingredients:null,
        totalPrice:4,
        loading:false,
        error:false,
        purchasing : false,
        buildingBurger : false
}
const INGREDIENT_PRICES={
    salad:0.5,
    meat:1.3,
    bacon:0.7,
    cheese:0.4
};
const reducer =(state=initialState,action)=>{
    switch (action.type){
       
        case actionType.ADD_INGREDIENT:
            return({
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                buildingBurger:true
            })
        case actionType.REMOVE_INGREDIENT:
            return({
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                buildingBurger:true
            })    
        case actionType.SET_INGREDIENT:
            return({
                ...state,
                ingredients:{
                    salad:action.ingredients.salad,
                    bacon:action.ingredients.bacon,
                    cheese:action.ingredients.cheese,
                    meat:action.ingredients.meat
                },
                totalPrice:4,
                loading:false,
                error:false,
                buildingBurger:false
            })   
        case actionType.FETCH_INGREDIENT_FAILED:
            return({
                ...state,
                error:true
            })     
        default :
            return state    
    }
}
export default reducer;