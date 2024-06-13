package net.cogniwide.ems.service.impl;

import lombok.AllArgsConstructor;
import net.cogniwide.ems.dto.EmployeeDto;
import net.cogniwide.ems.dto.EventDto;
import net.cogniwide.ems.entity.Event;
import net.cogniwide.ems.exception.ResourceNotFoundException;
import net.cogniwide.ems.mapper.EventMapper;
import net.cogniwide.ems.repository.EventRepository;
import net.cogniwide.ems.service.EventService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EventServiceImpl implements EventService {

    private EventRepository eventRepository;
    @Override
    public EventDto createEvent(EventDto eventDto) {
        Event event = EventMapper.mapToEvent(eventDto);
        Event savedEvent = eventRepository.save(event);
        return EventMapper.mapToEventDto(savedEvent);
    }

    @Override
    public EventDto getEventById(long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));
        return EventMapper.mapToEventDto(event);
    }

    @Override
    public List<EmployeeDto> getAllEvents(EventDto eventDto) {
        return List.of();
    }

    @Override
    public List<EventDto> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return events.stream().map((event -> EventMapper.mapToEventDto(event))).collect(Collectors.toList());
    }
}
