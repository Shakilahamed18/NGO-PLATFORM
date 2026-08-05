package com.ngo.platform.service;

import com.ngo.platform.dto.ReportResponse;
import com.ngo.platform.repository.ApplicationRepository;
import com.ngo.platform.repository.EventRepository;
import com.ngo.platform.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class ReportService {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final ApplicationRepository applicationRepository;

    public ReportService(
            UserRepository userRepository,
            EventRepository eventRepository,
            ApplicationRepository applicationRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.applicationRepository = applicationRepository;
    }

    public ReportResponse getReport() {

        return new ReportResponse(
                userRepository.count(),
                eventRepository.count(),
                applicationRepository.count(),
                applicationRepository.countByAttendedTrue());

    }

}