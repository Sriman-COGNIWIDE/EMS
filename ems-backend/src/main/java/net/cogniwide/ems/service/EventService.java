package net.cogniwide.ems.service;

import net.cogniwide.ems.dto.EmployeeDto;
import net.cogniwide.ems.dto.EventDto;

import java.util.List;

public interface EventService {
    EventDto createEvent(EventDto eventDto);
    EventDto getEventById(long eventId);
    List<EmployeeDto> getAllEvents(EventDto eventDto);
    List<EventDto> getAllEvents();
}
