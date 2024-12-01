"use client";
import React, { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { getAllHistoricos } from "@/lib/utils";
import { HistoricoVacina } from "@/lib/types/dbTypes";

export function Calendario() {
    async function renderEventContent(eventInfo: any) {
        return (
            <div className="pl-1 ">
                <div>
                    <strong>Vacina: </strong>
                    {eventInfo.event.title}
                </div>
                <div>
                    <strong>Animal: </strong>
                    {eventInfo.event.extendedProps.description}
                </div>
            </div>
        );
    }

    const [eventos, setEventos] = useState([]);

    const getHistoricos = async () => {
        const eventos = await getAllHistoricos();
        setEventos(eventos);
    };

    useEffect(() => {
        getHistoricos();
    }, []);

    return (
        <div className="calendarioContainer">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={eventos}
                locale="pt-br"
                eventContent={renderEventContent}
            />
        </div>
    );
}
