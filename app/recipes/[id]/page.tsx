import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, ChefHat, Star } from "lucide-react"
import { notFound } from "next/navigation"

interface RecipePageProps {
  params: {
    id: string
  }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const supabase = createServerClient()

  const { data: recipe } = await supabase
    .from("recipes")
    .select(`
      *,
      profiles!inner(username, avatar_url),
      recipe_ratings(rating)
    `)
    .eq("id", params.id)
    .single()

  if (!recipe) {
    notFound()
  }

  const averageRating =
    recipe.recipe_ratings.length > 0
      ? recipe.recipe_ratings.reduce((sum: number, r: any) => sum + r.rating, 0) / recipe.recipe_ratings.length
      : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            {recipe.image_url && (
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={recipe.image_url || "/placeholder.svg"}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-2">{recipe.title}</CardTitle>
                  <p className="text-gray-600 text-lg mb-4">{recipe.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <ChefHat className="h-4 w-4" />
                      <span>By {recipe.profiles.username}</span>
                    </div>
                    {averageRating > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>
                          {averageRating.toFixed(1)} ({recipe.recipe_ratings.length} reviews)
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span>Prep: {recipe.prep_time}min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span>Cook: {recipe.cook_time}min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-orange-600" />
                      <span>Serves {recipe.servings}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary">{recipe.cuisine}</Badge>
                <Badge variant="outline">{recipe.difficulty}</Badge>
                {recipe.dietary_restrictions.map((restriction: string) => (
                  <Badge key={restriction} variant="outline" className="bg-green-50 text-green-700">
                    {restriction}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Ingredients */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ingredients</h3>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h3>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction: string, index: number) => (
                    <li key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 pt-1">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
