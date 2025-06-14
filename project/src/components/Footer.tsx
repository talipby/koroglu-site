import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-xl">🌰</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Köroğlu Kuruyemiş</h3>
                <p className="text-gray-300 text-sm">Toptan Satış Merkezi</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              1985'den beri kaliteli kuruyemiş ve kuru meyve toptan satışında 
              güvenilir adresiniz. Taze, doğal ve uygun fiyatlı ürünler.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">İletişim</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-300">+90 342 123 45 67</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-300">info@koroglukuruyemis.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 mt-1" />
                <span className="text-gray-300">
                  Kuruyemiş Çarşısı No:15<br />
                  Gaziantep, Türkiye
                </span>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Çalışma Saatleri</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-300">Pazartesi - Cumartesi</span>
              </div>
              <p className="text-gray-300 ml-8">08:00 - 18:00</p>
              <p className="text-gray-300 ml-8">
                <span className="text-emerald-400">Pazar:</span> Kapalı
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hızlı Linkler</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                Hakkımızda
              </a>
              <a href="#" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                Ürünlerimiz
              </a>
              <a href="#" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                Toptan Fiyat Listesi
              </a>
              <a href="#" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                Sipariş Koşulları
              </a>
              <a href="#" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                İletişim
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © 2025 Köroğlu Kuruyemiş. Tüm hakları saklıdır.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
              Gizlilik Politikası
            </a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
              Kullanım Koşulları
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;