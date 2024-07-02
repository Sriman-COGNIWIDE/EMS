package event.management.eventman.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParticipantDto {

    private Long id;
    private String eventId; // Changed eventId to String
    private String employeeId;
}
