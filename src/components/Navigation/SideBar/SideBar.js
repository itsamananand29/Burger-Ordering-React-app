import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideBar.css';
import Aux from '../../../hoc/AuxHoc/AuxHoc';
import BackDrop from '../../UI/BackDrop/BackDrop';
const sideBar=(props)=>{
    let openSideBar =[classes.SideBar,classes.Close];
    if(props.show){
        openSideBar=[classes.SideBar,classes.Open];
    }
    return(
    <Aux>    
        <BackDrop show={props.show} closed={props.closed}/>
        <div className={openSideBar.join(' ')} onClick={props.closed}>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems isAuthenticated={props.isAuthenticated}/>
            </nav>
        </div>
        </Aux>    
    )
};
export default sideBar;