package event.management.eventman.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import event.management.eventman.dto.EmployeeDto;
import event.management.eventman.dto.LoginDto;
import event.management.eventman.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory; // Import SLF4J Logger

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")

public class EmployeeController {

    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    private EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {
        EmployeeDto createdEmployee = employeeService.createEmployee(employeeDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEmployee);
    }

    @GetMapping("/{email}")
    public ResponseEntity<EmployeeDto> getEmployeeByEmail(@PathVariable("email") String email) {
        EmployeeDto employeeDto = employeeService.getEmployeeByEmail(email);
        if (employeeDto != null) {
            return ResponseEntity.ok(employeeDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        List<EmployeeDto> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<String> deleteEmployeeByEmail(@PathVariable("email") String email) {
        try {
            employeeService.deleteEmployeeByEmail(email);
            return ResponseEntity.ok("Employee deleted!");
        } catch (Exception e) {
            logger.error("Error deleting employee: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting employee: " + e.getMessage());
        }
    }


    @PutMapping("/{email}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("email") String email, @RequestBody EmployeeDto employeeDto) {
        EmployeeDto updatedEmployee = employeeService.updateEmployee(email, employeeDto);
        if (updatedEmployee != null) {
            return ResponseEntity.ok(updatedEmployee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<EmployeeDto> login(@RequestBody LoginDto loginDto) {
        EmployeeDto employeeDto = employeeService.login(loginDto);
        if (employeeDto != null) {
            return ResponseEntity.ok(employeeDto);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @PostMapping("/userLogin")
    public ResponseEntity<EmployeeDto> userLogin(@RequestBody LoginDto loginDto) {
        EmployeeDto employeeDto = employeeService.userLogin(loginDto);
        if (employeeDto != null) {
            return ResponseEntity.ok(employeeDto);
        } else {
            return ResponseEntity.status(401).build(); // Unauthorized
        }
    }

}
