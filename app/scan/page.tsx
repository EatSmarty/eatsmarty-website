"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BarcodeScanner } from "@/components/barcode-scanner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useProductStore } from "@/lib/store"

export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const setScannedProduct = useProductStore((state) => state.setScannedProduct)

  const handleScan = (result: string) => {
    setIsScanning(false)

    const mockProduct = {
      id: result,
      name: "Organic Granola Cereal",
      brand: "Nature's Best",
      image: "/placeholder.svg?height=300&width=300",
      nutritionFacts: {
        calories: 120,
        fat: 3.5,
        carbs: 22,
        protein: 4,
        sugar: 8,
      },
      ingredients: [
        "Rolled oats",
        "Honey",
        "Sunflower oil",
        "Almonds",
        "Coconut",
        "Brown sugar",
        "Salt",
        "Natural flavor",
        "Vitamin E (E306)",
      ],
      additives: ["E306"],
    }

    setScannedProduct(mockProduct)
    toast({
      title: "Product Scanned!",
      description: `Barcode: ${result}`,
    })

    router.push(`/product/${result}`)
  }

  return (
    <div className="container mx-auto flex flex-col items-center px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Scan a Product</h1>

      <Card className="mb-8 w-full max-w-md">
        <CardHeader>
          <CardTitle>Barcode Scanner</CardTitle>
          <CardDescription>Position the barcode in the center of the camera view</CardDescription>
        </CardHeader>
        <CardContent>
          {isScanning ? (
            <div className="overflow-hidden rounded-lg border">
              <BarcodeScanner
                onScan={handleScan}
                onError={(error) => {
                  toast({
                    variant: "destructive",
                    title: "Scanner Error",
                    description: error.message,
                  })
                  setIsScanning(false)
                }}
              />
            </div>
          ) : (
            <Button onClick={() => setIsScanning(true)} className="w-full" size="lg">
              Start Scanning
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="mb-8 text-center">
        <p className="text-muted-foreground">
          Can&apos;t scan? You can also search for products by name or enter a barcode manually.
        </p>
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">How to scan</h2>
        <ol className="ml-6 list-decimal space-y-2 text-muted-foreground">
          <li>Click &quot;Start Scanning&quot; to activate your camera</li>
          <li>Position the barcode in the center of the view</li>
          <li>Hold steady until the barcode is recognized</li>
          <li>You&apos;ll be automatically redirected to the product details</li>
        </ol>
      </div>
    </div>
  )
}

