package com.ngo.platform.repository;

import com.ngo.platform.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    boolean existsByUser_IdAndEvent_Id(Long userId, Long eventId);

    Optional<Attendance> findByUser_IdAndEvent_Id(Long userId, Long eventId);
}