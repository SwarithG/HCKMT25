import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Recipe {
  id: string
  title: string
  description: string | null
  prep_time: number | null
  cook_time: number | null
  servings: number | null
  difficulty: string | null
  cuisine_type: string | null
  dietary_tags: string[] | null
  image_url: string | null
  profiles: { display_name: string | null } | null
  recipe_ratings: { rating: number }[]
}

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0)
  const averageRating =
    recipe.recipe_ratings.length > 0
      ? recipe.recipe_ratings.reduce((sum, r) => sum + r.rating, 0) / recipe.recipe_ratings.length
      : 0

  const difficultyColor = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800",
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-orange-100 hover:border-orange-200">
      <div className="relative overflow-hidden rounded-t-lg">
        <Image
          src={
            recipe.image_url ||
            `/placeholder.svg?height=200&width=300&query=${encodeURIComponent(recipe.title + " recipe food")}`
          }
          alt={recipe.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        {recipe.difficulty && (
          <Badge
            className={`absolute top-3 left-3 ${difficultyColor[recipe.difficulty as keyof typeof difficultyColor] || "bg-gray-100 text-gray-800"}`}
          >
            {recipe.difficulty}
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {recipe.title}
          </h3>
          {averageRating > 0 && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{averageRating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {recipe.description || "A delicious recipe to try at home."}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          {totalTime > 0 && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{totalTime}m</span>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {recipe.cuisine_type && (
            <Badge variant="secondary" className="text-xs">
              {recipe.cuisine_type}
            </Badge>
          )}
          {recipe.dietary_tags?.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <p className="text-xs text-gray-500">by {recipe.profiles?.display_name || "Anonymous Chef"}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link href={`/recipes/${recipe.id}`} className="w-full">
          <Button className="w-full bg-orange-600 hover:bg-orange-700">View Recipe</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
