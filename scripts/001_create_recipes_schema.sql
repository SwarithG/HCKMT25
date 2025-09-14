-- Create profiles table for user management
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  bio text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "profiles_delete_own"
  on public.profiles for delete
  using (auth.uid() = id);

-- Create recipes table
create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  ingredients text[] not null,
  instructions text[] not null,
  prep_time integer, -- in minutes
  cook_time integer, -- in minutes
  servings integer,
  difficulty text check (difficulty in ('easy', 'medium', 'hard')),
  cuisine_type text,
  dietary_tags text[], -- vegetarian, vegan, gluten-free, etc.
  image_url text,
  author_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.recipes enable row level security;

-- Allow anyone to view recipes
create policy "recipes_select_all"
  on public.recipes for select
  using (true);

-- Allow users to insert their own recipes
create policy "recipes_insert_own"
  on public.recipes for insert
  with check (auth.uid() = author_id);

-- Allow users to update their own recipes
create policy "recipes_update_own"
  on public.recipes for update
  using (auth.uid() = author_id);

-- Allow users to delete their own recipes
create policy "recipes_delete_own"
  on public.recipes for delete
  using (auth.uid() = author_id);

-- Create recipe ratings table
create table if not exists public.recipe_ratings (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  rating integer not null check (rating >= 1 and rating <= 5),
  review text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(recipe_id, user_id)
);

alter table public.recipe_ratings enable row level security;

-- Allow anyone to view ratings
create policy "ratings_select_all"
  on public.recipe_ratings for select
  using (true);

-- Allow users to insert their own ratings
create policy "ratings_insert_own"
  on public.recipe_ratings for insert
  with check (auth.uid() = user_id);

-- Allow users to update their own ratings
create policy "ratings_update_own"
  on public.recipe_ratings for update
  using (auth.uid() = user_id);

-- Allow users to delete their own ratings
create policy "ratings_delete_own"
  on public.recipe_ratings for delete
  using (auth.uid() = user_id);

-- Create recipe favorites table
create table if not exists public.recipe_favorites (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(recipe_id, user_id)
);

alter table public.recipe_favorites enable row level security;

-- Allow users to view their own favorites
create policy "favorites_select_own"
  on public.recipe_favorites for select
  using (auth.uid() = user_id);

-- Allow users to insert their own favorites
create policy "favorites_insert_own"
  on public.recipe_favorites for insert
  with check (auth.uid() = user_id);

-- Allow users to delete their own favorites
create policy "favorites_delete_own"
  on public.recipe_favorites for delete
  using (auth.uid() = user_id);
