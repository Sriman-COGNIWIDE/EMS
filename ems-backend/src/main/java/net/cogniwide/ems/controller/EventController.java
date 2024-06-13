package net.cogniwide.ems.controller;

import net.cogniwide.ems.dto.EventDto;
import net.cogniwide.ems.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")  // corrected the URL to be consistent
public class EventController {

    private final EventService eventService;

    @Autowired  // This annotation can be omitted if using constructor injection with one constructor
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    public ResponseEntity<EventDto> createEvent(@RequestBody EventDto eventDto) {
        EventDto savedEvent = eventService.createEvent(eventDto);
        return new ResponseEntity<>(savedEvent, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<EventDto> getEventId(@PathVariable("id") Long id) {
        EventDto eventDto = eventService.getEventById(id);
        return ResponseEntity.ok(eventDto);
    }

    @GetMapping
    public ResponseEntity<List<EventDto>> getAllEvents(){
        List<EventDto> events= eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }

}
