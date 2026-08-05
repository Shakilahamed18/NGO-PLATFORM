package com.ngo.platform.service;

import com.ngo.platform.dto.ProfileResponse;
import com.ngo.platform.model.Application;
import com.ngo.platform.model.ApplicationStatus;
import com.ngo.platform.model.User;
import com.ngo.platform.repository.ApplicationRepository;
import com.ngo.platform.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileService {

        private final UserRepository userRepository;
        private final ApplicationRepository applicationRepository;

        public ProfileService(UserRepository userRepository,
                        ApplicationRepository applicationRepository) {
                this.userRepository = userRepository;
                this.applicationRepository = applicationRepository;
        }

        public ProfileResponse getMyProfile() {

                String email = SecurityContextHolder
                                .getContext()
                                .getAuthentication()
                                .getName();

                System.out.println("========== PROFILE ==========");
                System.out.println("Logged in user: " + email);
                System.out.println("Authentication: " +
                                SecurityContextHolder.getContext().getAuthentication());
                System.out.println("=============================");

                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                List<Application> applications = applicationRepository.findByUserId(user.getId());

                long approved = applications.stream()
                                .filter(app -> app.getStatus() == ApplicationStatus.APPROVED)
                                .count();

                long completed = applications.stream()
                                .filter(app -> app.getStatus() == ApplicationStatus.COMPLETED)
                                .count();

                long attendance = applications.stream()
                                .filter(Application::isAttended)
                                .count();

                long certificates = applications.stream()
                                .filter(app -> app.getStatus() == ApplicationStatus.COMPLETED)
                                .filter(Application::isAttended)
                                .count();

                return new ProfileResponse(
                                user.getName(),
                                user.getEmail(),
                                user.getRole().name(),
                                applications.size(),
                                approved,
                                completed,
                                attendance,
                                certificates);
        }

}