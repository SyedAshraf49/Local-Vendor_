
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslations } from '../../hooks/useTranslations';
import { generateDailyRecipes } from '../../services/geminiService';
import { BookOpenIcon } from '../common/Icons';
import { type Recipe } from '../../types';

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => (
    <div className="flex-shrink-0 w-80 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border dark:border-gray-600">
        <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">{recipe.name}</h4>
        <div className="text-sm text-gray-600 dark:text-gray-300">
            <h5 className="font-semibold mb-1">Ingredients:</h5>
            <ul className="list-disc pl-5 space-y-1 mb-3">
                {recipe.ingredients.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <h5 className="font-semibold mb-1">Instructions:</h5>
            <p className="whitespace-pre-wrap">{recipe.instructions}</p>
        </div>
    </div>
);

const RecipeSkeleton: React.FC = () => (
    <div className="flex-shrink-0 w-80 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border dark:border-gray-600 animate-pulse">
        <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-3"></div>
        <div className="space-y-2">
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
        </div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 my-3"></div>
        <div className="space-y-2">
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-4/5"></div>
        </div>
    </div>
);


const RecipeOfTheDay: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { language } = useLanguage();
    const t = useTranslations();

    useEffect(() => {
        const fetchRecipes = async () => {
            setIsLoading(true);
            const result = await generateDailyRecipes((language === 'en' || language === 'ta') ? language : 'en');
            setRecipes(result);
            setIsLoading(false);
        };
        fetchRecipes();
    }, [language]);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
                <BookOpenIcon className="h-8 w-8 text-indigo-500" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{t.recipeOfTheDay}</h3>
            </div>
            <div className="flex overflow-x-auto space-x-6 pb-4 -m-2 p-2">
                {isLoading ? (
                    <>
                        <RecipeSkeleton />
                        <RecipeSkeleton />
                        <RecipeSkeleton />
                    </>
                ) : recipes.length > 0 ? (
                    recipes.map((recipe, index) => <RecipeCard key={index} recipe={recipe} />)
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">Could not fetch recipes right now.</p>
                )}
            </div>
        </div>
    );
};

export default RecipeOfTheDay;
