package net.cogniwide.ems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    @Column(name = "first_name") // if the column name is not specified then the "firstname" declared down will be the column name
    private String firstname;
    @Column(name = "last_name")
    private String lastname;
    @Column(name = "email_id", nullable = false, unique = true)
    private String email;
}
