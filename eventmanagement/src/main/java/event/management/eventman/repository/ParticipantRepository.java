package event.management.eventman.repository;

import event.management.eventman.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    @Query("SELECT p FROM Participant p WHERE p.employeeId LIKE :employeeIdPrefix%")
    List<Participant> findByEmployeeIdPrefix(@Param("employeeIdPrefix") String employeeIdPrefix);
}
