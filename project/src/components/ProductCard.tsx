import React from 'react';
import { ShoppingCart, Info } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onViewDetails 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Stokta Yok</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
          {product.category}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        {/* Origin */}
        {product.origin && (
          <p className="text-emerald-600 text-sm mb-2">📍 {product.origin}</p>
        )}

        {/* Pricing */}
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-500 line-through">
                ₺{product.price.toFixed(2)}/{product.unit}
              </span>
              <div className="text-2xl font-bold text-emerald-600">
                ₺{product.wholesalePrice.toFixed(2)}/{product.unit}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Min. Sipariş</div>
              <div className="font-semibold text-gray-700">{product.minOrder} {product.unit}</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(product)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Info className="w-4 h-4" />
            Detay
          </button>
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105 disabled:hover:scale-100"
          >
            <ShoppingCart className="w-4 h-4" />
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;