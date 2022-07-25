import React from "react";

type Props = {
	title: string;
	children?: React.ReactNode;
};

const Error= ({ title, children }:Props) => {
	return (
    <>
      <div className="w-100 d-flex flex-column justify-content-center align-itmes-center text-center" style={{height:"100vh"}}>
			<h1 className="text-danger" >{title}</h1>
        <p className="fs-3 text-mute ">{children}</p>
        </div>
		</>
	);
};

export default Error;
