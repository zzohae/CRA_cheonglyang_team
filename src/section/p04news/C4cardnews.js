// react
import React, { useState, useEffect } from 'react';
// data
import { supabase2 } from '../../api/dbConnect';
// Components
import EventCard from '../../component/EventCard';
import MyPagination from '../../component/MyPagination';

export default function C4cardnews() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase2
          .from('cardNews')
          .select('*')
          .order('id', { ascending: true });
        if (error) throw error;
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error.message);
      }
    };
    fetchEvents();
  }, []);

  const totalPages = Math.ceil(events.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className="row gx-4 gy-4 justify-content-start">
        {currentEvents.map((event) => (
          <EventCard
            key={event.id}
            imgSrc={`/asset/img/cardnews/cardnews_${event.img_number}.jpg`}
            title={event.title}
            period={event.period}
            isExpired={event.isExpired}
          />
        ))}
      </div>

      {/* Pagination */}
      <MyPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
