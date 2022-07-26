import React, { useEffect, useRef, useState } from "react";
import { JsxElement } from "typescript";
import image from "../utils/image.jpg";

interface PropType {
	height: string;
	images: string[];
}

const ImageSlider = ({ height, images }: PropType) => {
	const [activeImage, setActiveImage] = useState(0);

	const [tocuhSlide, setTouchSlide] = useState(0);

	const sliderRef = useRef<HTMLDivElement>(null);

	let slideByPx = useRef(0);
	const startTouch = useRef(0);

	let imagesJsx: JSX.Element[] = [];
	let sliderButtonsJsx: JSX.Element[] = [];
	let imagesInfo = {
		num: images.length,
		//the fraction of the slider width that can be slided
		freeSliderMoveFraction: (images.length - 1 )/ images.length,
	};

	const buttonSliderHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target instanceof HTMLButtonElement) {
			const { id } = e.target;
			if (parseInt(id) === activeImage) return;

			setActiveImage(parseInt(id));
		}
	};

	const touchStartHandler = (e: React.TouchEvent<HTMLDivElement>) => {
		startTouch.current = e.touches[0].clientX;
		console.log(e.timeStamp)

	};

	const touchMoveHandler = (e: React.TouchEvent<HTMLDivElement>) => {
		if (sliderRef.current) {
			const slideMove = startTouch.current - e.touches[0].clientX;
			if (
				slideByPx.current + slideMove >
					sliderRef.current?.clientWidth * imagesInfo.freeSliderMoveFraction ||
				slideByPx.current + slideMove < 0
			) {
				return;
			}
			setTouchSlide(slideMove);
		}
	};

	const touchEndHandler = (e: React.TouchEvent<HTMLDivElement>) => {
		console.log(e.timeStamp)

		if (sliderRef.current) {
			setTouchSlide(0);
			const imageWidth = sliderRef.current?.clientWidth / imagesInfo.num;
			if (Math.abs(tocuhSlide) > imageWidth / 2) {
				if (tocuhSlide > 0) {
					setActiveImage((prevState) => prevState + 1);
				} else {
					setActiveImage((prevState) => prevState - 1);
				}
			}
		}
	};

	if (sliderRef.current)
		slideByPx.current =
			(sliderRef.current?.clientWidth / imagesInfo.num) * activeImage;

	images.forEach((image, ind) => {
		imagesJsx.push(
			<img id={`${ind}`} src={image} className="slider-img" key={ind} />
		);
		sliderButtonsJsx.push(
			<button
				key={ind}
				id={`${ind}`}
				className={ind === activeImage ? "active" : ""}
			></button>
		);
	});

	return (
		<div
			style={{ height: height, overflow: "hidden" }}
			className="slider position-relative bg-white border border border-opacity-25 rounded"
		>
			<div
				className="d-flex images-container"
				ref={sliderRef}
				style={{
					transform: `translatex(-${slideByPx.current + tocuhSlide}px)`,
				}}
				onTouchEnd={touchEndHandler}
				onTouchMove={touchMoveHandler}
				onTouchStart={touchStartHandler}
			>
				{imagesJsx}
			</div>
			<div
				className="d-flex w-40 position-absolute slider-dots"
				onMouseOver={buttonSliderHandler}
			>
				{sliderButtonsJsx}
			</div>
		</div>
	);
};

export default ImageSlider;
