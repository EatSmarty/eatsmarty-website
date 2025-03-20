"use client"

import { useEffect, useState } from "react"
import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Info, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useProductStore } from "@/lib/store"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params Promise using React.use
  const { id } = use(params)
  const { scannedProduct } = useProductStore()
  const { toast } = useToast()
  const [product, setProduct] = useState(scannedProduct)
  const [loading, setLoading] = useState(!scannedProduct)
  const [error, setError] = useState<string | null>(null)

  // Fetch product data if not available in store
  useEffect(() => {
    const fetchProduct = async () => {
      if (scannedProduct && scannedProduct.id === id) {
        setProduct(scannedProduct)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await fetch(`https://world.openfoodfacts.net/api/v2/product/${id}`)

        if (!response.ok) {
          throw new Error(`Product not found (Status: ${response.status})`)
        }

        const data = await response.json()

        if (data.status === 0) {
          throw new Error("Product not found in database")
        }

        // Map API data to our product structure
        const fetchedProduct = {
          id: id,
          name: data.product.product_name || "Unknown Product",
          brand: data.product.brands || "Unknown Brand",
          image: data.product.image_url || "/placeholder.svg?height=300&width=300",
          nutritionFacts: {
            calories: data.product.nutriments?.energy_value || 0,
            fat: data.product.nutriments?.fat_value || 0,
            carbs: data.product.nutriments?.carbohydrates_value || 0,
            protein: data.product.nutriments?.proteins_value || 0,
            sugar: data.product.nutriments?.sugars_value || 0,
          },
          ingredients: data.product.ingredients_text_en
            ? data.product.ingredients_text_en.split(",").map((i: string) => i.trim())
            : [],
          additives: data.product.additives_tags
            ? data.product.additives_tags.map((tag: string) => tag.replace("en:", "").toUpperCase())
            : [],
          nutriscoreGrade: data.product.nutriscore_grade || null,
          novaGroup: data.product.nova_group || null,
          ecoScore: data.product.ecoscore_grade || null,
          categories: data.product.categories_tags
            ? data.product.categories_tags.map((tag: string) => tag.replace("en:", ""))
            : [],
        }

        setProduct(fetchedProduct)
        setError(null)
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to fetch product data")
        toast({
          variant: "destructive",
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to fetch product data",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id, scannedProduct, toast])

  // Helper function to get grade color
  const getGradeColor = (grade: string | null) => {
    if (!grade) return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"

    switch (grade.toLowerCase()) {
      case "a":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "b":
        return "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
      case "c":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "d":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
      case "e":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
          <div>
            <Skeleton className="mb-2 h-8 w-1/3" />
            <Skeleton className="mb-6 h-10 w-2/3" />

            <Skeleton className="mb-4 h-10 w-full" />
            <Skeleton className="h-[300px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Product Not Found
            </CardTitle>
            <CardDescription>We couldn't find information for barcode: {id}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">{error || "The product might not be in our database yet."}</p>
            <Button asChild className="w-full">
              <Link href="/scan">Try Another Product</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="mb-6 overflow-hidden rounded-lg border bg-background p-4">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={400}
              className="mx-auto h-auto w-full max-w-md object-contain"
              priority
              unoptimized
            />
          </div>

          {/* Product Scores */}
          {(product.nutriscoreGrade || product.novaGroup || product.ecoScore) && (
            <div className="grid grid-cols-3 gap-4">
              {product.nutriscoreGrade && (
                <div className="rounded-lg border p-3 text-center">
                  <div
                    className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold uppercase ${getGradeColor(product.nutriscoreGrade)}`}
                  >
                    {product.nutriscoreGrade}
                  </div>
                  <p className="text-xs font-medium">Nutri-Score</p>
                </div>
              )}

              {product.novaGroup && (
                <div className="rounded-lg border p-3 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    {product.novaGroup}
                  </div>
                  <p className="text-xs font-medium">NOVA Group</p>
                </div>
              )}

              {product.ecoScore && (
                <div className="rounded-lg border p-3 text-center">
                  <div
                    className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold uppercase ${getGradeColor(product.ecoScore)}`}
                  >
                    {product.ecoScore}
                  </div>
                  <p className="text-xs font-medium">Eco-Score</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <div className="mb-6">
            <p className="mb-1 text-sm font-medium text-muted-foreground">{product.brand}</p>
            <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
            <p className="text-sm text-muted-foreground">Barcode: {product.id}</p>

            {product.categories && product.categories.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {product.categories.slice(0, 3).map((category, index) => (
                  <span key={index} className="rounded-full bg-muted px-2 py-1 text-xs">
                    {category.replace(/_/g, " ")}
                  </span>
                ))}
              </div>
            )}
          </div>

          <Tabs defaultValue="nutrition">
            <TabsList className="w-full">
              <TabsTrigger value="nutrition" className="flex-1">
                Nutrition
              </TabsTrigger>
              <TabsTrigger value="ingredients" className="flex-1">
                Ingredients
              </TabsTrigger>
              <TabsTrigger value="additives" className="flex-1">
                Additives
              </TabsTrigger>
            </TabsList>

            <TabsContent value="nutrition">
              <Card>
                <CardHeader>
                  <CardTitle>Nutrition Facts</CardTitle>
                  <CardDescription>Per 100g/ml</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Energy</span>
                      <span>{product.nutritionFacts.calories} kcal</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Fat</span>
                      <span>{product.nutritionFacts.fat}g</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Carbohydrates</span>
                      <span>{product.nutritionFacts.carbs}g</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Protein</span>
                      <span>{product.nutritionFacts.protein}g</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="font-medium">Sugar</span>
                      <span>{product.nutritionFacts.sugar}g</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ingredients">
              <Card>
                <CardHeader>
                  <CardTitle>Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                  {product.ingredients && product.ingredients.length > 0 ? (
                    <p className="text-sm leading-relaxed">{product.ingredients.join(", ")}</p>
                  ) : (
                    <p className="text-center text-muted-foreground">No ingredients information available</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="additives">
              <Card>
                <CardHeader>
                  <CardTitle>Additives</CardTitle>
                  <CardDescription>
                    {product.additives.length === 0
                      ? "No additives found in this product."
                      : `${product.additives.length} additive(s) found in this product.`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {product.additives.length > 0 ? (
                    <ul className="space-y-2">
                      {product.additives.map((additive) => (
                        <li key={additive} className="rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-medium">{additive}</span>
                              <p className="text-sm text-muted-foreground">
                                {additive.includes("E") ? "Food Additive" : "Processing Aid"}
                              </p>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/additives/${additive}`}>
                                <Info className="h-4 w-4" />
                                <span className="sr-only">More info</span>
                              </Link>
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-muted-foreground">No additives found in this product.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

