import { FaMinus, FaPlus } from "react-icons/fa";
import ICart from "@interfaces/ICart";
import React from "react";
import IProduct from "@interfaces/IProduct";


interface ItemProps {
	item: ICart;
	setCart: React.Dispatch<React.SetStateAction<ICart[]>>;
}

const Item: React.FC<ItemProps> = ({ item, setCart }) => {

	const add_cart = (product: IProduct) => {

		setCart(currentCart => {

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

	const remove_cart =  (productId: string) => {

		setCart(currentCart => {
			
			const cartItem = currentCart.find(item => item.id === productId);

			if (cartItem?.quantity === 1) {
				return currentCart.filter(item => item.id !== productId);
			}
			
			return currentCart.map(item => 
				item.id === productId
					? { ...item, quantity: item.quantity - 1 }
					: item
			);
		})
	}

	return (<div className="flex justify-between items-center my-4 mr-2">
				<div><img src={item.product.image_url} width={100} alt="" /></div>
				<div className="flex flex-col justify-center">
					{item.product.productName}
					<div className="flex justify-center">
						<button onClick={() => remove_cart(item.product.id)}
								className="active:text-red-600"><FaMinus/></button>
						<p className="mx-3">{item.quantity}</p>
						<button onClick={() => add_cart(item.product)}
								className="active:text-green-600"><FaPlus /></button>
					</div>
				</div>
				<div><p>{item.product.price * item.quantity}$</p></div>
			</div>
	)
}

export default Item;