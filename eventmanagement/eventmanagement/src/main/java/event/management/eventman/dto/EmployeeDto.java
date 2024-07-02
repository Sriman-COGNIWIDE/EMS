package event.management.eventman.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {

    private String email;
    private String firstname;
    private String lastname;
    private String password;
    private String phoneNumber; // Add this field

}
