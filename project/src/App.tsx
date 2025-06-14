import React, { useState, useMemo } from 'react';
import { Shield } from 'lucide-react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import CategoryFilter from './components/CategoryFilter';
import ProductModal from './components/ProductModal';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import AIFeatures from './components/AIFeatures';
import { useCart } from './hooks/useCart';
import { useFirestore } from './hooks/useFirestore';
import { useAuth } from './hooks/useAuth';
import { products as fallbackProducts, categories } from './data/products';
import { Product } from './types';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  const cart = useCart();
  const { products: firestoreProducts, loading, addOrder } = useFirestore();
  const { user } = useAuth();

  // Use Firebase products if available, otherwise fallback to static data
  const products = firestoreProducts.length > 0 ? firestoreProducts : fallbackProducts;

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'Tümü' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCheckout = async () => {
    if (user && cart.items.length > 0) {
      const order = {
        userId: user.uid,
        items: cart.items,
        total: cart.getTotalPrice(),
        status: 'pending' as const,
        shippingAddress: 'Adres bilgisi alınacak'
      };
      
      const result = await addOrder(order);
      if (result.success) {
        alert('Siparişiniz başarıyla alındı! Firebase\'de kaydedildi.');
        cart.clearCart();
      } else {
        alert('Sipariş kaydedilirken hata oluştu: ' + result.error);
      }
    } else if (!user) {
      alert('Sipariş vermek için giriş yapmanız gerekiyor.');
    } else {
      alert('Sepetiniz boş!');
    }
  };

  const handleProductRecommend = (recommended: Product[]) => {
    setRecommendedProducts(recommended);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Firebase'den veriler yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemsCount={cart.getTotalItems()}
        onCartClick={() => cart.setIsOpen(true)}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-2xl text-white p-8 mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Köroğlu Kuruyemiş'e Hoş Geldiniz
            </h1>
            <p className="text-xl mb-6 text-emerald-100">
              1985'den beri kaliteli kuruyemiş ve kuru meyve toptan satışında güvenilir adresiniz
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                <span className="font-semibold">✓ Firebase Entegrasyonu</span>
              </div>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                <span className="font-semibold">✓ Gerçek Zamanlı Veri</span>
              </div>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                <span className="font-semibold">✓ Güvenli Ödeme</span>
              </div>
              {user && (
                <button
                  onClick={() => setIsAdminPanelOpen(true)}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Admin Panel
                </button>
              )}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white bg-opacity-5 rounded-full translate-y-24 -translate-x-24"></div>
        </div>

        {/* AI Features */}
        <AIFeatures 
          products={products}
          onProductRecommend={handleProductRecommend}
        />

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              AI Önerilen Ürünler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={cart.addToCart}
                  onViewDetails={handleProductClick}
                />
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Products Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Ürünlerimiz ({filteredProducts.length})
            {firestoreProducts.length > 0 && (
              <span className="text-sm font-normal text-emerald-600 ml-2">
                • Firebase'den yüklendi
              </span>
            )}
          </h2>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-500 text-lg">Aradığınız kriterlerde ürün bulunamadı.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Tümü');
                }}
                className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Filtreleri Temizle
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={cart.addToCart}
                  onViewDetails={handleProductClick}
                />
              ))}
            </div>
          )}
        </div>

        {/* Wholesale Info */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-amber-900 mb-3">Firebase Destekli Toptan Satış</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">🔥</span>
              </div>
              <div>
                <div className="font-semibold text-amber-900">Gerçek Zamanlı Fiyatlar</div>
                <div className="text-amber-700 text-sm">Firebase ile anlık güncelleme</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">🔒</span>
              </div>
              <div>
                <div className="font-semibold text-amber-900">Güvenli Alışveriş</div>
                <div className="text-amber-700 text-sm">Firebase Authentication ile korumalı</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">📊</span>
              </div>
              <div>
                <div className="font-semibold text-amber-900">Detaylı Analitik</div>
                <div className="text-amber-700 text-sm">Firebase Analytics ile takip</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={cart.isOpen}
        onClose={() => cart.setIsOpen(false)}
        items={cart.items}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeFromCart}
        totalPrice={cart.getTotalPrice()}
        onCheckout={handleCheckout}
      />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={cart.addToCart}
      />

      {/* Admin Panel */}
      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
      />
    </div>
  );
}

export default App;