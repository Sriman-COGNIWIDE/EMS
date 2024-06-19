package event.management.eventman.mapper;

import event.management.eventman.dto.EmployeeDto;
import event.management.eventman.entity.Employee;
import org.springframework.stereotype.Component;

@Component
public class EmployeeMapper {

    public EmployeeDto toDto(Employee employee) {
        return new EmployeeDto(
                employee.getEmail(),
                employee.getFirstname(),
                employee.getLastname(),
                employee.getPassword(),
                employee.getPhoneNumber() // Add this field
        );
    }

    public Employee toEntity(EmployeeDto employeeDto) {
        return new Employee(
                employeeDto.getEmail(),
                employeeDto.getFirstname(),
                employeeDto.getLastname(),
                employeeDto.getPassword(),
                employeeDto.getPhoneNumber() // Add this field
        );
    }
}
