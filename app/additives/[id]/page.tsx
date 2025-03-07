import Link from "next/link"
import { ArrowLeft, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Mock data for additives
const additives = {
  E100: {
    id: "E100",
    name: "Curcumin",
    type: "Color",
    safetyRating: "Safe",
    description: "Natural yellow food coloring derived from turmeric",
    longDescription:
      "Curcumin is the active ingredient in turmeric, giving it its characteristic yellow color. It has been used as a food coloring for centuries and is also known for its potential health benefits, including anti-inflammatory and antioxidant properties.",
    commonProducts: ["Curry powders", "Mustard", "Yellow cakes", "Cheese products"],
    healthEffects: {
      positive: ["May have anti-inflammatory properties", "Contains antioxidants", "May improve brain function"],
      negative: ["May cause allergic reactions in some individuals", "Can stain clothing and skin"],
    },
    alternatives: ["Saffron", "Annatto", "Beta-carotene"],
  },
  E306: {
    id: "E306",
    name: "Vitamin E (Tocopherol)",
    type: "Antioxidant",
    safetyRating: "Safe",
    description: "Prevents oils from going rancid",
    longDescription:
      "Vitamin E (Tocopherol) is a fat-soluble vitamin with antioxidant properties. As a food additive, it helps prevent oils and fats from becoming rancid due to oxidation. It's considered a natural preservative and is often preferred over synthetic alternatives.",
    commonProducts: ["Vegetable oils", "Cereals", "Nuts and nut products", "Dairy products"],
    healthEffects: {
      positive: [
        "Essential nutrient for human health",
        "Protects cells from oxidative damage",
        "Supports immune function",
      ],
      negative: ["Very high doses may interfere with blood clotting (rare)"],
    },
    alternatives: ["Vitamin C (Ascorbic acid)", "Rosemary extract", "Citric acid"],
  },
}

// Helper function to get safety rating icon and color
const getSafetyInfo = (rating: string) => {
  switch (rating) {
    case "Safe":
      return {
        icon: CheckCircle,
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-100 dark:bg-green-900/30",
      }
    case "Caution":
      return {
        icon: AlertTriangle,
        color: "text-yellow-600 dark:text-yellow-400",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      }
    case "Avoid":
      return {
        icon: AlertTriangle,
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-100 dark:bg-red-900/30",
      }
    default:
      return {
        icon: HelpCircle,
        color: "text-gray-600 dark:text-gray-400",
        bgColor: "bg-gray-100 dark:bg-gray-800",
      }
  }
}

export default function AdditiveDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch additive data from an API using the ID
  // For this demo, we'll use mock data
  const additive = additives[params.id as keyof typeof additives] || {
    id: params.id,
    name: "Unknown Additive",
    type: "Unknown",
    safetyRating: "Unknown",
    description: "Information not available for this additive",
    longDescription: "Detailed information about this additive is not available in our database.",
    commonProducts: [],
    healthEffects: {
      positive: [],
      negative: [],
    },
    alternatives: [],
  }

  const safetyInfo = getSafetyInfo(additive.safetyRating)
  const SafetyIcon = safetyInfo.icon

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/additives">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Additives
        </Link>
      </Button>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{additive.id}</h1>
              <div className={`rounded-full px-3 py-1 text-sm font-medium ${safetyInfo.bgColor} ${safetyInfo.color}`}>
                {additive.safetyRating}
              </div>
            </div>
            <p className="text-xl text-muted-foreground">{additive.name}</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>About {additive.name}</CardTitle>
              <CardDescription>Type: {additive.type}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{additive.longDescription}</p>

              <div>
                <h3 className="mb-2 font-semibold">Commonly Found In:</h3>
                {additive.commonProducts.length > 0 ? (
                  <ul className="ml-6 list-disc space-y-1">
                    {additive.commonProducts.map((product) => (
                      <li key={product}>{product}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No information available</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Health Effects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-2 font-semibold text-green-600 dark:text-green-400">Potential Benefits</h3>
                {additive.healthEffects.positive.length > 0 ? (
                  <ul className="ml-6 list-disc space-y-1">
                    {additive.healthEffects.positive.map((effect, index) => (
                      <li key={index}>{effect}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No known benefits</p>
                )}
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-red-600 dark:text-red-400">Potential Concerns</h3>
                {additive.healthEffects.negative.length > 0 ? (
                  <ul className="ml-6 list-disc space-y-1">
                    {additive.healthEffects.negative.map((effect, index) => (
                      <li key={index}>{effect}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No known concerns</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-8 sticky top-6">
            <CardHeader>
              <CardTitle>Safety Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-2">
                <SafetyIcon className={`h-5 w-5 ${safetyInfo.color}`} />
                <span className="font-medium">{additive.safetyRating}</span>
              </div>

              <p className="mb-4 text-sm">
                {additive.safetyRating === "Safe"
                  ? "This additive is generally recognized as safe for consumption by most regulatory agencies worldwide."
                  : additive.safetyRating === "Caution"
                    ? "This additive may cause adverse reactions in some individuals or may have limited evidence of potential concerns."
                    : additive.safetyRating === "Avoid"
                      ? "This additive has been linked to potential health concerns and may be banned in some countries."
                      : "Safety information is not available for this additive."}
              </p>

              <Separator className="my-4" />

              <div>
                <h3 className="mb-2 text-sm font-semibold">Natural Alternatives</h3>
                {additive.alternatives.length > 0 ? (
                  <ul className="space-y-1 text-sm">
                    {additive.alternatives.map((alt) => (
                      <li key={alt} className="rounded-md bg-muted px-2 py-1">
                        {alt}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No alternatives listed</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

