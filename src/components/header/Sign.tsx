import React from "react";
import Avatar from "../UI/Avatar";
import NavButton from "../UI/NavButton";

const Sign = ({
	auth,
	user,
}: {
	auth: boolean;
	user: { name: string; avatar: string; id: number };
  }) => {
	return (
		<div className="d-flex align-items-center">
			{!auth ? (
				<>
					<NavButton
						to="auth/login"
						className="mx-md-1 ms-md-2 my-2 my-md-0 border"
						variant="light"
					>
						log in
					</NavButton>
					<NavButton
						to="auth/signup"
						className="mx-md-1 mx-3 mx-md-1 me-md-2 my-2 my-md-0"
						variant="dark"
					>
						sign up
					</NavButton>
				</>
			) : (
				<>
					<Avatar name="ahmed" id={user.id} avatar={user.avatar} />
					<NavButton
						to="signup"
						className="mx-md-1 mx-3 mx-md-1 me-md-2"
						variant="outline-dark"
					>
						log out
					</NavButton>
				</>
			)}
		</div>
	);
};

export default Sign;
