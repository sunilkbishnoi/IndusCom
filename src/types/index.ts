
export type SteelCategory = 
  | "Stainless Steel" 
  | "Mild Steel" 
  | "Carbon Steel" 
  | "Alloy Steel" 
  | "Non-Ferrous Metals";

export type ProductType = 
  | "Coils" 
  | "Sheets" 
  | "Plates" 
  | "Rods" 
  | "Bars" 
  | "Pipes" 
  | "Pipe Fittings" 
  | "Fasteners";

export type Manufacturer = 
  | "Jindal Steel" 
  | "TATA Steel" 
  | "SAIL" 
  | "POSCO" 
  | "ArcelorMittal"
  | "Essar Steel";

export type SizeRange = 
  | "1 inch - 8 inch" 
  | "8 inch - 12 inch" 
  | "Custom";

export type QualityGrade = 
  | "S.S 202 Q" 
  | "S.S 204 Q" 
  | "S.S 304 Q" 
  | "M.S IS 2062" 
  | "CS ASTM A106" 
  | "AS A335 P11";

export type PriceChange = {
  amount: number;
  percentage: number;
};

export type SteelProduct = {
  id: string;
  category: SteelCategory;
  type: ProductType;
  manufacturer: Manufacturer;
  qualityGrade?: QualityGrade;
  sizeRange?: SizeRange;
  price: number;
  priceChange: PriceChange;
};

export type Location = {
  id: string;
  name: string;
  state: string;
};

export type WatchlistItem = {
  id: string;
  category: SteelCategory;
  price: number;
  priceChange: PriceChange;
};

export type MarketNews = {
  id: string;
  headline: string;
  timestamp: string;
};

export type SteelSpecification = {
  id: string;
  category: SteelCategory;
  grade: string;
  properties: {
    tensileStrength: string;
    yieldStrength: string;
    elongation: string;
    hardness: string;
    density: string;
    meltingPoint: string;
  };
  applications: string[];
  corrosionResistance: string;
};

export type IndustryReport = {
  id: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  downloadUrl: string;
};
