/**
* External dependencies.
*/
import React from 'react';
// import { useEffect, useState } from 'react';
import { useState } from 'react';
import  Link from 'gatsby-link';
// import { each, isEmpty } from 'lodash';
// import { each } from 'lodash';
import classnames from 'classnames';

import DropdownIcon from '../icons/dropdown-icon';
// import { normalizePath, flatListToHierarchical } from "../../utils/functions";
// import CartIcon from "../cart/cart-icon";
// import WishListIcon from "../wishlist/wishlist-icon";


import { useLocation } from "@reach/router"
import { flatListToHierarchical } from "../../utils/functions"


const Nav = ( props ) => {

	const { headerMenuItems } = props;

	const [ menuVisible, setMenuVisibility ] = useState( false );
	// const [ menuState, setMenuState ] = useState( {} );

// Eslint disable as headerMenuItems is available from the props so does not have a missing dependency.
/* eslint-disable */
// useEffect( () => {

// 	if ( Object.keys( headerMenuItems.nodes ).length ) {
// 		const newMenuState = {};

// 		each( headerMenuItems.nodes, ( item ) => {
// 			newMenuState[ item.databaseId ] = { isOpen: false };
// 		} );

// 		setMenuState( newMenuState );
// 	}

// }, [] );
/* eslint-enable */

// const handleSubMenuOpen = ( event, databaseId ) => {
// 	event.stopPropagation();

// 	setMenuState( {
// 		...menuState,
// 		[ databaseId ]: { isOpen: ! menuState[ databaseId ].isOpen },
// 	} );
// };

const menuButtonClasses = classnames(
	'header-nav-menu-btn hamburger header-nav__menu-btn hamburger--slider',
	{
		'is-active': menuVisible
	}
	);

const toggleMenu = () => {
	setMenuVisibility( ! menuVisible );
	document.body.classList.toggle( 'mobile-menu-open' );
};




const location = useLocation()

const menuItems = flatListToHierarchical(headerMenuItems.nodes, {
	idKey: "id",
	childrenKey: "routes",
	parentKey: "parent",
})


// Initialize the state with `false` for each sub-menu
const [subMenuState, setSubMenuState] = useState([false, false])

const toggleSubMenu = (e, i) => {
    e.preventDefault()

    // Clone the array
    const newState = subMenuState.slice(0)

    // Toggle the state of the clicked sub-menu
    newState[i] = !newState[i]

    // Set the new state
    setSubMenuState(newState)
}


// const [subMenuState, setSubMenuState] = useState([false, false])

// const toggleSubMenu = (e, i) => {
//     e.preventDefault()

//     // Clone the array
//     const clone = subMenuState.slice(0)

//     // Reset all sub-menus except for the one that clicked
//     const newState = clone.map((val, index) => {
//         if(index === i) {
//             return val
//         }
//         return false
//     })

//     newState[i] = !newState[i]

//     setSubMenuState(newState)
// }

return (
	<>
	<nav
	className={ `header-nav ${
		menuVisible ? 'menu-visible' : ''
	}` }
	>
	<div className="header-nav__wrap">
	<ul className="header-nav__wrap">
	{menuItems &&
		menuItems.map((menuItem) => {
			const { path, title, id, routes } = menuItem
			const group = path.split("/")[1]
			const isActive = location.pathname.includes(group)

			if (routes && routes.length) {
				return (
					<li className="header-nav__menu-item menu-has-children" key={id}>
					<span className="header-nav__menu-link-container-with-arrow">

					<Link 
					aria-current={isActive ? "page" : undefined}
					key={id} 
					to={path}>
					{title}
					</Link>
					 <button className="header-nav__toggle-menu-btn icon-button" onClick={e => toggleSubMenu(e, id)}>
<DropdownIcon />
                      </button>
                </span>

                <ul className={ `header-nav__submenu ${
          subMenuState[ id ] ? 'child-menu-open' : ''
        }` } >

					{routes.map((route) => {
						const { path, title, id } = route
						return (
							<li className="header-nav__submenu-item" ml="0" key={id}>
							<Link aria-current={isActive ? "page" : undefined} key={id} to={path}>
							{title}
							</Link>
							</li>
							)
					})}
					</ul>
					</li>
					)
			} else {
				return (
					<li className="header-nav__menu-item" key={id}>
					<Link aria-current={isActive ? "page" : undefined} key={id} to={path}>
					{title}
					</Link>
					</li>
					)
			}
		})}
		</ul>
		</div>
		</nav>
		<div className="cart-icon-wrap">
		{/* <WishListIcon/>
		<CartIcon/> */}
	{/*Burger menu*/}
	<button
	className={ menuButtonClasses }
	type="button"
	onClick={ toggleMenu }
	onKeyDown={ toggleMenu }
	>
	<span className="hamburger-box">
	<span className="hamburger-inner">
	<span className="screen-reader-text">Toogle Menu</span>
	</span>
	</span>
	</button>
	</div>
	</>
	);
};

export default Nav;
