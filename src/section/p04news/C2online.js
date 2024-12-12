import React, { useState, useEffect } from 'react';
import { supabase2 } from '../../api/dbConnect';
import EventCard from '../../component/EventCard';
import MyPagination from '../../component/MyPagination';

export default function C2online() {

    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 9;

    useEffect(() => {
      const fetchEvents = async () => {
        const { data, error } = await supabase2
          .from('onEvents')
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

    // 종료된 이벤트
    const isEventExpired = (endDate) => {
      const currentDate = new Date();
      const eventEndDate = new Date(endDate);
      return currentDate > eventEndDate;
    };

    return (
      <div>
        <div className="row gx-4 gy-4">
          {currentEvents.map((event) => {
            const formattedStartDate = new Date(event.start_date).toLocaleDateString();
            const formattedEndDate = new Date(event.end_date).toLocaleDateString();
            const formattedPeriod = `${formattedStartDate} ~ ${formattedEndDate}`;

            const expired = isEventExpired(event.end_date); // 종료 여부 계산

            return (
              <EventCard
                key={event.id}
                imgSrc={`/asset/img/event/event_card_${event.img_number}.jpg`}
                title={event.title}
                period={formattedPeriod}
                isExpired={expired} // 종료 여부를 카드에 전달
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
