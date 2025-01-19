import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ShowButtons from '../ShowButtons'

describe('ShowButtons Component', () => {
	it('calls changeFav when favorite button is clicked', () => {
		const mockChangeFav = vi.fn();
		const mockShowCheckout = vi.fn();

		render(
			<ShowButtons
				changeFav={mockChangeFav}
				showCheckout={mockShowCheckout}
				fav={false}
			/>
		);

		const favButton = screen.getByRole('button', { name: /favorite/i });
		fireEvent.click(favButton);

		expect(mockChangeFav).toHaveBeenCalled();
	});
});