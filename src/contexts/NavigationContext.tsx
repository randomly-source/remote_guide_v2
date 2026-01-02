import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type View = 'home' | 'setup' | 'profile' | 'help';

interface NavigationState {
  currentView: View;
  history: View[];
}

interface NavigationContextType {
  currentView: View;
  history: View[];
  navigateTo: (view: View) => void;
  goBack: () => boolean; // Returns true if navigation occurred, false if no history
  canGoBack: () => boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
  initialView?: View;
}

export function NavigationProvider({ children, initialView = 'home' }: NavigationProviderProps) {
  const [state, setState] = useState<NavigationState>({
    currentView: initialView,
    history: [initialView]
  });

  const navigateTo = useCallback((view: View) => {
    setState(prev => {
      // Don't add to history if navigating to the same view
      if (prev.currentView === view) {
        return prev;
      }
      return {
        currentView: view,
        history: [...prev.history, view]
      };
    });
  }, []);

  const goBack = useCallback((): boolean => {
    setState(prev => {
      if (prev.history.length <= 1) {
        return prev; // Can't go back
      }
      const newHistory = prev.history.slice(0, -1);
      return {
        currentView: newHistory[newHistory.length - 1],
        history: newHistory
      };
    });
    return true;
  }, []);

  const canGoBack = useCallback((): boolean => {
    return state.history.length > 1;
  }, [state.history.length]);

  return (
    <NavigationContext.Provider
      value={{
        currentView: state.currentView,
        history: state.history,
        navigateTo,
        goBack,
        canGoBack
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

