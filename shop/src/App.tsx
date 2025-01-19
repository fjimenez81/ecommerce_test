import { useEffect, useState } from 'react'
import './App.css'
import Product from "@components/Product";
import Item from "@components/Item";
import PageButtons from "@components/PageButtons";
import IProduct from '@interfaces/IProduct'
import { getProducts } from '@services/service';
import ICart from '@interfaces/ICart';
import ShowButtons from '@components/ShowButtons';
import CheckoutButton from '@components/CheckoutButton';
import GoBack from '@components/GoBack';


function App() {

	const [data, setData] = useState<IProduct[]>([]);
	const [page, setPage] = useState<number>(1)
	const [offset, setOffset] = useState<number>(0)
	const [cart, setCart] = useState<ICart[]>([])
	const [amount, setAmount] = useState<number>(0)
	const [limit, setLimit] = useState<boolean>(false)
	const [fav, setFav] = useState<boolean>(false)
	const [checkout, setCheckout] = useState<string>('hidden')
	const [grid, setGrid] = useState<string>('block')

	useEffect(() => {

		async function fetchData() {
			console.log(fav);

			const products = await getProducts(offset, fav ? "&favorite=1" : "")
			setData(products);
			setLimit(() => products.length < 12)

		}

		fetchData();
	}, [page, fav])

	useEffect(() => {

		const newAmount = cart.reduce((total, item) =>
			total + (item.quantity * item.product.price), 0
		);
		setAmount(newAmount);

	}, [cart])

	const nextPage = () => {
		if (!limit) {
			setPage(currentPage => currentPage + 1)
			setOffset(currentOffset => currentOffset >= 0 ? currentOffset + 12 : currentOffset)
		}
	}

	const prevPage = () => {
		if (!data.length && fav) {
			changeFav()
			return
		}
		setPage(currentPage => currentPage === 1 ? currentPage : currentPage - 1)
		setOffset(currentOffset => currentOffset === 0 ? currentOffset : currentOffset - 12)
	}

	const changeFav = () => {
		setFav(currentFav => !currentFav)
		setPage(1)
		setOffset(0)
	}

	const showCheckout = () => {
		setCheckout(currentCheckout => currentCheckout === 'hidden' ? 'w-[95%]' : 'hidden')
		setGrid(currentGrid => currentGrid === 'hidden' ? 'block' : 'hidden')
	}

	return (
		<>
			<div className="flex justify-center items-center">
				{
					data.length ?
						<div className={`${grid} h-[140vh]`}>
							<PageButtons nextPage={nextPage} prevPage={prevPage} page={page} />
							<ShowButtons changeFav={changeFav} showCheckout={showCheckout} fav={fav} />
							<div className={`grid md:grid-cols-2 lg:grid-cols-3
										xl:grid-cols-4 gap-2 lg:gap-4 mx-4`}>
								{
									data.map(product => (
										<Product product={product} key={product.id} setCart={setCart} />
									))
								}
							</div>
							<PageButtons nextPage={nextPage} prevPage={prevPage} page={page} />
						</div> : <GoBack prevPage={prevPage}/>
					
				}
				<div className={`w-[33%] ${checkout} 2xl:block h-[140vh] border
								border-solid border-black p-4 px-10 rounded-md`}>
					<div className="flex justify-center my-4 mb-10">
						<button onClick={showCheckout}
							className='2xl:hidden bg-blue-500 px-4 py-2 mx-2 font-semibold
											text-white rounded-lg transition-all duration-300
											hover:shadow-lg focus:outline-none'>
							Show Products
						</button>
						<CheckoutButton amount={amount} css={"hidden 2xl:block"} />
					</div>
					<div className='overflow-x-auto h-[90%] mb-4 custom-scrollbar'>
						{
							cart && cart.map(item => (
								<Item item={item} key={item.id} setCart={setCart} />
							))
						}
						<CheckoutButton amount={amount} css={"2xl:hidden flex justify-center"} />
					</div>
				</div>
			</div>
		</>
	)
}

export default App
