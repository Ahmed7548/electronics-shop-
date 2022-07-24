import React from "react";

type Props = {
	title: string;
	children?: React.ReactNode;
};

const Error= ({ title, children }:Props) => {
	return (
    <>
      <div className="m-auto mt-5">
			<h1 className="text-danger uppercase" >{title}</h1>
        <p className="fs-3 text-mute">{children}</p>
        </div>
		</>
	);
};

export default Error;
