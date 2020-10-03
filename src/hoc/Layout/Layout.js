import React,{Component} from 'react';
import Aux from '../AuxHoc/AuxHoc';
import classes from './Layout.css'
import ToolBar from '../../components/Navigation/Toolbar/Toolbar';
import SideBar from '../../components/Navigation/SideBar/SideBar';
import {connect} from 'react-redux';
class layout extends Component{
    state={
        displaySideBar:false
    }
    hideSideBarHandler=()=>{
        this.setState({
            displaySideBar:false
        })
    }
    showSideBarHandler=()=>{
        this.setState({
            displaySideBar:true
        })
    }
    render(){
        return (
            <Aux>
                <SideBar show={this.state.displaySideBar} closed={this.hideSideBarHandler} isAuthenticated={this.props.isAuthenticated}/>
            <ToolBar opened={this.showSideBarHandler} isAuthenticated={this.props.isAuthenticated}/>
            <main className={classes.Content}>
                    {this.props.children}
            </main>
            </Aux>)
    }
}
const mapStateToProps=state=>{
    return({
        isAuthenticated : state.auth.token !=null
    })
}
export default connect(mapStateToProps)(layout);