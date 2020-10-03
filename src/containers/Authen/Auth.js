import React,{Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import {connect } from 'react-redux';
import * as authAction from '../../store/actions/auth';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';

class Auth extends Component {
    state ={
        controls:{
            email:{
                elementType:'input',
                value:'',
                elementConfig:{
                    type:'email',
                    placeholder:'Email'
                },
                validation:{
                    required:true,
                    isEmail: true
                },
                isValid: false,
                touched:false
            },
            password:{
                elementType:'input',
                value:'',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                validation:{
                    required:true,
                    minLength:6
                },
                isValid: false,
                touched:false
            },
        },
        isSignedUp:true,
        isErr:false,
       
    }
    componentDidMount(){
       if(!this.props.buildingBurger  && this.props.authRedirectPath !== '/') 
            {
                this.props.onSetAuthRedirectPath()}        
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

    inputChangeHandler=(event,id)=>{
        
        const updatedControls ={
            ...this.state.controls,
            [id]:{
                ...this.state.controls[id],
                value : event.target.value,
                isValid : this.validationCheck(this.state.controls[id].validation,event.target.value),
                touched:true
            }
        
        };
        
        this.setState({
            controls:updatedControls,
            
        })
    }
    submitHandler=(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignedUp);

    }

    switchAuthHandler = (val)=>{
        this.setState({isSignedUp:val})
        console.log(this.state.isSignedUp)
    }

    render(){
        let formElementArray=[];
        let isFormValid = true;
    for(let key in this.state.controls){
        formElementArray.push({
            id:key,
            config: this.state.controls[key],

        })
        isFormValid = this.state.controls[key].isValid && isFormValid;

    }

    
    let form = formElementArray.map(formElement=>(
        <Input elementType={formElement.config.elementType} 
                config={formElement.config.elementConfig}
                name ={formElement.id}
                key={formElement.id}
                touched ={formElement.config.touched}
                invalid={!formElement.config.isValid}
                inputChange={(event)=>this.inputChangeHandler(event,formElement.id)}
                />
                
    ));
    let buttons =(
        <div>
            <Button btnType="Success" disabled ={!isFormValid}clicked={()=>this.switchAuthHandler(true)}>SIGN IN</Button>
            <Button btnType="Danger" disabled={!isFormValid} clicked={()=>this.switchAuthHandler(false)}>SIGN UP </Button>
        </div>
    )
    if(this.props.loading){
        form=<Spinner />;
        buttons=null;
    }
    let error = null;
    if (this.props.error){
        console.log(this.props.error)
        error=<p style={{color:'red',fontSize:'11px'}}>{this.props.error}</p>;    
    } 
    let authRedirect = null;
    if(this.props.isAuthenticated){
        authRedirect=<Redirect to ={this.props.authRedirectPath} />
    }      
        return(
            <div className={classes.Auth}>
                    {authRedirect}
                <form onSubmit={this.submitHandler}>
                    {form}
                    {buttons}
                    {error}
                   
                </form>
            </div>
        )
    }
}
const mapStateToProps=state =>{
    return ({
        loading : state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token !=null,
        buildingBurger:state.burgerBuilder.buildingBurger,
        authRedirectPath:state.auth.authRedirectPath
    })
}
const mapDispatchToProps= dispatch=>{
    return({
        onAuth :(email,password,isSignedUp)=>dispatch(authAction.auth(email,password,isSignedUp)) ,
        onSetAuthRedirectPath:()=>dispatch(authAction.setAuthRedirectPath('/'))

    })
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);