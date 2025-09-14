import { streamText } from "ai"
import { groq } from "@ai-sdk/groq"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const { messages } = await req.json()

  const supabase = createServerClient()

  // Get recent recipes to provide context to the AI
  const { data: recipes } = await supabase
    .from("recipes")
    .select(`
      id,
      title,
      description,
      ingredients,
      instructions,
      prep_time,
      cook_time,
      difficulty,
      cuisine,
      dietary_restrictions,
      profiles!inner(username)
    `)
    .limit(20)
    .order("created_at", { ascending: false })

  const recipeContext = recipes
    ? recipes
        .map(
          (recipe) =>
            `Recipe: ${recipe.title} (${recipe.cuisine}, ${recipe.difficulty}, ${recipe.prep_time + recipe.cook_time} min total)
    Description: ${recipe.description}
    Ingredients: ${recipe.ingredients.join(", ")}
    Dietary: ${recipe.dietary_restrictions.join(", ") || "None specified"}
    By: ${recipe.profiles.username}`,
        )
        .join("\n\n")
    : ""

  const result = await streamText({
    model: groq("llama-3.1-70b-versatile"),
    system: `You are a helpful AI meal assistant and cooking expert. Your role is to:

1. Suggest recipes based on available ingredients
2. Provide meal planning advice
3. Offer cooking tips and techniques
4. Help with dietary restrictions and preferences
5. Suggest nutritious and delicious meal options

Guidelines:
- Be friendly, enthusiastic, and encouraging about cooking
- Provide practical, actionable advice
- Consider dietary restrictions when mentioned
- Suggest ingredient substitutions when helpful
- Include approximate cooking times and difficulty levels
- Focus on accessible, home-cookable recipes
- Ask clarifying questions when needed to give better suggestions

You have access to a database of community recipes. When relevant, you can reference these recipes by title and suggest users try them. Here are some recent recipes from the community:

${recipeContext}

When suggesting these community recipes, mention they're from the recipe collection and encourage users to check them out on the main recipes page. Keep responses conversational but informative.`,
    messages,
  })

  return result.toDataStreamResponse()
}
