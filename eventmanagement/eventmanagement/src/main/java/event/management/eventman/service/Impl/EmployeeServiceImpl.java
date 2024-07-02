package event.management.eventman.service.Impl;

import event.management.eventman.dto.EmployeeDto;
import event.management.eventman.dto.LoginDto;
import event.management.eventman.entity.Employee;
import event.management.eventman.mapper.EmployeeMapper;
import event.management.eventman.repository.EmployeeRepository;
import event.management.eventman.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // Import BCryptPasswordEncoder
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;
    private final BCryptPasswordEncoder passwordEncoder; // Inject BCryptPasswordEncoder

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository,
                               EmployeeMapper employeeMapper,
                               BCryptPasswordEncoder passwordEncoder) {
        this.employeeRepository = employeeRepository;
        this.employeeMapper = employeeMapper;
        this.passwordEncoder = passwordEncoder; // Initialize BCryptPasswordEncoder
    }

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        // Hash the password before saving
        String hashedPassword = passwordEncoder.encode(employeeDto.getPassword());

        Employee employee = mapToEmployee(employeeDto);
        employee.setPassword(hashedPassword); // Set hashed password to entity
        Employee savedEmployee = employeeRepository.save(employee);
        return mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeByEmail(String email) {
        Optional<Employee> employee = employeeRepository.findByEmail(email);
        return employee.map(this::mapToEmployeeDto).orElse(null);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream()
                .map(this::mapToEmployeeDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteEmployeeByEmail(String email) {
        employeeRepository.deleteByEmail(email);
    }

    @Override
    public EmployeeDto updateEmployee(String email, EmployeeDto employeeDto) {
        Optional<Employee> existingEmployeeOptional = employeeRepository.findByEmail(email);
        if (existingEmployeeOptional.isPresent()) {
            Employee existingEmployee = existingEmployeeOptional.get();
            existingEmployee.setFirstname(employeeDto.getFirstname());
            existingEmployee.setLastname(employeeDto.getLastname());
            if (!employeeDto.getPassword().isEmpty()) {
                String hashedPassword = passwordEncoder.encode(employeeDto.getPassword());
                existingEmployee.setPassword(hashedPassword); // Update hashed password
            }
            Employee updatedEmployee = employeeRepository.save(existingEmployee);
            return mapToEmployeeDto(updatedEmployee);
        }
        return null;
    }

    @Override
    public EmployeeDto login(LoginDto loginDto) {
        // Check if the login credentials match the specific email and password
        if ("srimanmayandi1@email.com".equals(loginDto.getEmail()) && "Sriman@123".equals(loginDto.getPassword())) {
            // Create an EmployeeDto for the authenticated user
            EmployeeDto employeeDto = new EmployeeDto();
            employeeDto.setEmail(loginDto.getEmail()); // Set the email (assuming you need this in the DTO)
            // You can set other properties of the EmployeeDto here if needed

            return employeeDto; // Return the authenticated EmployeeDto
        }

        return null; // Return null if the credentials don't match
    }


    @Override
    public EmployeeDto userLogin(LoginDto loginDto) {
        Optional<Employee> optionalEmployee = employeeRepository.findByEmail(loginDto.getEmail());
        if (optionalEmployee.isPresent()) {
            Employee employee = optionalEmployee.get();
            if (passwordEncoder.matches(loginDto.getPassword(), employee.getPassword())) {
                return mapToEmployeeDto(employee);
            }
        }
        return null;
    }

    private Employee mapToEmployee(EmployeeDto employeeDto) {
        Employee employee = new Employee();
        employee.setEmail(employeeDto.getEmail());
        employee.setFirstname(employeeDto.getFirstname());
        employee.setLastname(employeeDto.getLastname());
        return employee;
    }

    private EmployeeDto mapToEmployeeDto(Employee employee) {
        if (employee == null) {
            return null;
        }
        EmployeeDto employeeDto = new EmployeeDto();
        employeeDto.setEmail(employee.getEmail());
        employeeDto.setFirstname(employee.getFirstname());
        employeeDto.setLastname(employee.getLastname());
        return employeeDto;
    }
}
