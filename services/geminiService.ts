
import { type CartItem, type Recipe } from '../types';

// --- MOCK DATA ---
const MOCK_DAILY_RECIPES: Recipe[] = [
    {
        name: "Chole Bhature (Chola Puri)",
        ingredients: [
            "1 cup chickpeas (chole), soaked overnight",
            "1 onion, finely chopped",
            "2 tomatoes, pureed",
            "1 tsp ginger-garlic paste",
            "Spices: turmeric, chili powder, coriander powder",
            "For Bhature: 2 cups all-purpose flour, 1/4 cup yogurt, pinch of baking soda, oil for frying"
        ],
        instructions: "1. Cook soaked chickpeas until soft. 2. Sauté onions, ginger-garlic paste, and tomato puree. 3. Add spices and cooked chickpeas. Simmer for 15 mins. 4. For bhature, knead dough and let it rest. 5. Roll and deep-fry until golden brown. Serve hot."
    },
    {
        name: "Quick Onion-Tomato Raita",
        ingredients: [
            "1 cup thick yogurt (curd)",
            "1 small onion, finely chopped",
            "1 small tomato, finely chopped",
            "1/4 tsp roasted cumin powder",
            "Salt to taste",
            "Fresh coriander for garnish"
        ],
        instructions: "1. Whisk the yogurt until smooth. 2. Add the chopped onion, tomato, cumin powder, and salt. 3. Mix everything well. 4. Garnish with fresh coriander leaves. Serve chilled."
    },
    {
        name: "Simple Cucumber Salad",
        ingredients: [
            "1 large cucumber, thinly sliced",
            "1/2 lemon, juiced",
            "A pinch of black pepper",
            "Salt to taste"
        ],
        instructions: "1. Place cucumber slices in a bowl. 2. Drizzle with lemon juice. 3. Sprinkle with salt and pepper. 4. Toss gently to combine. Serve immediately for a refreshing side."
    }
];

const MOCK_GENERATED_RECIPE = `
**Simple Tomato and Onion Pasta**

Here is a quick and easy pasta dish you can make with the items in your cart.

**Ingredients:**
- 200g Pasta (any kind)
- 2 large Tomatoes, chopped
- 1 Onion, chopped
- 2 cloves Garlic, minced
- 2 tbsp Olive Oil
- Salt and Pepper to taste
- Fresh basil (optional)

**Instructions:**
1. Cook pasta according to package directions.
2. While pasta is cooking, heat olive oil in a pan over medium heat.
3. Add the chopped onion and garlic and cook until softened (about 5 minutes).
4. Add the chopped tomatoes, salt, and pepper. Cook for 10-12 minutes, until tomatoes break down into a sauce.
5. Drain the cooked pasta and add it to the sauce.
6. Toss everything together to combine.
7. Garnish with fresh basil if desired and serve immediately.
`;
// --- END MOCK DATA ---


export const generateRecipe = async (ingredients: CartItem[], language: 'en' | 'ta'): Promise<string> => {
    console.log("Using mock recipe for ingredients:", ingredients.map(i => i.name).join(', '));
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // In a real app with translations, you'd select the mock recipe based on language.
    // For now, we return the English version.
    return MOCK_GENERATED_RECIPE;
};

export const generateDailyRecipes = async (language: 'en' | 'ta'): Promise<Recipe[]> => {
    console.log("Using mock daily recipes.");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // In a real app with translations, you'd select the mock recipe based on language.
    // For now, we return the English version.
    return MOCK_DAILY_RECIPES;
};
