import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { RecipeForm } from "@/components/recipe-form"
import { ChefHat } from "lucide-react"
import Link from "next/link"

export default async function NewRecipePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <ChefHat className="h-8 w-8 text-orange-600" />
              <h1 className="text-2xl font-bold text-gray-900">GlobeChef</h1>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Share Your Recipe</h2>
          <p className="text-gray-600">
            Help others discover amazing dishes by sharing your favorite recipes with our community.
          </p>
        </div>

        <RecipeForm />
      </main>
    </div>
  )
}
