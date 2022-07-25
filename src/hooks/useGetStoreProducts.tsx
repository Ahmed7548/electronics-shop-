import { useEffect,useState } from "react";
import { useSearchParams,useParams } from "react-router-dom";
import { fetchProducts, productSelector } from "../store/slices/productsSlice"; 
import { useAppDispatch,useAppSelector } from "../store/app/store";
import { LoadingStatue } from "../utils/types";
export interface Product {
	id: number;
	name: string;
	price: number;
	imgUrl: string;
	discribtion: string;
}


const useGetStoreProducts = (): [Product[] ,LoadingStatue, React.Dispatch<React.SetStateAction<number>>,()=>void]=> {
	
	const [page, setPage] = useState(1)
	
	const { cat } = useParams()
	
	const [searchParams, setSearchparams] = useSearchParams();

	const dispatch = useAppDispatch()
	const {products,loading}=useAppSelector(productSelector)

	const getProducts = () => {
		dispatch(fetchProducts({param:cat,search:searchParams.get("search"),page:page}))
	}


	useEffect(() => {
		console.log(searchParams.get("search"),"inside")
		setPage(1)
		dispatch(fetchProducts({param:cat,search:searchParams.get("search")}))
  },[searchParams.get("search"),cat])
	return [products,loading,setPage,getProducts];
};

export default useGetStoreProducts;
