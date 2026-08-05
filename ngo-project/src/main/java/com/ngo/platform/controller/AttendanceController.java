package com.ngo.platform.controller;

import com.ngo.platform.dto.AttendanceListResponse;
import com.ngo.platform.dto.AttendanceResponse;
import com.ngo.platform.service.AttendanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping("/checkin/{qrToken}")
    public ResponseEntity<AttendanceResponse> checkIn(
            @PathVariable String qrToken,
            Principal principal) {

        String email = principal != null ? principal.getName() : null;

        return ResponseEntity.ok(
                attendanceService.checkIn(qrToken, email));
    }

    @GetMapping
    public ResponseEntity<List<AttendanceListResponse>> getAllAttendance() {

        return ResponseEntity.ok(
                attendanceService.getAllAttendance());

    }
}