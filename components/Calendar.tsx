"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Draggable } from "@fullcalendar/interaction";
import { useEffect } from "react";

export default function CalendarPage() {
  useEffect(() => {
    let container = document.getElementById("external-events");

    if (container) {
      new Draggable(container, {
        itemSelector: ".fc-draggable",
        eventData: function (eventEl) {
          const data = JSON.parse(eventEl.getAttribute("data-json")!);

          return {
            title: data.subactivity,
            color: data.color,
            custom: data,
          };

        },

      });
    }
  }, []);

  return (
    <div className="pt-[120px] h-screen w-full">
      <div className=" bg-white rounded-2xl shadow-xl  mx-3 h-full ">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          nowIndicator={true}
          droppable={true}
          editable={true}
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
