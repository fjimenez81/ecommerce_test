import IProduct from "@interfaces/IProduct";
import React, { useState } from "react";
import { updateProduct } from '@services/service';
import { FaHeart, FaPlus } from "react-icons/fa";
import ICart from "@interfaces/ICart";


interface ProductProps {
	product: IProduct;
	setCart: React.Dispatch<React.SetStateAction<ICart[]>>;
}

const Product: React.FC<ProductProps> = ({ product, setCart }) => {
	const [favorite, setFavorite] = useState<number>(product.favorite)
	const [like, setLike] = useState<string>(product.favorite === 1 ? "text-red-500" : "text-red-200")

	const update_product = (id: string) => {

		updateProduct(id, favorite === 1 ? 0 : 1)
		setFavorite(fav => fav === 1 ? 0 : 1)
		setLike(like === "text-red-500" ? "text-red-200" : "text-red-500")
	}

	const add_cart = (product: IProduct) => {
		
		setCart(currentCart => {
			
			if (product.stock === 0) return currentCart

			const existingItem = currentCart.find(item => item.id === product.id);

			if (existingItem) {

				return currentCart.map(item =>
					item.id === product.id && item.product.stock > item.quantity
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			}
			return [...currentCart, { id: product.id, product, quantity: 1 }];
		})

	}

	return (<div className="block my-4 border border-solid border-black h-[350px] rounded-md">
				<img src={product.image_url} className={"w-[350px] h-[120px]"} />
				<div className={"flex justify-between p-[5px]"}>
					<p className={"text-[15px] h-10"}>{product.productName}</p>
					<p className={"text-[15px]"}>{product.price}$</p>
				</div>
				<div className="flex justify-end mr-3 my-1">
					<button onClick={() => update_product(product.id)} >
						<FaHeart className={`${like}`} />
					</button>
				</div>
				<div className={"block my-2 p-[5px] overflow-auto custom-scrollbar h-[100px]"}>
					<p className={"w-[250px] text-[12px]"}>{product.productDescription}</p>
				</div>
				<div className="flex justify-between p-2">
					<p>{product.stock} Left</p>
					<button onClick={() => add_cart(product)}
							className="flex justify-end items-center active:text-green-600">
						<FaPlus/>&nbsp;Add Cart
					</button>
				</div>
			</div>)
};

export default Product;