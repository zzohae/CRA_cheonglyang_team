// react
import React, { useState, useEffect } from 'react';
// data
import { supabase2 } from '../../api/dbConnect';
// Components
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
          .select('img_number, title, start_date, end_date')
          .order('start_date', { ascending: false });

        if (error) {
          console.error('Error fetching events:', error);
          return;
        }
        const today = new Date();

        // expired, !expired 분리
        const futureEvents = data.filter(event => new Date(event.end_date) >= today);
        const pastEvents = data.filter(event => new Date(event.end_date) < today);

        // 데이터별 순서
        const sortedEvents = [...futureEvents, ...pastEvents];

        // 상태 업데이트
        setEvents(sortedEvents);
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
        <div className="row gx-4 gy-4 justify-content-start">
          {currentEvents.map((event) => {
            const formattedStartDate = new Date(event.start_date).toLocaleDateString();
            const formattedEndDate = new Date(event.end_date).toLocaleDateString();
            const formattedPeriod = `${formattedStartDate} ~ ${formattedEndDate}`;

            const expired = isEventExpired(event.end_date);

            return (
              <EventCard
                key={event.id}
                imgSrc={`/asset/img/event/event_card_${event.img_number}.jpg`}
                title={event.title}
                period={formattedPeriod}
                isExpired={expired}
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
