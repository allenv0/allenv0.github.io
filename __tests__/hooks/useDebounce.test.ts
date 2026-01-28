import { renderHook } from '@testing-library/react';
import { useDebounce } from '@/hooks/useDebounce';

describe('useDebounce', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
	});

	it('should return initial value immediately', () => {
		const { result } = renderHook(() => useDebounce('initial', 500));
		expect(result.current).toBe('initial');
	});

	it('should debounce string values', () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: 'initial', delay: 500 } }
		);

		expect(result.current).toBe('initial');

		rerender({ value: 'updated', delay: 500 });
		expect(result.current).toBe('initial'); // Still initial

		jest.advanceTimersByTime(500);
		expect(result.current).toBe('updated'); // Now updated
	});

	it('should debounce number values', () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: 0, delay: 300 } }
		);

		rerender({ value: 42, delay: 300 });
		expect(result.current).toBe(0);

		jest.advanceTimersByTime(300);
		expect(result.current).toBe(42);
	});

	it('should debounce object values', () => {
		const obj1 = { id: 1 };
		const obj2 = { id: 2 };

		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: obj1, delay: 500 } }
		);

		expect(result.current).toBe(obj1);

		rerender({ value: obj2, delay: 500 });
		expect(result.current).toBe(obj1);

		jest.advanceTimersByTime(500);
		expect(result.current).toBe(obj2);
	});

	it('should reset timer on multiple updates', () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: 'v1', delay: 500 } }
		);

		rerender({ value: 'v2', delay: 500 });
		jest.advanceTimersByTime(200);

		rerender({ value: 'v3', delay: 500 });
		jest.advanceTimersByTime(200);

		expect(result.current).toBe('v1'); // Timer reset, so no update yet

		jest.advanceTimersByTime(300);
		expect(result.current).toBe('v3'); // Now updates
	});

	it('should handle different delay values', () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: 'initial', delay: 100 } }
		);

		rerender({ value: 'updated', delay: 100 });
		jest.advanceTimersByTime(100);
		expect(result.current).toBe('updated');

		rerender({ value: 'again', delay: 300 });
		jest.advanceTimersByTime(150);
		expect(result.current).toBe('updated');

		jest.advanceTimersByTime(150);
		expect(result.current).toBe('again');
	});

	it('should cleanup timer on unmount', () => {
		const { unmount, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: 'initial', delay: 500 } }
		);

		rerender({ value: 'updated', delay: 500 });
		unmount();

		expect(() => {
			jest.advanceTimersByTime(500);
		}).not.toThrow();
	});

	it('should handle empty string', () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: '', delay: 500 } }
		);

		rerender({ value: 'text', delay: 500 });
		expect(result.current).toBe('');

		jest.advanceTimersByTime(500);
		expect(result.current).toBe('text');
	});

	it('should handle null and undefined', () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: null as any, delay: 500 } }
		);

		expect(result.current).toBe(null);

		rerender({ value: undefined, delay: 500 });
		jest.advanceTimersByTime(500);
		expect(result.current).toBe(undefined);
	});
});
