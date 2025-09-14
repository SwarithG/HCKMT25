import { RecipeCard } from "./recipe-card"

interface Recipe {
  id: string
  title: string
  description: string | null
  ingredients: string[]
  instructions: string[]
  prep_time: number | null
  cook_time: number | null
  servings: number | null
  difficulty: string | null
  cuisine_type: string | null
  dietary_tags: string[] | null
  image_url: string | null
  author_id: string
  created_at: string
  profiles: { display_name: string | null } | null
  recipe_ratings: { rating: number }[]
}

interface RecipeGridProps {
  recipes: Recipe[]
}

export function RecipeGrid({ recipes }: RecipeGridProps) {
  if (!recipes.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No recipes found. Try adjusting your filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}
