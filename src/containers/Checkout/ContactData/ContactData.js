import React ,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/orders';
class ContactData extends Component{
state={
    orderForm:{
        name:{
            elementType:'input',
            value:'',
            elementConfig:{
                type:'text',
                placeholder:'Your Name'
            },
            validation:{
                required:true
            },
            isValid: false,
            touched:false

        },
        email:{
            elementType:'input',
            value:'',
            elementConfig:{
                type:'email',
                placeholder:'Your Email'
            },
            validation:{
                required:true,
                isEmail: true
            },
            isValid: false,
            touched:false
        },
        street:{
            elementType:'input',
            value:'',
            elementConfig:{
                type:'text',
                placeholder:'Street'
            },
            validation:{
                required:true
            },
            isValid: false,
            touched:false
        },
        pincode:{
            elementType:'input',
            value:'',
            elementConfig:{
                type:'text',
                placeholder:'Pincode'
            },
            validation:{
                required:true,
                minLength:6,
                maxLength:6,
                isNumeric:true
            },
            isValid: false,
            touched:false
        },
        country:{
            elementType:'input',
            value:'',
            elementConfig:{
                type:'text',
                placeholder:'Country'
            },
            validation:{
                required:true
            },
            isValid: false,
            touched:false
        },
        deliveryMethod:{
            elementType:'select',
            value:'Home Delivey',
            elementConfig:{
            options:[
                {optionValue:null,displayValue:'Select the option ..  '},
                {optionValue:'homeDelivery',displayValue:'Home Delivey'},
                {optionValue:'restrauntPickup',displayValue:'Restraunt Pickup'},
            ]        
        }
            ,
            validation:{},
            isValid: false,
            touched:false
         
        }
     } ,
    formValid:false,
    orderData:{}   
   
    
}
makepayment=()=>{
    let  formData ={};   
    for(let key in this.state.orderForm){
        formData[key]=this.state.orderForm[key].value;
    
    }
    
    
        const order ={
            ingredients : this.props.ingredients,
            price : +this.props.price,
            orderData: formData,
            userId:this.props.userId
        };
        this.setState({orderData:order})
        //this.props.onOrderPlaced(order,this.props.token);
    
    this.props.history.push('/payment',[this.state,order])
    
}
validationCheck=(validation,value)=>{
    let isValid = true;
    
    if (validation.required){
        isValid = value.trim() !== '' && isValid; 
    }
    if(validation.minLength){
        isValid = value.length >= validation.minLength && isValid; 
    }
    if(validation.maxLength){
        isValid = value.length <= validation.maxLength && isValid; 
    }
    if (validation.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }
    if (validation.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }
    
    return isValid
}

orderplaced=(event)=>{
    event.preventDefault();

    let  formData ={};   
    for(let key in this.state.orderForm){
        formData[key]=this.state.orderForm[key].value;
    
    }
    
    
        const order ={
            ingredients : this.props.ingredients,
            price : +this.props.price,
            orderData: formData,
            userId:this.props.userId
        };
        this.setState({orderData:order})
        this.props.onOrderPlaced(order,this.props.token);
        
}
inputChangeHandler=(event,id)=>{
    let formIsValid =true;
    const updatedForm ={...this.state.orderForm};
    const config = {...updatedForm[id]};
    config.value = event.target.value;
    config.isValid = this.validationCheck(config.validation,config.value)
    config.touched =true;
    updatedForm[id] = config;
    
    for(let ele in updatedForm){
        formIsValid=updatedForm[ele].isValid && formIsValid;
        
    }
    this.setState({
        orderForm:updatedForm,
        formValid:formIsValid
    })
}

render(){
    let formElementArray=[];
    for(let key in this.state.orderForm){
        formElementArray.push({
            id:key,
            config: this.state.orderForm[key],

        })
    }
    

    let form =(<form onSubmit={this.orderplaced}>
        {
            formElementArray.map(formElement=>{
                return <Input elementType={formElement.config.elementType} 
                config={formElement.config.elementConfig}
                name ={formElement.id}
                key={formElement.id}
                touched ={formElement.config.touched}
                invalid={!formElement.config.isValid}
                inputChange={(event)=>this.inputChangeHandler(event,formElement.id)}
                />
            })
        }
        <Button disabled={!this.state.formValid} btnType="Success" clicked={this.makepayment}>Pay Now</Button>
        {/* <Button disabled={!this.state.formValid} btnType="Success" clicked={this.orderplaced}>Order</Button> */}
    </form>)
    if (this.props.loading){
        form =<Spinner/>
    }
    
    return(
        <div className={classes.ContactData}>
            <h4>
                Enter your Contact Details
            </h4>
            {form}
        </div>
    )
}
}
const mapStateToProps=state=>{
    return({
        ingredients:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.orders.loading,
        token:state.auth.token,
        userId:state.auth.userId
    })
}
const mapDispatchToProps=dispatch =>{
    return({
        onOrderPlaced :(order,token)=>dispatch(orderActions.orderPlace(order,token))
    })
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));