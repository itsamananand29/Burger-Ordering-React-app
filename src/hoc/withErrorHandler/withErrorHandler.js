import React, { Component } from 'react';
import Aux from '../AuxHoc/AuxHoc';
import Modal from '../../components/UI/Modal/Modal';
const withErrorHandler=(WrappedComponent,axios)=>{
 return class extends Component{
     state={
         error:null
     }
     closeModalHandler=()=>{
         this.setState({error:null})
     }
     componentDidMount(){
         this.reqInterceptor=axios.interceptors.request.use(req=>{
             this.setState({error:null});
             return req;
         })
         this.resInterceptor=axios.interceptors.response.use(null,error=>{
             this.setState({error:error})
         })
     }
     componentWillUnmount(){
         axios.interceptors.request.eject(this.reqInterceptor);
         axios.interceptors.response.eject(this.resInterceptor);
     }
     render(){
         return(
             <Aux>
                 <Modal show={this.state.error} modalClose={this.closeModalHandler} >
                     {this.state.error?this.state.error.message:null}
                 </Modal>
                 <WrappedComponent {...this.props}/>
             </Aux>
         )
     }
 }   
}
export default withErrorHandler;