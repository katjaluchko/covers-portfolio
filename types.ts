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
  description?: string;
  gallery?: string[];
}

export interface FormData {
  name: string;
  email: string;
  packageType: string;
  bookTitle: string;
  genre: string;
  synopsis: string;
  preferences: string;
  deadline: string;
}