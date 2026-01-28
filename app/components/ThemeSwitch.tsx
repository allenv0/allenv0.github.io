"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { IconSunFilled, IconMoonFilled } from "@tabler/icons-react";

export default function ThemeSwitch() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme, resolvedTheme } = useTheme();

	// Only render after client-side hydration to prevent hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	// Simply toggle between light and dark
	const cycleTheme = () => {
		// If currently in dark mode (either explicitly or via system), switch to light
		// If currently in light mode (either explicitly or via system), switch to dark
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
	};

	// Determine which icon to show based on current resolved theme (actual appearance)
	const getIcon = () => {
		if (!mounted) return <IconSunFilled size={20} />;
		
		// Always show sun/moon icon based on the actual appearance, regardless of theme setting
		return resolvedTheme === 'dark' ? <IconSunFilled size={20} /> : <IconMoonFilled size={20} />;
	};

	// No theme indicator class needed

	// Don't render anything until mounted to prevent hydration mismatch
	if (!mounted) {
		return <div className="w-8 h-8" />;
	}

	return (
		<button
			aria-label="Switch themes"
			onClick={cycleTheme}
			className="glass-button !rounded-full w-8 h-8 flex items-center justify-center relative transition-all duration-200 focus:outline-none hover:shadow-2xl"
			type="button"
			title={mounted ? `Current theme: ${theme}` : 'Theme switcher'}
		>
			<span className="transition-transform duration-300">
				{getIcon()}
			</span>
		</button>
	);
}
