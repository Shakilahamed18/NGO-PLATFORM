package com.ngo.platform.controller;

import com.ngo.platform.dto.EventRequest;
import com.ngo.platform.dto.EventResponse;
import com.ngo.platform.service.EventService;
import com.ngo.platform.service.QRCodeService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;
    private final QRCodeService qrCodeService;

    public EventController(EventService eventService, QRCodeService qrCodeService) {
        this.eventService = eventService;
        this.qrCodeService = qrCodeService;
    }

    @PostMapping("/create")
    public ResponseEntity<EventResponse> createEvent(@Valid @RequestBody EventRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(eventService.createEvent(request));
    }

    @GetMapping
    public ResponseEntity<List<EventResponse>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/page")
    public ResponseEntity<Page<EventResponse>> getPagedEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        return ResponseEntity.ok(eventService.getPagedEvents(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventResponse> getEventById(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok("Event deleted successfully");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<EventResponse> updateEvent(
            @PathVariable Long id,
            @Valid @RequestBody EventRequest request) {

        return ResponseEntity.ok(eventService.updateEvent(id, request));
    }

    @GetMapping("/whoami")
    public String whoami(Authentication authentication) {
        return authentication.getName() + " -> " + authentication.getAuthorities();
    }

    @GetMapping("/search")
    public ResponseEntity<List<EventResponse>> searchEvents(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date) {
        return ResponseEntity.ok(eventService.searchEvents(title, location, date));
    }

    @GetMapping(value = "/{id}/qr", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> getEventQrCode(@PathVariable Long id) {
        EventResponse event = eventService.getEventById(id);

        String qrText = event.getQrToken();

        byte[] qrImage = qrCodeService.generateQrCode(qrText, 300, 300);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=event-" + id + "-qr.png")
                .contentType(MediaType.IMAGE_PNG)
                .body(qrImage);
    }
}