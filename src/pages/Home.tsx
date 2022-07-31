import React from "react";
import HomeHeader from "../components/layout/HomeHeader";
import GridContainer from "../components/layout/GridContainer";
import "../styles/home.css";
import { useAppSelector } from "../store/app/store";
import { selectAppStartData } from "../store/slices/appStartSlice";
import ImageCard from "../components/UI/ImageCard";

function Home() {
	// not just the categories...
	const categoriesData = useAppSelector(selectAppStartData);
	return (
		<>
			<div className="bg-white">
				<HomeHeader imageUrl="https://images.unsplash.com/photo-1615859131861-052f0641a60e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2lkZXxlbnwwfHwwfHw%3D&w=1000&q=80" />
				{categoriesData.loading==="pending"||categoriesData.loading==="idle" ? (
					<p>loading ...</p>
				) : (
					<GridContainer data={categoriesData.categories} GridChild={ImageCard} />
				)}
			</div>
		</>
	);
}

export default Home;
