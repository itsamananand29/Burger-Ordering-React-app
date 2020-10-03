import React ,{Component} from 'react';
import {connect} from 'react-redux';
import * as action from '../../../store/actions/auth';
import {Redirect} from 'react-router-dom';
class Lougout extends Component {
    componentDidMount(){
        this.props.onLogout();
    }
    render(){
        return <Redirect to ='/' />;
    }
}
const mapDispatchToProps=dispatch=>{
    return ({
        onLogout:()=>dispatch(action.authLogout())
    })
}
export default connect(null,mapDispatchToProps)(Lougout);