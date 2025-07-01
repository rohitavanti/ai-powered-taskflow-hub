
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Mock events data
  const [events] = useState([
    {
      id: '1',
      title: 'Team Meeting',
      date: new Date(),
      time: '10:00 AM',
      type: 'meeting'
    },
    {
      id: '2',
      title: 'Project Deadline',
      date: new Date(Date.now() + 86400000), // tomorrow
      time: '11:59 PM',
      type: 'deadline'
    },
    {
      id: '3',
      title: 'Client Call',
      date: new Date(Date.now() + 172800000), // day after tomorrow
      time: '2:00 PM',
      type: 'call'
    }
  ]);

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'deadline': return 'bg-red-100 text-red-800';
      case 'call': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
            <p className="text-muted-foreground">Manage your schedule and events</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Calendar View
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate ? selectedDate.toDateString() : 'Select a Date'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDate ? (
                  <div className="space-y-3">
                    {getEventsForDate(selectedDate).length > 0 ? (
                      getEventsForDate(selectedDate).map(event => (
                        <div key={event.id} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{event.title}</h4>
                            <Badge className={getEventColor(event.type)}>
                              {event.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{event.time}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center py-4">
                        No events for this date
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    Select a date to view events
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {events.slice(0, 3).map(event => (
                    <div key={event.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {event.date.toLocaleDateString()} at {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;
