"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export function FilterSidebar() {
  const cuisineTypes = ["Italian", "Mexican", "Asian", "Mediterranean", "American", "Indian", "French"]
  const dietaryTags = ["vegetarian", "vegan", "gluten-free", "dairy-free", "keto", "paleo"]
  const difficulties = ["easy", "medium", "hard"]

  return (
    <Card className="border-orange-100">
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Active Filters */}
        <div>
          <h4 className="font-medium mb-2">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              Italian
              <X className="h-3 w-3 ml-1 cursor-pointer" />
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Vegetarian
              <X className="h-3 w-3 ml-1 cursor-pointer" />
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Cuisine Type */}
        <div>
          <h4 className="font-medium mb-3">Cuisine Type</h4>
          <div className="space-y-2">
            {cuisineTypes.map((cuisine) => (
              <div key={cuisine} className="flex items-center space-x-2">
                <Checkbox id={cuisine} />
                <Label htmlFor={cuisine} className="text-sm">
                  {cuisine}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Dietary Preferences */}
        <div>
          <h4 className="font-medium mb-3">Dietary Preferences</h4>
          <div className="space-y-2">
            {dietaryTags.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox id={tag} />
                <Label htmlFor={tag} className="text-sm capitalize">
                  {tag}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Difficulty */}
        <div>
          <h4 className="font-medium mb-3">Difficulty</h4>
          <div className="space-y-2">
            {difficulties.map((difficulty) => (
              <div key={difficulty} className="flex items-center space-x-2">
                <Checkbox id={difficulty} />
                <Label htmlFor={difficulty} className="text-sm capitalize">
                  {difficulty}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
