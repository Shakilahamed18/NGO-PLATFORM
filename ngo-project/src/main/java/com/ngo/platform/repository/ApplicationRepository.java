package com.ngo.platform.repository;

import com.ngo.platform.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    boolean existsByUserIdAndEventId(Long userId, Long eventId);

    List<Application> findByUserId(Long userId);

    List<Application> findByEventId(Long eventId);

    long countByAttendedTrue();

    Optional<Application> findByUserEmailAndEventId(
            String email,
            Long eventId);

    @Query("""
            SELECT a
            FROM Application a
            JOIN FETCH a.user
            JOIN FETCH a.event
            """)
    List<Application> findAllWithUserAndEvent();

    List<Application> findByAttendedTrue();
}
