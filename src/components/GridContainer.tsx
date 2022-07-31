import React from "react";
import ImageCard from "./ImageCard";

interface PropType {
	data: { title: string; imgUrl: string }[];
}

const GridContainer = ({ data }: PropType) => {
	let big = 0;
	let inc = 7;
	const grid = data.map((ele, ind) => {
		if (ind === big) {
			if (inc === 7) {
				big += inc;
				inc = 3;
			} else {
				big += inc;
				inc = 7;
			}
			return (
				<ImageCard
					title={"boook"}
					imageUrl="string"
					className="grid-column-2 grid-row-2"
					key={ind}
				/>
			);
		}

		return <ImageCard title={"boook"} imageUrl="string" />;
	});

	return (
		<div className="mt-5 ">
			<h3 className="uppercase">
				categories
			</h3>
			<div className="p-2 border grid">{grid}</div>
		</div>
	);
};

export default GridContainer;
