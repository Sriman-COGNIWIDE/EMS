package event.management.eventman.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "event_participants")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Participant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "event_id")
    private String eventId; // Changed eventId to String

    @Column(name = "employee_ids", columnDefinition = "TEXT")
    private String employeeId; // Store employee ids as a JSON string

}
