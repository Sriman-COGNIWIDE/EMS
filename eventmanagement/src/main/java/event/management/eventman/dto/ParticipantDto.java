package event.management.eventman.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParticipantDto {

    private Long id;
    private Long eventId;
    private String employeeId;

}
