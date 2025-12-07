"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function CalendarPage() {
  return (
    <div className="flex h-screen p-4">
    <div className=" bg-white rounded-2xl shadow-xl h-full w-full p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        nowIndicator={true}
        displayEventTime={false}
        dragScroll={true}
        views={{
          dayGridMonth: {
            dayMaxEventRows: 2,
          },
          timeGridWeek: {
            dayMaxEventRows: false,
          },
          timeGridDay: {
            dayMaxEventRows: false,
          },
          
        }}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridDay,dayGridWeek,",
        }}
        height="100%"
      />
    </div>
    </div>
  );
}
