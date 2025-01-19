import { FaMinus, FaPlus } from "react-icons/fa";
import React from "react";

interface PageButtonsProps {
	prevPage: () => void;
	nextPage: () => void;
	page: number
}

const PageButtons: React.FC<PageButtonsProps> = ({ prevPage, nextPage, page }) => {
	return (<div className="flex justify-center items-center mt-16">
				<button onClick={prevPage}><FaMinus /></button>
				<p className="mx-3">{page}</p>
				<button onClick={nextPage}><FaPlus /></button>
			</div>)
}

export default PageButtons;