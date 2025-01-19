import IProduct from "./IProduct";

interface ICart {
	id: string;
	product: IProduct;
	quantity: number;
}

export default ICart;