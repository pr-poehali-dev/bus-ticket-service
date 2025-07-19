import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface FlightResult {
  id: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  company: string;
  seats: number;
}

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = location.state || {};
  
  // Моковые данные рейсов
  const mockFlights: FlightResult[] = [
    {
      id: '1',
      from: searchParams.fromCity || 'Москва',
      to: searchParams.toCity || 'Санкт-Петербург',
      departure: '08:00',
      arrival: '16:30',
      duration: '8ч 30м',
      price: 1200,
      company: 'Комфорт Авто',
      seats: 12
    },
    {
      id: '2',
      from: searchParams.fromCity || 'Москва',
      to: searchParams.toCity || 'Санкт-Петербург',
      departure: '14:30',
      arrival: '23:00',
      duration: '8ч 30м',
      price: 980,
      company: 'Быстрая поездка',
      seats: 8
    },
    {
      id: '3',
      from: searchParams.fromCity || 'Москва',
      to: searchParams.toCity || 'Санкт-Петербург',
      departure: '22:15',
      arrival: '06:45',
      duration: '8ч 30м',
      price: 850,
      company: 'Ночной экспресс',
      seats: 15
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => navigate('/')} 
                variant="ghost" 
                size="sm"
                className="flex items-center space-x-2"
              >
                <Icon name="ArrowLeft" size={16} />
                <span>Назад</span>
              </Button>
              <div className="flex items-center space-x-2 text-lg font-semibold text-primary">
                <Icon name="Bus" size={24} />
                <span>БусБилет</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Summary */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-lg font-semibold">
                  {searchParams.fromCity || 'Москва'} → {searchParams.toCity || 'Санкт-Петербург'}
                </div>
                <div className="text-gray-600">
                  {searchParams.date ? format(new Date(searchParams.date), 'dd MMMM yyyy', { locale: ru }) : 'Сегодня'}
                </div>
                <div className="text-gray-600">
                  {searchParams.passengers || 1} пассажир
                </div>
              </div>
              <Button 
                onClick={() => navigate('/')} 
                variant="outline"
                size="sm"
              >
                Изменить поиск
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Найдено {mockFlights.length} рейсов</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Сортировать по:</span>
            <Button variant="outline" size="sm">Цене</Button>
            <Button variant="outline" size="sm">Времени</Button>
          </div>
        </div>

        {/* Flight Results */}
        <div className="space-y-4">
          {mockFlights.map((flight) => (
            <Card key={flight.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-8">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{flight.departure}</div>
                          <div className="text-sm text-gray-600">{flight.from}</div>
                        </div>
                        
                        <div className="flex-1 text-center">
                          <div className="flex items-center justify-center space-x-2 mb-1">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <div className="flex-1 h-0.5 bg-gray-300"></div>
                            <Icon name="Bus" size={16} className="text-primary" />
                            <div className="flex-1 h-0.5 bg-gray-300"></div>
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <div className="text-sm text-gray-600">{flight.duration}</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-2xl font-bold">{flight.arrival}</div>
                          <div className="text-sm text-gray-600">{flight.to}</div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-8">
                        <div className="text-3xl font-bold text-primary">{flight.price}₽</div>
                        <div className="text-sm text-gray-600">{flight.seats} мест</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-600">
                          <Icon name="Building2" size={14} className="inline mr-1" />
                          {flight.company}
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Icon name="Wifi" size={14} />
                          <Icon name="Coffee" size={14} />
                          <Icon name="Tv" size={14} />
                        </div>
                      </div>
                      
                      <Button className="px-8">
                        Выбрать места
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;