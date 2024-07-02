package event.management.eventman.mapper;

import event.management.eventman.dto.EventDto;
import event.management.eventman.entity.Event;

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
