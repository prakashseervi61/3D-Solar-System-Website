import { create } from 'zustand';

interface SolarSystemStore {
    currentPlanetIndex: number;
    scrollProgress: number;
    isSnapped: boolean;
    isLoading: boolean;
    isMobileMenuOpen: boolean;
    setCurrentPlanetIndex: (index: number) => void;
    setScrollProgress: (progress: number) => void;
    setIsSnapped: (snapped: boolean) => void;
    setIsLoading: (loading: boolean) => void;
    setIsMobileMenuOpen: (open: boolean) => void;
}

const useStore = create<SolarSystemStore>((set) => ({
    currentPlanetIndex: 0,
    scrollProgress: 0,
    isSnapped: true,
    isLoading: true,
    isMobileMenuOpen: false,
    setCurrentPlanetIndex: (index) => set({ currentPlanetIndex: index }),
    setScrollProgress: (progress) => set({ scrollProgress: progress }),
    setIsSnapped: (snapped) => set({ isSnapped: snapped }),
    setIsLoading: (loading) => set({ isLoading: loading }),
    setIsMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
}));

export default useStore;
