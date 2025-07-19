import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface RouteData {
  id: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  price: number;
  company: string;
  seats: number;
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('routes');
  
  const [routes, setRoutes] = useState<RouteData[]>([
    {
      id: '1',
      from: 'Москва',
      to: 'Санкт-Петербург',
      departure: '08:00',
      arrival: '16:30',
      price: 1200,
      company: 'Комфорт Авто',
      seats: 45
    },
    {
      id: '2',
      from: 'Москва',
      to: 'Казань',
      departure: '09:30',
      arrival: '21:00',
      price: 1800,
      company: 'Быстрая поездка',
      seats: 50
    }
  ]);

  const handleLogin = () => {
    if (email === 'busfleet@mail.ru' && password === '123456') {
      setIsAuthenticated(true);
    } else {
      alert('Неверный логин или пароль');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  const deleteRoute = (id: string) => {
    setRoutes(routes.filter(route => route.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center space-x-2">
              <Icon name="Shield" size={24} />
              <span>Админ-панель</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="busfleet@mail.ru"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Пароль</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleLogin} className="flex-1">
                Войти
              </Button>
              <Button onClick={() => navigate('/')} variant="outline" className="flex-1">
                На сайт
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-lg font-semibold text-primary">
                <Icon name="Shield" size={24} />
                <span>Админ-панель БусБилет</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">busfleet@mail.ru</span>
              <Button onClick={() => navigate('/')} variant="outline" size="sm">
                На сайт
              </Button>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          <Button
            onClick={() => setActiveTab('routes')}
            variant={activeTab === 'routes' ? 'default' : 'outline'}
          >
            <Icon name="Route" size={16} className="mr-2" />
            Маршруты
          </Button>
          <Button
            onClick={() => setActiveTab('bookings')}
            variant={activeTab === 'bookings' ? 'default' : 'outline'}
          >
            <Icon name="Ticket" size={16} className="mr-2" />
            Бронирования
          </Button>
          <Button
            onClick={() => setActiveTab('analytics')}
            variant={activeTab === 'analytics' ? 'default' : 'outline'}
          >
            <Icon name="BarChart3" size={16} className="mr-2" />
            Аналитика
          </Button>
        </div>

        {/* Routes Tab */}
        {activeTab === 'routes' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Управление маршрутами</h1>
              <Button>
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить маршрут
              </Button>
            </div>

            <div className="grid gap-4">
              {routes.map((route) => (
                <Card key={route.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div>
                          <div className="font-semibold">{route.from} → {route.to}</div>
                          <div className="text-sm text-gray-600">{route.company}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Отправление</div>
                          <div className="font-semibold">{route.departure}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Прибытие</div>
                          <div className="font-semibold">{route.arrival}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Цена</div>
                          <div className="font-semibold">{route.price}₽</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Мест</div>
                          <div className="font-semibold">{route.seats}</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Icon name="Edit" size={14} />
                        </Button>
                        <Button 
                          onClick={() => deleteRoute(route.id)}
                          size="sm" 
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Бронирования</h1>
            <Card>
              <CardContent className="p-8 text-center">
                <Icon name="Calendar" size={48} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Бронирования будут отображаться здесь</h3>
                <p className="text-gray-600">Когда пользователи начнут бронировать билеты, вы увидите их в этом разделе</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Аналитика</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Всего маршрутов</p>
                      <p className="text-2xl font-bold">{routes.length}</p>
                    </div>
                    <Icon name="Route" size={24} className="text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Продано билетов</p>
                      <p className="text-2xl font-bold">0</p>
                    </div>
                    <Icon name="Ticket" size={24} className="text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Выручка</p>
                      <p className="text-2xl font-bold">0₽</p>
                    </div>
                    <Icon name="DollarSign" size={24} className="text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;