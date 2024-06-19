package event.management.eventman.controller;

import event.management.eventman.dto.ParticipantDto;
import event.management.eventman.service.ParticipantService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/participants")
@RequiredArgsConstructor
public class ParticipantController {

    private final ParticipantService participantService;

    @PostMapping("/register")
    public void registerUser(@RequestParam Long eventId, @RequestParam String employeeId) {
        participantService.registerUser(eventId, employeeId);
    }

    @PostMapping("/save")
    public ParticipantDto saveParticipant(@RequestBody ParticipantDto participantDto) {
        return participantService.saveParticipant(participantDto);
    }

    @GetMapping("/all")
    public List<ParticipantDto> getAllParticipants() {
        return participantService.getAllParticipants();
    }

    @GetMapping("/events")
    public List<ParticipantDto> getAllEventsByEmployeeId(@RequestParam String employeeId) {
        return participantService.getAllEventsByEmployeeIdPrefix(employeeId);
    }
}
