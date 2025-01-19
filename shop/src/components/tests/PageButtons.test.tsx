import { render, screen, fireEvent } from '@testing-library/react';
import PageButtons from '../PageButtons';

vi.mock('react-icons/fa', () => ({
	FaMinus: () => <div data-testid="minus-icon">-</div>,
	FaPlus: () => <div data-testid="plus-icon">+</div>
}));

describe('PageButtons Component', () => {

	it('handles both next and prev page clicks', () => {
		let currentPage = 1;
		const nextPage = () => {
			currentPage += 1;
			rerender(<PageButtons
				prevPage={prevPage}
				nextPage={nextPage}
				page={currentPage}
			/>);
		};
		const prevPage = () => {
			currentPage -= 1;
			rerender(<PageButtons
				prevPage={prevPage}
				nextPage={nextPage}
				page={currentPage}
			/>);
		};

		const { rerender } = render(
			<PageButtons
				prevPage={prevPage}
				nextPage={nextPage}
				page={currentPage}
			/>
		);

		expect(screen.getByText('1')).toBeInTheDocument();

		const nextButton = screen.getByTestId('plus-icon').parentElement;
		fireEvent.click(nextButton!);
		expect(screen.getByText('2')).toBeInTheDocument();

		const prevButton = screen.getByTestId('minus-icon').parentElement;
		fireEvent.click(prevButton!);
		expect(screen.getByText('1')).toBeInTheDocument();
	});
});