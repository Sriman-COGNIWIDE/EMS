package event.management.eventman.service;

import event.management.eventman.dto.EmployeeDto;
import event.management.eventman.dto.LoginDto;

import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeByEmail(String email);

    List<EmployeeDto> getAllEmployees();

    void deleteEmployeeByEmail(String email);

    EmployeeDto updateEmployee(String email, EmployeeDto employeeDto);

    /**
     * Authenticates a user based on login credentials.
     *
     * @param loginDto The DTO containing email and plaintext password for login.
     * @return EmployeeDto if authentication is successful, null otherwise.
     */
    EmployeeDto login(LoginDto loginDto);

    /**
     * Authenticates a user based on login credentials, checking against hashed password.
     *
     * @param loginDto The DTO containing email and plaintext password for login.
     * @return EmployeeDto if authentication is successful, null otherwise.
     */
    EmployeeDto userLogin(LoginDto loginDto);
}
