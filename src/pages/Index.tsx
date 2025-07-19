import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const Index = () => {
  const navigate = useNavigate();
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [passengers, setPassengers] = useState(1);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const swapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleLogin = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setUserName('');
    } else {
      setShowLogin(true);
    }
  };

  const submitLogin = () => {
    setIsLoggedIn(true);
    setUserName('Пользователь');
    setShowLogin(false);
  };

  const selectRoute = (route: any) => {
    setFromCity(route.from);
    setToCity(route.to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const popularRoutes = [
    { from: 'Москва', to: 'Санкт-Петербург', price: '1200₽', duration: '8ч 30м', available: 24 },
    { from: 'Екатеринбург', to: 'Челябинск', price: '800₽', duration: '3ч 15м', available: 18 },
    { from: 'Казань', to: 'Нижний Новгород', price: '950₽', duration: '4ч 45м', available: 12 },
    { from: 'Ростов-на-Дону', to: 'Краснодар', price: '700₽', duration: '2ч 50м', available: 30 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm animate-fade-in">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Icon name="Bus" size={32} className="text-primary" />
            <h1 className="text-2xl font-montserrat font-bold text-gray-900">БусБилет</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <button onClick={() => scrollToSection('routes')} className="text-gray-600 hover:text-primary transition-colors">Маршруты</button>
            <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-primary transition-colors">О нас</button>
            <button onClick={() => scrollToSection('footer')} className="text-gray-600 hover:text-primary transition-colors">Контакты</button>
            <button onClick={() => navigate('/admin')} className="text-gray-600 hover:text-primary transition-colors">Админ</button>
          </nav>
          <Button onClick={handleLogin} variant="outline" className="hidden md:block">
            <Icon name="User" size={16} className="mr-2" />
            {isLoggedIn ? userName : 'Войти'}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 animate-scale-in">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-montserrat font-bold text-gray-900 mb-6">
            Найдите лучшие
            <span className="text-primary"> автобусные билеты</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 font-open-sans">
            Быстро, удобно и безопасно — ваше путешествие начинается здесь
          </p>

          {/* Search Form */}
          <Card className="max-w-4xl mx-auto shadow-xl animate-bounce-in">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                {/* From City */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Откуда</label>
                  <div className="relative">
                    <Icon name="MapPin" size={18} className="absolute left-3 top-3 text-gray-400" />
                    <Input
                      placeholder="Город отправления"
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center lg:justify-start">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={swapCities}
                    className="h-12 w-12 rounded-full hover:scale-110 transition-transform"
                  >
                    <Icon name="ArrowLeftRight" size={20} />
                  </Button>
                </div>

                {/* To City */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Куда</label>
                  <div className="relative">
                    <Icon name="MapPin" size={18} className="absolute left-3 top-3 text-gray-400" />
                    <Input
                      placeholder="Город назначения"
                      value={toCity}
                      onChange={(e) => setToCity(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Дата поездки</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full h-12 justify-start text-left font-normal"
                      >
                        <Icon name="Calendar" size={18} className="mr-2" />
                        {date ? format(date, 'PPP', { locale: ru }) : 'Выберите дату'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        locale={ru}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Passengers */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Пассажиры</label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      className="h-12 w-12"
                    >
                      <Icon name="Minus" size={16} />
                    </Button>
                    <Input
                      value={passengers}
                      readOnly
                      className="text-center h-12 w-16"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPassengers(passengers + 1)}
                      className="h-12 w-12"
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => {
                  if (!fromCity || !toCity) {
                    alert('Пожалуйста, укажите город отправления и назначения');
                    return;
                  }
                  navigate('/search', { 
                    state: { 
                      fromCity, 
                      toCity, 
                      date: date?.toISOString(), 
                      passengers 
                    } 
                  });
                }}
                className="w-full mt-8 h-14 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
              >
                <Icon name="Search" size={20} className="mr-2" />
                Найти билеты
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96 p-6">
            <CardHeader>
              <CardTitle>Вход в аккаунт</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Email или телефон" />
              <Input type="password" placeholder="Пароль" />
              <div className="flex space-x-2">
                <Button onClick={submitLogin} className="flex-1">Войти</Button>
                <Button onClick={() => setShowLogin(false)} variant="outline" className="flex-1">Отмена</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Popular Routes */}
      <section id="routes" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-montserrat font-bold text-gray-900 mb-4">
              Популярные маршруты
            </h3>
            <p className="text-lg text-gray-600 font-open-sans">
              Самые востребованные направления наших пассажиров
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoutes.map((route, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {route.available} мест
                    </Badge>
                    <Icon name="ArrowRight" size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="Circle" size={8} className="text-primary" />
                      <span className="text-sm text-gray-600">{route.from}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="MapPin" size={8} className="text-secondary" />
                      <span className="text-sm text-gray-600">{route.to}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-primary">{route.price}</span>
                        <span className="text-sm text-gray-500">{route.duration}</span>
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => selectRoute(route)} className="w-full mt-4" variant="outline">
                    Выбрать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-montserrat font-bold text-gray-900 mb-4">
              Почему выбирают нас
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon name="Shield" size={32} className="text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Безопасность</h4>
              <p className="text-gray-600">SMS и email уведомления о бронировании и изменениях рейсов</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                <Icon name="Clock" size={32} className="text-secondary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Быстрое бронирование</h4>
              <p className="text-gray-600">Покупка билетов онлайн за несколько минут</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Icon name="Phone" size={32} className="text-accent" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Поддержка 24/7</h4>
              <p className="text-gray-600">Круглосуточная помощь и консультации</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Bus" size={28} className="text-primary" />
                <h5 className="text-xl font-montserrat font-bold">БусБилет</h5>
              </div>
              <p className="text-gray-400">
                Ваш надежный партнер в автобусных путешествиях по всей России
              </p>
            </div>

            <div>
              <h6 className="font-semibold mb-4">Компания</h6>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">О нас</button></li>
                <li><button onClick={() => alert('Раздел в разработке')} className="hover:text-white transition-colors">Вакансии</button></li>
                <li><button onClick={() => alert('Раздел в разработке')} className="hover:text-white transition-colors">Пресс-центр</button></li>
              </ul>
            </div>

            <div>
              <h6 className="font-semibold mb-4">Поддержка</h6>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => alert('Чат поддержки открыт!')} className="hover:text-white transition-colors">Помощь</button></li>
                <li><button onClick={() => alert('Правила перевозки и использования сервиса')} className="hover:text-white transition-colors">Правила</button></li>
                <li><button onClick={() => alert('Возврат билетов: до 3 часов бесплатно, далее 200₽ комиссия')} className="hover:text-white transition-colors">Возврат билетов</button></li>
              </ul>
            </div>

            <div>
              <h6 className="font-semibold mb-4">Контакты</h6>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} />
                  <button onClick={() => window.open('tel:88005550123')} className="hover:text-white transition-colors">8 800 555-0123</button>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} />
                  <button onClick={() => window.open('mailto:info@busbilet.ru')} className="hover:text-white transition-colors">info@busbilet.ru</button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 БусБилет. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;