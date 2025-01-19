import React from "react";

interface CheckoutButtonProps {
	amount: number;
	css: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ amount, css }) => {
	return (<div className={`${css}`}>
				<button className="px-4 py-2 text-white rounded-lg bg-black">
					CHECKOUT <span>{amount}$</span>
				</button>
			</div>)
}

export default CheckoutButton;