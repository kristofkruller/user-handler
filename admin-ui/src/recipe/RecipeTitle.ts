import { Recipe as TRecipe } from "../api/recipe/Recipe";

export const RECIPE_TITLE_FIELD = "title";

export const RecipeTitle = (record: TRecipe): string => {
  return record.title?.toString() || String(record.id);
};
