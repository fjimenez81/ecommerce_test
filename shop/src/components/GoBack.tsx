import React from "react";

interface GoBackProps {
	prevPage: () => void;
}

const GoBack: React.FC<GoBackProps> = ({ prevPage }) => {
	return (<div className='w-[100%] h-[100vh] flex  justify-center items-start'>
				<div className=''>
					<h1>NO RESULTS</h1>
					<button onClick={prevPage}
						className='bg-blue-500 px-4 py-2 my-2 font-semibold
						text-white rounded-lg transition-all duration-300
						hover:shadow-lg focus:outline-none'>
						GO BACK
					</button>
				</div>
			</div>)
}

export default GoBack;