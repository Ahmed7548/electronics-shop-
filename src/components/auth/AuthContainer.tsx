import { Card,Col  } from "react-bootstrap";
import {  Outlet } from "react-router-dom";


const AuthContainer = () => {

	return (
		<Col className="col-12 col-md-6 m-auto">
			<Card>
		
          <Outlet/>
				
			</Card>
		</Col>
	);
};

export default AuthContainer;
