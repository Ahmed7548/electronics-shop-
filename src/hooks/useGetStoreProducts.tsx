import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
	const [searchParams, setSearchparams] = useSearchParams();
	const searchParamsObj = Object.fromEntries(searchParams.entries());
	const dispatch = useAppDispatch()
	const products=useAppSelector(productSelector)
	const reqBody: {
		cat?: string;
  search?:string
	} = {};

	if (searchParamsObj.cat) {
		reqBody.cat = searchParamsObj.cat;
	}
	if (searchParamsObj.search) {
		reqBody.cat = searchParamsObj.search;
  }

  useEffect(() => {
		dispatch(fetchProducts(reqBody))
  },[])
	return products;
};

export default useGetStoreProducts;
