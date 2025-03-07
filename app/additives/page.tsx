import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// Mock data for additives
const additives = [
  {
    id: "E100",
    name: "Curcumin",
    type: "Color",
    safetyRating: "Safe",
    description: "Natural yellow food coloring derived from turmeric",
  },
  {
    id: "E150a",
    name: "Caramel",
    type: "Color",
    safetyRating: "Safe",
    description: "Brown coloring made by heating sugar",
  },
  {
    id: "E202",
    name: "Potassium Sorbate",
    type: "Preservative",
    safetyRating: "Safe",
    description: "Prevents growth of mold, yeast and fungi",
  },
  {
    id: "E211",
    name: "Sodium Benzoate",
    type: "Preservative",
    safetyRating: "Caution",
    description: "Prevents growth of bacteria and fungi",
  },
  {
    id: "E306",
    name: "Vitamin E",
    type: "Antioxidant",
    safetyRating: "Safe",
    description: "Prevents oils from going rancid",
  },
  {
    id: "E330",
    name: "Citric Acid",
    type: "Acidity Regulator",
    safetyRating: "Safe",
    description: "Adds sour taste and acts as a preservative",
  },
  {
    id: "E621",
    name: "Monosodium Glutamate (MSG)",
    type: "Flavor Enhancer",
    safetyRating: "Caution",
    description: "Enhances savory flavors",
  },
  {
    id: "E951",
    name: "Aspartame",
    type: "Sweetener",
    safetyRating: "Caution",
    description: "Artificial sweetener used in diet products",
  },
]

// Helper function to get safety rating color
const getSafetyColor = (rating: string) => {
  switch (rating) {
    case "Safe":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    case "Caution":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    case "Avoid":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}

export default function AdditivesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Food Additives</h1>
      <p className="mb-8 max-w-3xl text-muted-foreground">
        Food additives are substances added to food to preserve flavor or enhance taste, appearance, or other qualities.
        Learn about common additives, their uses, and potential health effects.
      </p>

      <div className="mb-8 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search additives by name or E-number..." className="pl-10" />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {additives.map((additive) => (
          <Card key={additive.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{additive.id}</CardTitle>
                  <CardDescription>{additive.name}</CardDescription>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${getSafetyColor(additive.safetyRating)}`}>
                  {additive.safetyRating}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Type: </span>
                {additive.type}
              </div>
              <p className="mb-4 text-sm">{additive.description}</p>
              <Button asChild variant="ghost" size="sm" className="w-full">
                <Link href={`/additives/${additive.id}`}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

