export interface ServicePackage {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface PortfolioItem {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
  genre: string;
}

export interface FormData {
  name: string;
  email: string;
  bookTitle: string;
  genre: string;
  synopsis: string;
  preferences: string;
  deadline: string;
}

// Typing for external libraries loaded via script tags if needed
declare global {
  interface Window {
    UnicornStudio: {
      isInitialized: boolean;
      init: () => void;
    };
  }
}