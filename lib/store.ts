import { create } from "zustand"
import { persist } from "zustand/middleware"

// Product type
interface Product {
  id: string
  name: string
  brand: string
  image: string
  nutritionFacts: {
    calories: number
    fat: number
    carbs: number
    protein: number
    sugar: number
  }
  ingredients: string[]
  additives: string[]
}

// Product store
interface ProductState {
  scannedProduct: Product | null
  recentProducts: Product[]
  setScannedProduct: (product: Product) => void
  clearScannedProduct: () => void
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      scannedProduct: null,
      recentProducts: [],
      setScannedProduct: (product) =>
        set((state) => ({
          scannedProduct: product,
          recentProducts: [product, ...state.recentProducts.filter((p) => p.id !== product.id).slice(0, 9)],
        })),
      clearScannedProduct: () => set({ scannedProduct: null }),
    }),
    {
      name: "eatsmarty-products",
    },
  ),
)

// Settings store
interface SettingsState {
  notificationsEnabled: boolean
  scanHistory: boolean
  setNotificationsEnabled: (enabled: boolean) => void
  setScanHistory: (enabled: boolean) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      notificationsEnabled: true,
      scanHistory: true,
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
      setScanHistory: (enabled) => set({ scanHistory: enabled }),
    }),
    {
      name: "eatsmarty-settings",
    },
  ),
)

