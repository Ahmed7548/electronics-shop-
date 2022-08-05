import { Link } from "react-router-dom";

interface PropType {
	className?: string;
	data: { imageUrl: string; title: string };
}

const ImageCard = ({ data, className }: PropType) => {
	return (
		<div
			className={`bc-img bc-img-contain image-card layer position-relative bg-white ${className}`}
			style={{ backgroundImage: `url(${data.imageUrl})` }}
		>
			<Link to={`/store/${data.title}`} className="">
				{data.title}
			</Link>
		</div>
	);
};

export default ImageCard;
