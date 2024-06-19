package event.management.eventman.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import event.management.eventman.dto.ParticipantDto;
import event.management.eventman.entity.Participant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ParticipantMapper {

    private final ObjectMapper objectMapper;

    public ParticipantDto toDto(Participant participant) {
        ParticipantDto participantDto = new ParticipantDto();
        participantDto.setId(participant.getId());
        participantDto.setEventId(participant.getEventId());
        participantDto.setEmployeeId(participant.getEmployeeId());
        return participantDto;
    }

    public Participant toEntity(ParticipantDto participantDto) {
        Participant participant = new Participant();
        participant.setId(participantDto.getId());
        participant.setEventId(participantDto.getEventId());
        participant.setEmployeeId(participantDto.getEmployeeId());
        return participant;
    }

    private String stringListToJson(List<String> employeeIds) {
        try {
            return objectMapper.writeValueAsString(employeeIds);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to convert list to JSON string", e);
        }
    }

    private List<String> jsonToStringList(String jsonString) {
        try {
            return Arrays.asList(objectMapper.readValue(jsonString, String[].class));
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to convert JSON string to list", e);
        }
    }
}
