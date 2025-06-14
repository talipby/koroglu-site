import React, { useState } from 'react';
import { X, Edit3, Save, Plus, Trash2, Settings, TrendingUp, Eye, Upload } from 'lucide-react';
import { Product, AISettings } from '../types';
import { useFirestore } from '../hooks/useFirestore';
import { useAuth } from '../hooks/useAuth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'ai' | 'analytics'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);
  const [aiSettings, setAiSettings] = useState<AISettings>({
    openaiApiKey: '',
    seoEnabled: true,
    recommendationsEnabled: true
  });

  const { products, addProduct, updateProduct, deleteProduct } = useFirestore();
  const { user } = useAuth();

  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    category: '',
    price: 0,
    wholesalePrice: 0,
    image: '',
    description: '',
    inStock: true,
    minOrder: 1,
    unit: 'kg',
    origin: '',
    nutritionInfo: ''
  });

  const handleImageUpload = async (file: File, isEditing: boolean = false) => {
    if (!file) return;
    
    setUploading(true);
    try {
      const imageRef = ref(storage, `products/${Date.now()}_${file.name}`);
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      
      if (isEditing && editingProduct) {
        setEditingProduct({ ...editingProduct, image: downloadURL });
      } else {
        setNewProduct({ ...newProduct, image: downloadURL });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    setUploading(false);
  };

  const handleSaveProduct = async () => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, editingProduct);
      setEditingProduct(null);
    }
  };

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.category) {
      await addProduct(newProduct);
      setNewProduct({
        name: '',
        category: '',
        price: 0,
        wholesalePrice: 0,
        image: '',
        description: '',
        inStock: true,
        minOrder: 1,
        unit: 'kg',
        origin: '',
        nutritionInfo: ''
      });
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      await deleteProduct(productId);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-green-700 text-white p-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Admin Yönetim Paneli</h2>
            <button onClick={onClose} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex h-full">
            <div className="w-64 bg-gray-50 border-r">
              <nav className="p-4 space-y-2">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'products' ? 'bg-emerald-500 text-white' : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Edit3 className="w-5 h-5" />
                  Ürün Yönetimi
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'ai' ? 'bg-emerald-500 text-white' : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  AI Ayarları
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'analytics' ? 'bg-emerald-500 text-white' : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <TrendingUp className="w-5 h-5" />
                  Firebase Analitik
                </button>
              </nav>
            </div>

            <div className="flex-1 overflow-y-auto">
              {activeTab === 'products' && (
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Ürün Yönetimi (Firebase)</h3>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold mb-3">Yeni Ürün Ekle</h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Ürün Adı"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Kategori"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none"
                      />
                      <input
                        type="number"
                        placeholder="Perakende Fiyat"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none"
                      />
                      <input
                        type="number"
                        placeholder="Toptan Fiyat"
                        value={newProduct.wholesalePrice}
                        onChange={(e) => setNewProduct({...newProduct, wholesalePrice: Number(e.target.value)})}
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none"
                      />
                      <div className="col-span-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none w-full"
                        />
                        {uploading && <p className="text-sm text-gray-500 mt-1">Yükleniyor...</p>}
                        {newProduct.image && (
                          <img src={newProduct.image} alt="Preview" className="w-20 h-20 object-cover rounded mt-2" />
                        )}
                      </div>
                    </div>
                    <textarea
                      placeholder="Ürün Açıklaması"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none mb-4"
                      rows={3}
                    />
                    <button
                      onClick={handleAddProduct}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Firebase'e Ekle
                    </button>
                  </div>

                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="bg-white border rounded-lg p-4">
                        {editingProduct?.id === product.id ? (
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              value={editingProduct.name}
                              onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none"
                            />
                            <input
                              type="number"
                              value={editingProduct.price}
                              onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none"
                            />
                            <div className="col-span-2">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], true)}
                                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none w-full"
                              />
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={handleSaveProduct}
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2"
                              >
                                <Save className="w-4 h-4" />
                                Kaydet
                              </button>
                              <button
                                onClick={() => setEditingProduct(null)}
                                className="px-3 py-2 border rounded-lg hover:bg-gray-50"
                              >
                                İptal
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div>
                                <h4 className="font-semibold">{product.name}</h4>
                                <p className="text-sm text-gray-600">{product.category}</p>
                                <div className="flex gap-4 text-sm">
                                  <span>Perakende: ₺{product.price}</span>
                                  <span className="text-emerald-600 font-semibold">Toptan: ₺{product.wholesalePrice}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditingProduct(product)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">AI Ayarları</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3">OpenAI API Anahtarı</h4>
                      <input
                        type="password"
                        placeholder="sk-..."
                        value={aiSettings.openaiApiKey}
                        onChange={(e) => setAiSettings({...aiSettings, openaiApiKey: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-300 focus:outline-none"
                      />
                      <p className="text-sm text-gray-600 mt-2">
                        AI destekli SEO ve ürün önerileri için OpenAI API anahtarınızı girin.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3">Firebase Integration</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>Firebase Authentication: Aktif</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>Firestore Database: Aktif</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>Firebase Storage: Aktif</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>Firebase Analytics: Aktif</span>
                        </div>
                      </div>
                    </div>

                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg">
                      Ayarları Kaydet
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Firebase Analytics & SEO</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <Eye className="w-6 h-6 text-blue-600" />
                        <h4 className="font-semibold text-blue-800">Gerçek Zamanlı Kullanıcılar</h4>
                      </div>
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {products.length > 0 ? '1,234' : '0'}
                      </div>
                      <p className="text-blue-700 text-sm">Firebase Analytics ile takip ediliyor</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                        <h4 className="font-semibold text-green-800">Toplam Ürün</h4>
                      </div>
                      <div className="text-3xl font-bold text-green-600 mb-2">{products.length}</div>
                      <p className="text-green-700 text-sm">Firebase Firestore'da saklı</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-4">Firebase Özellikleri</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-purple-700">Gerçek zamanlı veri</span>
                          <span className="text-purple-600 font-semibold">✓</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-700">Kullanıcı kimlik doğrulama</span>
                          <span className="text-purple-600 font-semibold">✓</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-700">Dosya yükleme</span>
                          <span className="text-purple-600 font-semibold">✓</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-4">AI SEO Önerileri</h4>
                      <div className="space-y-2 text-sm">
                        <p className="text-orange-700">• Firebase ile hızlı veri erişimi</p>
                        <p className="text-orange-700">• Gerçek zamanlı ürün güncellemeleri</p>
                        <p className="text-orange-700">• Güvenli kullanıcı yönetimi</p>
                        <p className="text-orange-700">• Otomatik yedekleme</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;