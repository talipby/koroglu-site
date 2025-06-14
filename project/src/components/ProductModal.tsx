import React from 'react';
import { X, ShoppingCart, MapPin, Info } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart
}) => {
  if (!isOpen || !product) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                    <span className="text-white font-semibold text-lg">Stokta Yok</span>
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-lg font-semibold">
                  {product.category}
                </div>
              </div>

              {/* Details */}
              <div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                {/* Origin */}
                {product.origin && (
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                    <span className="text-gray-700">Menşei: <strong>{product.origin}</strong></span>
                  </div>
                )}

                {/* Nutrition Info */}
                {product.nutritionInfo && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-5 h-5 text-emerald-600" />
                      <span className="font-semibold text-gray-700">Besin Değeri (100g):</span>
                    </div>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {product.nutritionInfo}
                    </p>
                  </div>
                )}

                {/* Pricing */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Perakende Fiyat:</span>
                    <span className="text-sm text-gray-500 line-through">
                      ₺{product.price.toFixed(2)}/{product.unit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold text-gray-700">Toptan Fiyat:</span>
                    <span className="text-2xl font-bold text-emerald-600">
                      ₺{product.wholesalePrice.toFixed(2)}/{product.unit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Minimum Sipariş:</span>
                    <span className="font-semibold text-gray-700">
                      {product.minOrder} {product.unit}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  disabled={!product.inStock}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105 disabled:hover:scale-100"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.inStock ? 'Sepete Ekle' : 'Stokta Yok'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;