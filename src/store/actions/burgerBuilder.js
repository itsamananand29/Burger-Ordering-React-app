import * as actionsTypes from './actionsTypes';
import axios from '../../axios-orders';
export const addIngredients =(type)=>{
    return (
        { type:actionsTypes.ADD_INGREDIENT,
            ingredientName : type}
    )
};
export const removeIngredients =(type)=>{
    return (
        { type:actionsTypes.REMOVE_INGREDIENT,
            ingredientName : type}
    )
};
export const setIngredients = (ingredients) =>{
    return { 
        type : actionsTypes.SET_INGREDIENT,
        ingredients : ingredients
    }
}
export const fetchIngredientFailed =()=>{
    return ({
        type : actionsTypes.FETCH_INGREDIENT_FAILED
    })
}
export const initIngredients =() =>{
    return dispatch =>{
        axios.get('/ingredients.json')
            .then(response=>{
                    dispatch(setIngredients(response.data))
                }
            )
            .catch(error =>{
                dispatch(fetchIngredientFailed())
            })
    }
}
