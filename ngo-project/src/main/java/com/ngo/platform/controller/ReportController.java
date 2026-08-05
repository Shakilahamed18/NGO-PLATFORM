package com.ngo.platform.controller;

import com.ngo.platform.dto.ReportResponse;
import com.ngo.platform.service.ReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping
    public ResponseEntity<ReportResponse> getReport() {

        return ResponseEntity.ok(
                reportService.getReport()
        );

    }

}