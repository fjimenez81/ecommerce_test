import IProduct from "@interfaces/IProduct";

const URL = "http://localhost:3000/grocery"

export async function getProducts(offset: number, fav: string): Promise<IProduct[]> {
	const response = await fetch(`${URL}?_start=${offset}&_limit=12${fav}`)
	const products = await response.json();
	return products
}

export function  updateProduct(id: string, favorite: number): void {
	fetch(`${URL}/${id}`, {method: 'PATCH', headers: {
		"Content-Type": "application/json",
	  }, body: JSON.stringify({favorite})})
}