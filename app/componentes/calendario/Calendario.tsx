"use client";
import React, { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { getAllHistoricos } from "@/lib/utils";
import { HistoricoVacina } from "@/lib/types/dbTypes";

export function Calendario() {
    // function renderEventContent() {
    //     return (
    //         <>
    //             <b>dasdasd</b>
    //             <i>asdasd</i>
    //         </>
    //     );
    // }

    const [eventos, setEventos] = useState([]);

    const getHistoricos = async () => {
        const eventos = await getAllHistoricos();
        setEventos(eventos);
        console.log("", eventos);
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
            />
        </div>
    );
}
