import React, { useState, useEffect } from 'react';
import EventCard from '../../component/EventCard';
import { supabase2 } from '../../api/dbConnect';
import MyPagination from '../../component/MyPagination';

export default function C3offline() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  // Supabase에서 이벤트 데이터를 가져오는 함수
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase2
        .from('offEvents')
        .select('id, img_number, title, start_date, end_date')
        .order('id', { ascending: true }); // id 기준 오름차순 정렬

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

  // 페이지 변경 핸들러
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
