package com.ngo.platform.service;

import com.ngo.platform.dto.AttendanceResponse;
import com.ngo.platform.model.Application;
import com.ngo.platform.model.ApplicationStatus;
import com.ngo.platform.model.Event;
import com.ngo.platform.repository.ApplicationRepository;
import com.ngo.platform.repository.EventRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ngo.platform.dto.AttendanceListResponse;
import java.util.List;
import java.util.stream.Collectors;

import java.time.LocalDateTime;

@Service
public class AttendanceService {

    private final ApplicationRepository applicationRepository;
    private final EventRepository eventRepository;

    public AttendanceService(ApplicationRepository applicationRepository,
                             EventRepository eventRepository) {
        this.applicationRepository = applicationRepository;
        this.eventRepository = eventRepository;
    }

    @Transactional
    public AttendanceResponse checkIn(String qrToken, String email) {

        // Find the event using the QR token
        Event event = eventRepository.findByQrToken(qrToken)
                .orElseThrow(() ->
                        new RuntimeException("Invalid QR Code"));

        // Find the logged-in user's application for this event
        Application application = applicationRepository
                .findByUserEmailAndEventId(email, event.getId())
                .orElseThrow(() ->
                        new RuntimeException("You have not applied for this event"));

        // Check approval
        if (application.getStatus() != ApplicationStatus.APPROVED) {
            throw new RuntimeException("Application is not approved");
        }

        // Prevent duplicate attendance
        if (application.isAttended()) {
            throw new RuntimeException("Attendance already marked");
        }

        // Mark attendance
        application.setAttended(true);
        application.setAttendedAt(LocalDateTime.now());

        applicationRepository.save(application);

        return new AttendanceResponse(
                "Attendance marked successfully",
                application.getId(),
                application.getUser().getId(),
                application.getEvent().getId(),
                application.getAttendedAt()
        );
    }
    public List<AttendanceListResponse> getAllAttendance() {

    return applicationRepository.findByAttendedTrue()
            .stream()
            .map(app -> new AttendanceListResponse(
                    app.getUser().getName(),
                    app.getEvent().getTitle(),
                    app.getAttendedAt()
            ))
            .collect(Collectors.toList());

}
}