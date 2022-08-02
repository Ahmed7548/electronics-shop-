import React from "react";
import { Button, ButtonProps } from "react-bootstrap";
import { NavLink, NavLinkProps } from "react-router-dom";

interface PropType extends ButtonProps{
  children: React.ReactNode;
  to:string
}


const NavButton = (props: PropType) => {
   
	return (
    <Button
      
			className="mx-md-1 mx-3 "
			as={
				NavLink as React.ForwardRefExoticComponent<
					NavLinkProps & React.RefAttributes<HTMLAnchorElement>
				> &
					keyof JSX.IntrinsicElements
			}
      {...{...props,children:null}}
		>
			{props.children}
		</Button>
	);
};

export default NavButton;
