import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import './App.css';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch,withRouter, Redirect} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import OrderSuccess from './containers/OrderSuccess/OrderSuccess';
import Auth from './containers/Authen/Auth';

import Logout from './containers/Authen/Logout/Logout';
import * as authAction from './store/actions/auth';

import {connect} from 'react-redux';
import Payment from './containers/Payment/Payment';







class App extends Component {
  componentDidMount(){
    this.props.onAutoLogin()
  }
  render() {

    let route =null;
    if(!this.props.isAuthenticated){ 
    route=
     <Switch>
      <Route path='/auth' component={Auth}/>
      <Route path='/' component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
    }

    else{
      route= <Switch>
      <Route path='/checkout' component={Checkout}/>
      <Route path='/orders' component={Orders}/>
      <Route path='/auth' component={Auth}/>
      <Route path ='/logout' component={Logout} />
      <Route path ='/orderSuccess' component={OrderSuccess}/>
      <Route path='/payment' component={Payment}/>
      <Route path='/' component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
    }

    return (
      <div >
        
            <Layout>
              {route}
            </Layout>
          
      </div>
    );
  }
}
const mapStateToProps=state =>{
  return({
    isAuthenticated:state.auth.token !== null
  })
}
const mapDispatchToProps =dispatch =>{
  return ({
    onAutoLogin :() =>dispatch(authAction.setAutoLogin())
  })
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
