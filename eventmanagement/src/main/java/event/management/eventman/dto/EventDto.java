package event.management.eventman.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventDto {
    private String id; // Changed from Long to String for custom event ID
    private String eventName;
    private String description;
    private LocalDate date;
}
