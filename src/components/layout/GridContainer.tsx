import { title } from "process";
import React, { JSXElementConstructor } from "react";
import ImageCard from "../UI/ImageCard";

interface PropType {
	data: { name: string; imgUrl: string; id: number }[];
	GridChild: JSXElementConstructor<{ data: { title: string; imageUrl: string }; className?:string}>
}

const GridContainer = ({ data,GridChild }: PropType) => {
	let big = 0;
	let inc = 7;
	const grid = data.map(({ name, imgUrl, id }, ind) => {
		if (ind === big) {
			if (inc === 7) {
				big += inc;
				inc = 3;
			} else {
				big += inc;
				inc = 7;
			}
			return (
				<GridChild
					data={{title:name,imageUrl:imgUrl} }
					className="grid-column-2 grid-row-2"
					key={id}
				/>
			);
		}

		return <GridChild data={{title:name,imageUrl:imgUrl} } key={id} />;
	});

	return (
		<div className="mt-5 ">
			<h3 className="uppercase">we sell:</h3>
			<div className="p-2 border  grid">{grid}</div>
		</div>
	);
};

export default GridContainer;
