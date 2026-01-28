import { renderHook } from '@testing-library/react';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';

describe('useKeyboardShortcut', () => {
	let addEventListenerSpy: jest.SpyInstance;
	let removeEventListenerSpy: jest.SpyInstance;

	beforeEach(() => {
		addEventListenerSpy = jest.spyOn(window, 'addEventListener');
		removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
	});

	afterEach(() => {
		addEventListenerSpy.mockRestore();
		removeEventListenerSpy.mockRestore();
	});

	it('should attach keydown listener on mount', () => {
		const callback = jest.fn();
		renderHook(() =>
			useKeyboardShortcut(
				{ key: 'Enter' },
				callback
			)
		);

		expect(addEventListenerSpy).toHaveBeenCalledWith(
			'keydown',
			expect.any(Function)
		);
	});

	it('should remove keydown listener on unmount', () => {
		const callback = jest.fn();
		const { unmount } = renderHook(() =>
			useKeyboardShortcut(
				{ key: 'Enter' },
				callback
			)
		);

		unmount();

		expect(removeEventListenerSpy).toHaveBeenCalledWith(
			'keydown',
			expect.any(Function)
		);
	});

	it('should trigger callback on matching key', () => {
		const callback = jest.fn();
		renderHook(() =>
			useKeyboardShortcut(
				{ key: 'Enter' },
				callback
			)
		);

		const event = new KeyboardEvent('keydown', { key: 'Enter' });
		window.dispatchEvent(event);

		expect(callback).toHaveBeenCalled();
	});

	it('should not trigger callback on non-matching key', () => {
		const callback = jest.fn();
		renderHook(() =>
			useKeyboardShortcut(
				{ key: 'Enter' },
				callback
			)
		);

		const event = new KeyboardEvent('keydown', { key: 'Escape' });
		window.dispatchEvent(event);

		expect(callback).not.toHaveBeenCalled();
	});

	it('should handle case-insensitive key matching', () => {
		const callback = jest.fn();
		renderHook(() =>
			useKeyboardShortcut(
				{ key: 'a' },
				callback
			)
		);

		const event = new KeyboardEvent('keydown', { key: 'A' });
		window.dispatchEvent(event);

		expect(callback).toHaveBeenCalled();
	});

	it('should match ctrl modifier', () => {
		const callback = jest.fn();
		renderHook(() =>
			useKeyboardShortcut(
				{ key: 's', modifiers: ['ctrl'] },
				callback
			)
		);

		const event = new KeyboardEvent('keydown', {
			key: 's',
			ctrlKey: true,
		});
		window.dispatchEvent(event);

		expect(callback).toHaveBeenCalled();
	});

	it('should match alt modifier', () => {
		const callback = jest.fn();
		renderHook(() =>
			useKeyboardShortcut(
				{ key: 'e', modifiers: ['alt'] },
				callback
			)
		);

		const event = new KeyboardEvent('keydown', {
			key: 'e',
			altKey: true,
		});
		window.dispatchEvent(event);

		expect(callback).toHaveBeenCalled();
	});

	it('should match shift modifier', () => {
		const callback = jest.fn();
		renderHook(() =>
			useKeyboardShortcut(
				{ key: 'k', modifiers: ['shift'] },
				callback
			)
		);

		const event = new KeyboardEvent('keydown', {
			key: 'K',
			shiftKey: true,
		});
		window.dispatchEvent(event);

		expect(callback).toHaveBeenCalled();
	});

	it('should match meta modifier', () => {
		const callback = jest.fn();
		renderHook(() =>
			useKeyboardShortcut(
				{ key: 'k', modifiers: ['meta'] },
				callback
			)
		);

		const event = new KeyboardEvent('keydown', {
			key: 'k',
			metaKey: true,
		});
		window.dispatchEvent(event);

		expect(callback).toHaveBeenCalled();
	});

	it('should match multiple modifiers', () => {
		const callback = jest.fn();
		renderHook(() =>
			useKeyboardShortcut(
				{ key: 's', modifiers: ['ctrl', 'shift'] },
				callback
			)
		);

		const event = new KeyboardEvent('keydown', {
			key: 's',
			ctrlKey: true,
			shiftKey: true,
		});
		window.dispatchEvent(event);

		expect(callback).toHaveBeenCalled();
	});

	it('should not trigger if modifier is missing', () => {
		const callback = jest.fn();
		renderHook(() =>
			useKeyboardShortcut(
				{ key: 's', modifiers: ['ctrl'] },
				callback
			)
		);

		const event = new KeyboardEvent('keydown', { key: 's' });
		window.dispatchEvent(event);

		expect(callback).not.toHaveBeenCalled();
	});

	it('should preventDefault when enabled', () => {
		const callback = jest.fn();
		renderHook(() =>
			useKeyboardShortcut(
				{ key: 's', modifiers: ['ctrl'], preventDefault: true },
				callback
			)
		);

		const event = new KeyboardEvent('keydown', {
			key: 's',
			ctrlKey: true,
		});
		const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

		window.dispatchEvent(event);

		expect(preventDefaultSpy).toHaveBeenCalled();
		preventDefaultSpy.mockRestore();
	});

	it('should not preventDefault when disabled', () => {
		const callback = jest.fn();
		renderHook(() =>
			useKeyboardShortcut(
				{ key: 's', modifiers: ['ctrl'], preventDefault: false },
				callback
			)
		);

		const event = new KeyboardEvent('keydown', {
			key: 's',
			ctrlKey: true,
		});
		const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

		window.dispatchEvent(event);

		expect(preventDefaultSpy).not.toHaveBeenCalled();
		preventDefaultSpy.mockRestore();
	});

	it('should not trigger callback when disabled', () => {
		const callback = jest.fn();
		renderHook(() =>
			useKeyboardShortcut(
				{ key: 's', modifiers: ['ctrl'], enabled: false },
				callback
			)
		);

		const event = new KeyboardEvent('keydown', {
			key: 's',
			ctrlKey: true,
		});
		window.dispatchEvent(event);

		expect(callback).not.toHaveBeenCalled();
	});

	it('should handle dynamic enable/disable', () => {
		const callback = jest.fn();
		const { rerender } = renderHook(
			({ enabled }) =>
				useKeyboardShortcut(
					{ key: 's', modifiers: ['ctrl'], enabled },
					callback
				),
			{ initialProps: { enabled: true } }
		);

		const event = new KeyboardEvent('keydown', {
			key: 's',
			ctrlKey: true,
		});

		window.dispatchEvent(event);
		expect(callback).toHaveBeenCalledTimes(1);

		rerender({ enabled: false });
		window.dispatchEvent(event);
		expect(callback).toHaveBeenCalledTimes(1);

		rerender({ enabled: true });
		window.dispatchEvent(event);
		expect(callback).toHaveBeenCalledTimes(2);
	});
});
