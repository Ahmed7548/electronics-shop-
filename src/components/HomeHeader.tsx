import React from "react";
import { Button } from "react-bootstrap";

const HomeHeader = ({ imageUrl }: { imageUrl: string }) => {
	return (
		<section
			className="w-100 bg-danger home-header layer bc-img-fit text-white p-5 d-flex flex-column justify-content-center "
			style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div>
			<h2 className="fs-3 uppercase">store name logo</h2>
			<p className="w-75">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere
				nesciunt cum atque assumenda expedita a accusantium quisquam maxime,
				quis, hic exercitationem blanditiis consectetur, voluptatum quas quod
				nobis provident impedit. Accusamus!
      </p>
      <Button variant="dark" className="ms-auto">about us</Button>
      </div>
		</section>
	);
};

export default HomeHeader;
