package event.management.eventman.service;

import event.management.eventman.dto.ParticipantDto;

import java.util.List;

public interface ParticipantService {
    ParticipantDto saveParticipant(ParticipantDto participantDto);

    List<ParticipantDto> getAllParticipants();

    void registerUser(Long eventId, String employeeId);

    List<ParticipantDto> getAllEventsByEmployeeIdPrefix(String employeeIdPrefix);  // New method signature


}
