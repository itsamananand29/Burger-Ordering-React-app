import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props)=>{
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' excat>Burger Builder</NavigationItem>
            {props.isAuthenticated ?<NavigationItem link='/orders' >Orders</NavigationItem> : null } 
            {props.isAuthenticated ?<NavigationItem link='/logout'>LogOut</NavigationItem>:<NavigationItem link='/auth'>LogIn</NavigationItem> }
            
               
        </ul>
    )
}
export default navigationItems;