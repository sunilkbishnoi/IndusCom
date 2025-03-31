
import { 
  SteelProduct, 
  SteelCategory, 
  Location,
  WatchlistItem,
  MarketNews,
  SteelSpecification,
  IndustryReport
} from "../types";

// Steel categories with their current prices and price changes
export const steelCategories: Record<SteelCategory, { price: number, priceChange: { amount: number, percentage: number } }> = {
  "Stainless Steel": { price: 255000.00, priceChange: { amount: 5000, percentage: 2.01 } },
  "Mild Steel": { price: 150000.00, priceChange: { amount: -3000, percentage: -1.96 } },
  "Carbon Steel": { price: 144000.00, priceChange: { amount: 2000, percentage: 1.41 } },
  "Alloy Steel": { price: 198000.00, priceChange: { amount: -1500, percentage: -0.75 } },
  "Non-Ferrous Metals": { price: 275000.00, priceChange: { amount: 4500, percentage: 1.67 } }
};

// Products by category
export const steelProducts: SteelProduct[] = [
  {
    id: "1",
    category: "Stainless Steel",
    type: "Coils",
    manufacturer: "TATA Steel",
    price: 180.00,
    priceChange: { amount: 50, percentage: 3.23 }
  },
  {
    id: "2",
    category: "Stainless Steel",
    type: "Sheets",
    manufacturer: "Jindal Steel",
    price: 195.05,
    priceChange: { amount: -30, percentage: -8.12 }
  },
  {
    id: "3",
    category: "Stainless Steel",
    type: "Plates",
    manufacturer: "TATA Steel",
    price: 210.50,
    priceChange: { amount: 31, percentage: 2.23 }
  },
  {
    id: "4",
    category: "Stainless Steel",
    type: "Pipes",
    manufacturer: "Essar Steel",
    price: 230.10,
    priceChange: { amount: -10, percentage: -2.1 }
  },
  {
    id: "5",
    category: "Stainless Steel",
    type: "Fasteners",
    manufacturer: "Jindal Steel",
    price: 260.75,
    priceChange: { amount: 21, percentage: 4.23 }
  },
  {
    id: "6",
    category: "Mild Steel",
    type: "Coils",
    manufacturer: "SAIL",
    price: 120.50,
    priceChange: { amount: 10, percentage: 9.05 }
  },
  {
    id: "7",
    category: "Mild Steel",
    type: "Sheets",
    manufacturer: "POSCO",
    price: 134.75,
    priceChange: { amount: -5, percentage: -3.58 }
  },
  {
    id: "8",
    category: "Carbon Steel",
    type: "Rods",
    manufacturer: "ArcelorMittal",
    price: 156.25,
    priceChange: { amount: 12, percentage: 8.32 }
  },
  {
    id: "9",
    category: "Carbon Steel",
    type: "Bars",
    manufacturer: "TATA Steel",
    price: 178.90,
    priceChange: { amount: -8, percentage: -4.28 }
  },
  {
    id: "10",
    category: "Alloy Steel",
    type: "Pipe Fittings",
    manufacturer: "Jindal Steel",
    price: 225.40,
    priceChange: { amount: 18, percentage: 8.68 }
  }
];

// Locations for location-based pricing
export const locations: Location[] = [
  { id: "1", name: "Mumbai", state: "Maharashtra" },
  { id: "2", name: "Delhi", state: "Delhi" },
  { id: "3", name: "Bangalore", state: "Karnataka" },
  { id: "4", name: "Chennai", state: "Tamil Nadu" },
  { id: "5", name: "Kolkata", state: "West Bengal" },
  { id: "6", name: "Hyderabad", state: "Telangana" },
  { id: "7", name: "Ahmedabad", state: "Gujarat" },
  { id: "8", name: "Pune", state: "Maharashtra" }
];

// Watchlist items
export const watchlistItems: WatchlistItem[] = [
  {
    id: "1",
    category: "Stainless Steel",
    price: 255009.54,
    priceChange: { amount: 9.54, percentage: 4.06 }
  },
  {
    id: "2",
    category: "Carbon Steel",
    price: 144050.00,
    priceChange: { amount: 50, percentage: 3.23 }
  }
];

// Market News
export const marketNews: MarketNews[] = [
  {
    id: "1",
    headline: "TATA Steel announces 8% price hike for Q3 on rising input costs",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "2",
    headline: "China steel exports drop 15% in August, domestic demand strengthens",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "3",
    headline: "JSW Steel completes acquisition of Italian steel plant for €70 million",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "4",
    headline: "Carbon steel prices expected to rise following coal shortage in key mining regions",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "5",
    headline: "Government imposes 15% export duty on select steel products to control domestic prices",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "6",
    headline: "ArcelorMittal invests $2.2 billion in green steel production technology",
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString()
  }
];

// Steel technical specifications
export const steelSpecs: SteelSpecification[] = [
  {
    id: "1",
    category: "Stainless Steel",
    grade: "304",
    properties: {
      tensileStrength: "515 MPa",
      yieldStrength: "205 MPa", 
      elongation: "40%",
      hardness: "88 HRB",
      density: "8.0 g/cm³",
      meltingPoint: "1400-1450°C"
    },
    applications: ["Food Processing Equipment", "Kitchen Appliances", "Architectural Trim", "Chemical Containers"],
    corrosionResistance: "Excellent resistance to most oxidizing acids"
  },
  {
    id: "2",
    category: "Carbon Steel",
    grade: "1045",
    properties: {
      tensileStrength: "585 MPa",
      yieldStrength: "450 MPa", 
      elongation: "12%",
      hardness: "170 HB",
      density: "7.85 g/cm³",
      meltingPoint: "1430°C"
    },
    applications: ["Axles", "Bolts", "Studs", "Shafts", "Machine Parts"],
    corrosionResistance: "Low resistance to corrosion, requires surface protection"
  },
  {
    id: "3",
    category: "Alloy Steel",
    grade: "4140",
    properties: {
      tensileStrength: "655 MPa",
      yieldStrength: "415 MPa", 
      elongation: "25.7%",
      hardness: "197 HB",
      density: "7.85 g/cm³",
      meltingPoint: "1416°C"
    },
    applications: ["Gears", "Axles", "Shafts", "Aircraft Parts", "Oil Industry Components"],
    corrosionResistance: "Moderate resistance to corrosion in non-severe environments"
  }
];

// Industry reports
export const industryReports: IndustryReport[] = [
  {
    id: "1",
    title: "Steel Market Outlook 2023-2025",
    summary: "Comprehensive analysis of global steel demand trends and price forecasts for the next three years",
    date: "2023-06-15",
    source: "Global Steel Analytics",
    downloadUrl: "#"
  },
  {
    id: "2",
    title: "Green Steel Production: Innovations and Market Impact",
    summary: "Research on emerging technologies for low-carbon steel production and market implications",
    date: "2023-04-22",
    source: "Steel Industry Association",
    downloadUrl: "#"
  },
  {
    id: "3",
    title: "Supply Chain Disruptions in Steel Industry Post-Pandemic",
    summary: "Analysis of ongoing supply chain challenges and strategies for procurement optimization",
    date: "2023-02-08",
    source: "Metal Research Institute",
    downloadUrl: "#"
  }
];
