import React, { useState } from 'react';
import { Bot, Sparkles, Search, TrendingUp } from 'lucide-react';
import { Product } from '../types';

interface AIFeaturesProps {
  products: Product[];
  onProductRecommend: (products: Product[]) => void;
}

const AIFeatures: React.FC<AIFeaturesProps> = ({ products, onProductRecommend }) => {
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAISearch = async () => {
    if (!aiQuery.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const responses = [
        "Protein açısından zengin ürünler için: Badem, Ceviz ve Fıstık türlerini öneririm. Bu ürünler besleyici değeri yüksek ve toptan fiyatları uygun.",
        "Kış ayları için: Kuru meyve karışımları ve vitamin deposu olan kuru incir, kayısı tercih edilebilir.",
        "Kahvaltılık için: Bal ile karıştırılabilen ceviz içi ve badem ideal seçeneklerdir.",
        "Çerezlik ürünler: Tuzlu ay çekirdeği, leblebi ve tuzlu fıstık popüler seçeneklerdir."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setAiResponse(randomResponse);
      
      // Recommend some products based on query
      const relevantProducts = products.slice(0, 3);
      onProductRecommend(relevantProducts);
      
      setIsProcessing(false);
    }, 2000);
  };

  const seoSuggestions = [
    {
      title: "Anahtar Kelime Optimizasyonu",
      suggestion: "Ana sayfa için 'kuruyemiş toptan', 'kuru meyve satış' kelimeleri ekleyin"
    },
    {
      title: "Meta Açıklama",
      suggestion: "Ürün sayfalarına özel meta açıklamaları ekleyin"
    },
    {
      title: "Görsel Alt Metinleri",
      suggestion: "Ürün görselleri için açıklayıcı alt text'ler ekleyin"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">AI Destekli Özellikler</h2>
          <p className="text-gray-600">Yapay zeka destekli ürün önerileri ve SEO optimizasyonu</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* AI Product Advisor */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-800">AI Ürün Danışmanı</h3>
          </div>
          
          <div className="space-y-3">
            <textarea
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder="Hangi ürünleri arıyorsunuz? (örn: protein açısından zengin ürünler)"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none resize-none"
              rows={2}
            />
            
            <button
              onClick={handleAISearch}
              disabled={isProcessing || !aiQuery.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  İşleniyor...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  AI Önerisini Al
                </>
              )}
            </button>
            
            {aiResponse && (
              <div className="bg-white p-3 rounded-lg border-l-4 border-purple-500">
                <p className="text-sm text-gray-700">{aiResponse}</p>
              </div>
            )}
          </div>
        </div>

        {/* SEO Recommendations */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-gray-800">AI SEO Önerileri</h3>
          </div>
          
          <div className="space-y-3">
            {seoSuggestions.map((item, index) => (
              <div key={index} className="bg-white p-3 rounded-lg">
                <h4 className="font-medium text-gray-800 text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-gray-600">{item.suggestion}</p>
              </div>
            ))}
            
            <button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white py-2 rounded-lg font-medium transition-all duration-200">
              SEO Raporunu Görüntüle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFeatures;