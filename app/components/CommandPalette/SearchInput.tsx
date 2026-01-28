"use client";

import { forwardRef } from "react";

interface SearchInputProps {
	value: string;
	onChange: (value: string) => void;
	onKeyDown: (e: React.KeyboardEvent) => void;
	placeholder?: string;
	className?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
	({ value, onChange, onKeyDown, placeholder, className }, ref) => {
		return (
			<input
				ref={ref}
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onKeyDown={onKeyDown}
				placeholder={placeholder}
				className={
					className ||
					"w-full bg-transparent py-4 text-lg font-medium placeholder-zinc-500 transition-all placeholder:transition-opacity focus:placeholder-opacity-70 focus:outline-none dark:placeholder-zinc-400"
				}
				style={{
					WebkitFontSmoothing: "antialiased",
					MozOsxFontSmoothing: "grayscale",
				}}
				aria-label="Search"
			/>
		);
	},
);

SearchInput.displayName = "SearchInput";
