
import React, { useState, useCallback } from 'react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslations } from '../../hooks/useTranslations';
import { generateRecipe } from '../../services/geminiService';
import { RobotIcon } from '../common/Icons';

interface RecipeAssistantProps {
  onClose: () => void;
}

const RecipeAssistant: React.FC<RecipeAssistantProps> = ({ onClose }) => {
  const { cartItems } = useCart();
  const { language } = useLanguage();
  const t = useTranslations();
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateRecipe = useCallback(async () => {
    if (cartItems.length === 0) {
      setRecipe(t.emptyCart);
      return;
    }
    setIsLoading(true);
    setRecipe('');
    // FIX: The `generateRecipe` service only supports 'en' and 'ta'.
    // Default to 'en' if the current language is not supported.
    const result = await generateRecipe(cartItems, (language === 'en' || language === 'ta') ? language : 'en');
    setRecipe(result);
    setIsLoading(false);
  }, [cartItems, language, t.emptyCart]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg flex flex-col max-h-[90vh] animate-scale-in">
        <header className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <RobotIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">{t.recipeAssistant}</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">&times;</button>
        </header>

        <main className="p-6 overflow-y-auto flex-grow">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">{t.generatingRecipe}</p>
            </div>
          )}
          {recipe && (
             <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
                <h3 className="text-lg font-semibold">{t.recipeSuggestion}</h3>
                <p>{recipe}</p>
             </div>
          )}
          {!isLoading && !recipe && (
             <div className="text-center text-gray-500 dark:text-gray-400">
                <p>Have items in your cart? Get a recipe suggestion!</p>
             </div>
          )}
        </main>

        <footer className="p-4 border-t dark:border-gray-700">
          <button
            onClick={handleGenerateRecipe}
            disabled={isLoading || cartItems.length === 0}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-gray-400 disabled:cursor-not-allowed dark:focus:ring-offset-gray-800"
          >
            {t.getRecipeSuggestion}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default RecipeAssistant;
