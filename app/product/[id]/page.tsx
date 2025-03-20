import { use } from "react"
import ProductPageClient from "./ProductPageClient"

export async function generateStaticParams() {
  const commonBarcodes = [
    "3017624010701", // Nutella
    "5449000000996", // Coca-Cola
    "7622210449283", // Oreo
    "8000500310427", // Ferrero Rocher
    "3017620422003", // Kinder Bueno
  ]

  return commonBarcodes.map((id) => ({ id }))
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return <ProductPageClient id={id} />
}

