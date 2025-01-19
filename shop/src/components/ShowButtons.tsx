import React from "react";

interface ShowButtonsProps {
	changeFav: () => void;
	showCheckout: () => void;
	fav: boolean;
}

const ShowButtons: React.FC<ShowButtonsProps> = ({ changeFav, showCheckout, fav }) => {
	return (<div className='flex justify-evenly mx-6 my-4'>
				<button onClick={changeFav}
						className={`px-4 py-2 font-semibold text-white rounded-lg
								transition-all duration-300
								${fav ? 'bg-blue-500' : 'bg-gray-500'}
								hover:shadow-lg focus:outline-none`}>
								{fav ? 'Show All' : 'Show Favorites'}
				</button>
				<button onClick={showCheckout}
						className='2xl:hidden bg-blue-500 px-4 py-2 font-semibold
								text-white rounded-lg transition-all duration-300
								hover:shadow-lg focus:outline-none'>
					Show Cart
				</button>
			</div>)
}

export default ShowButtons;