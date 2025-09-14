import { createClient } from "@/lib/supabase/server"
import { RecipeGrid } from "@/components/recipe-grid"
import { SearchBar } from "@/components/search-bar"
import { FilterSidebar } from "@/components/filter-sidebar"
import { Button } from "@/components/ui/button"
import { PlusCircle, ChefHat } from "lucide-react"
import Link from "next/link"

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch initial recipes
  const { data: recipes } = await supabase
    .from("recipes")
    .select(`
      *,
      profiles:author_id (display_name),
      recipe_ratings (rating)
    `)
    .order("created_at", { ascending: false })
    .limit(12)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <ChefHat className="h-8 w-8 text-orange-600" />
              <h1 className="text-2xl font-bold text-gray-900">GlobeChef</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/recipes/new">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Share Recipe
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Discover & Share
            <span className="text-orange-600 block">Amazing Recipes</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 text-pretty">
            Find your next favorite meal from our community of passionate home cooks, or get personalized suggestions
            from our AI chef assistant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SearchBar />
            <Link href="/chat">
              <Button size="lg" variant="outline" className="border-orange-200 hover:bg-orange-50 bg-transparent">
                Ask AI Chef
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Recipe Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Latest Recipes</h3>
              <p className="text-gray-600">{recipes?.length || 0} recipes found</p>
            </div>
            <RecipeGrid recipes={recipes || []} />
          </div>
        </div>
      </main>
    </div>
  )
}
