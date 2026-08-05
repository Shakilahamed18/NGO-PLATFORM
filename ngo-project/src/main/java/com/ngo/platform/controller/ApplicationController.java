package com.ngo.platform.controller;

import com.ngo.platform.dto.ApplicationResponse;
import com.ngo.platform.dto.StatusUpdateRequest;
import com.ngo.platform.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/apply/{eventId}")
    public ResponseEntity<ApplicationResponse> applyToEvent(@PathVariable Long eventId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(applicationService.applyToEvent(eventId));
    }

    @GetMapping("/my")
    public ResponseEntity<List<ApplicationResponse>> getMyApplications() {
        return ResponseEntity.ok(applicationService.getMyApplications());
    }

    @GetMapping("/all")
    public ResponseEntity<List<ApplicationResponse>> getAllApplications() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<ApplicationResponse>> getApplicationsForEvent(@PathVariable Long eventId) {
        return ResponseEntity.ok(applicationService.getApplicationsForEvent(eventId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApplicationResponse> updateStatus(
            @PathVariable Long id, @Valid @RequestBody StatusUpdateRequest request) {
        return ResponseEntity.ok(applicationService.updateApplicationStatus(id, request));
    }
}
