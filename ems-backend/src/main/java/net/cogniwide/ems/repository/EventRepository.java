package net.cogniwide.ems.repository;

import net.cogniwide.ems.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
