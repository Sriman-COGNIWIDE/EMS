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

    EmployeeDto login(LoginDto loginDto);

    EmployeeDto userLogin(LoginDto loginDto);
}
