package net.cogniwide.ems.mapper;

import net.cogniwide.ems.dto.EventDto;
import net.cogniwide.ems.entity.Event;

import java.time.LocalDate;

public class EventMapper {
    public static EventDto mapToEventDto(Event event) {
        return new EventDto(
                event.getId(),
                event.getEventName(),
                event.getDescription(),
                event.getDate()

        );
    }
    public static Event mapToEvent(EventDto eventDto) {
        return new Event(
                eventDto.getId(),
                eventDto.getEventName(),
                eventDto.getDescription(),
                eventDto.getDate()
        );
    }
}
