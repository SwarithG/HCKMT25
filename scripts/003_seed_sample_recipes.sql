-- Insert some sample recipes for testing
-- Note: These will use a placeholder user_id that should be replaced with actual user IDs
insert into public.recipes (
  title,
  description,
  ingredients,
  instructions,
  prep_time,
  cook_time,
  servings,
  difficulty,
  cuisine_type,
  dietary_tags,
  author_id
) values 
(
  'Classic Spaghetti Carbonara',
  'A traditional Italian pasta dish with eggs, cheese, and pancetta',
  ARRAY['400g spaghetti', '200g pancetta', '4 large eggs', '100g Pecorino Romano cheese', 'Black pepper', 'Salt'],
  ARRAY['Boil salted water and cook spaghetti until al dente', 'Fry pancetta until crispy', 'Whisk eggs with grated cheese and pepper', 'Drain pasta, reserving pasta water', 'Mix hot pasta with pancetta', 'Remove from heat and add egg mixture, tossing quickly', 'Add pasta water if needed for creaminess'],
  15,
  15,
  4,
  'medium',
  'Italian',
  ARRAY['gluten-containing'],
  '00000000-0000-0000-0000-000000000000'
),
(
  'Vegetarian Buddha Bowl',
  'A nutritious and colorful bowl packed with vegetables and quinoa',
  ARRAY['1 cup quinoa', '2 cups mixed greens', '1 avocado', '1 cup roasted sweet potato', '1/2 cup chickpeas', '1/4 cup pumpkin seeds', 'Tahini dressing'],
  ARRAY['Cook quinoa according to package instructions', 'Roast sweet potato cubes at 400°F for 25 minutes', 'Prepare tahini dressing', 'Arrange all ingredients in a bowl', 'Drizzle with dressing and serve'],
  20,
  25,
  2,
  'easy',
  'Mediterranean',
  ARRAY['vegetarian', 'vegan', 'gluten-free'],
  '00000000-0000-0000-0000-000000000000'
),
(
  'Chocolate Chip Cookies',
  'Classic homemade chocolate chip cookies that are crispy on the outside and chewy inside',
  ARRAY['2 1/4 cups all-purpose flour', '1 tsp baking soda', '1 tsp salt', '1 cup butter', '3/4 cup granulated sugar', '3/4 cup brown sugar', '2 large eggs', '2 tsp vanilla extract', '2 cups chocolate chips'],
  ARRAY['Preheat oven to 375°F', 'Mix flour, baking soda, and salt in a bowl', 'Cream butter and sugars until fluffy', 'Beat in eggs and vanilla', 'Gradually blend in flour mixture', 'Stir in chocolate chips', 'Drop rounded tablespoons onto ungreased cookie sheets', 'Bake 9-11 minutes until golden brown'],
  15,
  10,
  48,
  'easy',
  'American',
  ARRAY['vegetarian'],
  '00000000-0000-0000-0000-000000000000'
);
