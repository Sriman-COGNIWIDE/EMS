package event.management.eventman.service.Impl;

import event.management.eventman.dto.EventDto;
import event.management.eventman.entity.Event;
import event.management.eventman.mapper.EventMapper;
import event.management.eventman.repository.EventRepository;
import event.management.eventman.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    @Autowired
    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }



    @Override
    public EventDto createEvent(EventDto eventDto, String userId) {
        // Find the highest current suffix for the user's events
        List<Event> userEvents = eventRepository.findByUserIdPrefix(userId);
        int maxSuffix = userEvents.stream()
                .map(event -> Integer.parseInt(event.getId().replaceAll("\\D", "")))
                .max(Integer::compareTo)
                .orElse(0);

        // Generate custom event ID
        String eventId = userId + (maxSuffix + 1);

        // Map EventDto to Event entity
        Event event = EventMapper.mapToEvent(eventDto);
        event.setId(eventId);

        // Save the event
        Event savedEvent = eventRepository.save(event);
        return EventMapper.mapToEventDto(savedEvent);
    }

    @Override
    public List<EventDto> getEventsByUserId(String userId) {
        List<Event> events = eventRepository.findByUserIdPrefix(userId);
        return events.stream()
                .map(EventMapper::mapToEventDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<EventDto> getAllEventsExceptUserId(String userId) {
        List<Event> events = eventRepository.findAllExceptUserIdPrefix(userId);
        return events.stream()
                .map(EventMapper::mapToEventDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteEventById(String eventId) {
            eventRepository.deleteById(eventId);
    }

    @Override
    public List<EventDto> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return events.stream()
                .map(EventMapper::mapToEventDto)
                .collect(Collectors.toList());
    }



}






