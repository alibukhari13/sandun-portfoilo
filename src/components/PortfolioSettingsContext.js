"use client";

import { createContext, useContext } from "react";

const PortfolioSettingsContext = createContext(null);

export function PortfolioSettingsProvider({ settings, children }) {
  return (
    <PortfolioSettingsContext.Provider value={settings}>
      {children}
    </PortfolioSettingsContext.Provider>
  );
}

export function usePortfolioSettings() {
  const settings = useContext(PortfolioSettingsContext);
  if (!settings) {
    throw new Error("Portfolio settings are not available in this page.");
  }
  return settings;
}
