"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface CommandPaletteContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  togglePalette: () => void;
  openPalette: () => void;
  closePalette: () => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextType | undefined>(undefined);

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePalette = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const openPalette = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closePalette = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <CommandPaletteContext.Provider value={{ isOpen, setIsOpen, togglePalette, openPalette, closePalette }}>
      {children}
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);
  if (context === undefined) {
    throw new Error('useCommandPalette must be used within a CommandPaletteProvider');
  }
  return context;
}
