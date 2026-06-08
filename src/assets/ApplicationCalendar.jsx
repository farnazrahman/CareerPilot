import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default function ApplicationCalendar() {
    const events = [
        { title: 'Google - SWE', date: '2026-06-10' },
        { title: 'Meta - Interview', date: '2026-06-12' },
    ]

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            events={events}
            height="auto"
        />
    )
}