package event.management.eventman.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @Column(name = "email_id", nullable = false, unique = true)
    private String email;

    @Column(name = "first_name")
    private String firstname;

    @Column(name = "last_name")
    private String lastname;

    @Column(name = "password", nullable = false)
    private String password;


    @Column(name = "phone_number")
    private String phoneNumber;

    // Constructors, getters, and setters omitted for brevity
}
