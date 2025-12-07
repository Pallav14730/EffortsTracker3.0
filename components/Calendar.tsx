"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Draggable } from "@fullcalendar/interaction";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Trash2Icon } from "lucide-react";

export default function CalendarPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [results, setResults] = useState<any>([])
  const [comments, setComments] = useState("")
  const [hrs, setHrs] = useState("")
  const [currentTile, setCurrentTile] = useState<any>(null)
  const calendarRef = useRef<any>(null);
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
  function handleSubmit() {
    if (!currentTile) return;

    const data = {
      ...currentTile,
      comments,
      hrs,
    }
    const calendarApi = calendarRef.current.getApi();
    const events = calendarApi.getEvents();
    const lastEvent = events[events.length - 1];
    lastEvent.setExtendedProp("comments", comments);
    lastEvent.setExtendedProp("hrs", hrs);
    console.log(data);

    setComments("")
    setHrs("")
    setCurrentTile(null)
    setModalOpen(false)
  }
  function handlerReceive(info: any) {
    const tileData = info.event.extendedProps.custom
    const date = info.event.start;

    setCurrentTile({ ...tileData, date })
    setModalOpen(true)
  }
  function eventContent(eventInfo: any) {
    const data = eventInfo.event.extendedProps;

    return (
      <div className="flex text-xs font-bold">
        {data.comments && (
          <div className="text-[10px] flex-1 truncate">{data.comments}</div>
        )}
        {data.hrs && (
          <div className="text-[10px]">{data.hrs}</div>
        )}
      </div>
    );
  }
  return (
    <div className="pt-[120px] h-screen w-full">
      <div className=" bg-white rounded-2xl shadow-xl  mx-3 h-full ">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          nowIndicator={true}
          eventContent={eventContent}
          eventReceive={handlerReceive}
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
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-center">{currentTile?.activity}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4 justify-center items-center">
            <div>
              <label className="text-sm font-medium">Comment</label>
              <input
                type="text"
                className="border w-full p-2 rounded-md"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Hours</label>
              <input
                type="number"
                min={0}

                className="border w-full p-2 rounded-md"
                value={hrs}
                onChange={(e) => setHrs(e.target.value)}
              />
            </div>
            <div className="h-[42px] mt-10">
              <Trash2Icon className="text-red-500 cursor-pointer" />
            </div>
          </div>

          <DialogFooter>
            <button
              className="px-4 w-full py-2 cursor-pointer bg-blue-600 text-white rounded-md"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}

