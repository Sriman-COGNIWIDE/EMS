package event.management.eventman.service.Impl;

import event.management.eventman.dto.ParticipantDto;
import event.management.eventman.entity.Participant;
import event.management.eventman.repository.ParticipantRepository;
import event.management.eventman.service.ParticipantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParticipantServiceImpl implements ParticipantService {

    private final ParticipantRepository participantRepository;

    @Override
    public ParticipantDto saveParticipant(ParticipantDto participantDto) {
        Participant participant = new Participant(
                null,
                participantDto.getEventId(),
                participantDto.getEmployeeId()
        );
        participant = participantRepository.save(participant);
        return convertToDto(participant);
    }

    @Override
    public List<ParticipantDto> getAllParticipants() {
        List<Participant> participants = participantRepository.findAll();
        return participants.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void registerUser(Long eventId, String employeeId) {
        Participant participant = new Participant();
        participant.setEventId(eventId);
        participant.setEmployeeId(employeeId);
        participantRepository.save(participant);
    }

    @Override
    public List<ParticipantDto> getAllEventsByEmployeeIdPrefix(String employeeIdPrefix) {
        List<Participant> participants = participantRepository.findByEmployeeIdPrefix(employeeIdPrefix);
        return participants.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private ParticipantDto convertToDto(Participant participant) {
        return new ParticipantDto(
                participant.getId(),
                participant.getEventId(),
                participant.getEmployeeId()
        );
    }
}
