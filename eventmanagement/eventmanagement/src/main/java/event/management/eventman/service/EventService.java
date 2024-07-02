package event.management.eventman.service;

import event.management.eventman.dto.EventDto;
import event.management.eventman.entity.Event;

import java.util.List;

public interface EventService {

    EventDto createEvent(EventDto eventDto, String userId);

    List<EventDto> getEventsByUserId(String userId);
    List<EventDto> getAllEventsExceptUserId(String userId);
    void deleteEventById(String eventId);
    List<EventDto> getAllEvents(); // New method to get all events




}
