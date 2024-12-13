// react
import React, { useState, useEffect } from 'react';
// data
import { supabase2 } from '../../api/dbConnect';
// Components
import EventCard from '../../component/EventCard';
import MyPagination from '../../component/MyPagination';

export default function C3offline() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase2
        .from('offEvents')
        .select('id, img_number, title, start_date, end_date')
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data);
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
      <div className="row gx-4 gy-4">
        {currentEvents.map((event) => {
          const formattedStartDate = new Date(event.start_date).toLocaleDateString();
          const formattedEndDate = new Date(event.end_date).toLocaleDateString();
          const formattedPeriod = `${formattedStartDate} ~ ${formattedEndDate}`;

          return (
            <EventCard
              key={event.id}
              imgSrc={`/asset/img/localevent/localcard_${event.img_number}.jpg`}
              title={event.title}
              period={formattedPeriod}
            />
          );
        })}
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
