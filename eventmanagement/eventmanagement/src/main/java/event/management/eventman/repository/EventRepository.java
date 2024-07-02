package event.management.eventman.repository;

import event.management.eventman.entity.Event;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, String> {

    @Query("SELECT e FROM Event e WHERE e.id LIKE :userIdPrefix%")
    List<Event> findByUserIdPrefix(@Param("userIdPrefix") String userIdPrefix);

    @Query("SELECT e FROM Event e WHERE e.id NOT LIKE :userIdPrefix%")
    List<Event> findAllExceptUserIdPrefix(@Param("userIdPrefix") String userIdPrefix);


}
