package com.ngo.platform.dto;

import java.time.LocalDateTime;

public class AttendanceResponse {

    private String message;
    private Long applicationId;
    private Long userId;
    private Long eventId;
    private LocalDateTime attendedAt;

    public AttendanceResponse() {
    }

    public AttendanceResponse(String message, Long applicationId, Long userId, Long eventId, LocalDateTime attendedAt) {
        this.message = message;
        this.applicationId = applicationId;
        this.userId = userId;
        this.eventId = eventId;
        this.attendedAt = attendedAt;
    }

    public String getMessage() {
        return message;
    }

    public Long getApplicationId() {
        return applicationId;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getEventId() {
        return eventId;
    }

    public LocalDateTime getAttendedAt() {
        return attendedAt;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public void setAttendedAt(LocalDateTime attendedAt) {
        this.attendedAt = attendedAt;
    }
}