package event.management.eventman.controller;

import event.management.eventman.dto.EventDto;
import event.management.eventman.entity.Event;
import event.management.eventman.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }


    @PostMapping
    public ResponseEntity<EventDto> createEvent(@RequestBody EventDto eventDto, @RequestParam String userId) {
        EventDto createdEvent = eventService.createEvent(eventDto, userId);
        return ResponseEntity.ok(createdEvent);
    }

    @GetMapping
    public ResponseEntity<List<EventDto>> getEventsByUserId(@RequestParam("userId") String userId) {
        List<EventDto> events = eventService.getEventsByUserId(userId);
        if (!events.isEmpty()) {
            return ResponseEntity.ok(events);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/exclude-user/{userId}")
    public ResponseEntity<List<EventDto>> getAllEventsExceptUserId(@PathVariable("userId") String userId) {
        List<EventDto> events = eventService.getAllEventsExceptUserId(userId);
        return ResponseEntity.ok(events);
    }


    @GetMapping("/all-events")
    public ResponseEntity<List<EventDto>> getAllEvents() { // New method to get all events
        List<EventDto> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }








}
