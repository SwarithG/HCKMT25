"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useState } from "react"

export function SearchBar() {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log("Searching for:", query)
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2 max-w-md w-full">
      <Input
        type="text"
        placeholder="Search recipes, ingredients, or cuisine..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 border-orange-200 focus:border-orange-400"
      />
      <Button type="submit" size="lg" className="bg-orange-600 hover:bg-orange-700">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  )
}
