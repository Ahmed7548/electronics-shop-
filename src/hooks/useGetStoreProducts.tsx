import { useEffect } from "react";
import { useSearchParams,useParams } from "react-router-dom";
import storeItems from "../data/items.json";
import { fetchProducts, productSelector } from "../store/slices/productsSlice"; 
import { useAppDispatch,useAppSelector } from "../store/app/store";
export interface Product {
	id: number;
	name: string;
	price: number;
	imgUrl: string;
	discribtion: string;
}


const useGetStoreProducts = (): Product[] => {
	const {cat} = useParams()
	const [searchParams, setSearchparams] = useSearchParams();
	const searchParamsObj = Object.fromEntries(searchParams.entries());
	const dispatch = useAppDispatch()
	const products=useAppSelector(productSelector)



  useEffect(() => {
		dispatch(fetchProducts({param:cat,search:searchParams.get("search")}))
  },[searchParams,cat])
	return products;
};

export default useGetStoreProducts;
