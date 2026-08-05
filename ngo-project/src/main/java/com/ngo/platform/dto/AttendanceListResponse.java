package com.ngo.platform.dto;

import java.time.LocalDateTime;

public class AttendanceListResponse {

    private String userName;
    private String eventTitle;
    private LocalDateTime attendedAt;

    public AttendanceListResponse() {
    }

    public AttendanceListResponse(
            String userName,
            String eventTitle,
            LocalDateTime attendedAt
    ) {
        this.userName = userName;
        this.eventTitle = eventTitle;
        this.attendedAt = attendedAt;
    }

    public String getUserName() {
        return userName;
    }

    public String getEventTitle() {
        return eventTitle;
    }

    public LocalDateTime getAttendedAt() {
        return attendedAt;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }

    public void setAttendedAt(LocalDateTime attendedAt) {
        this.attendedAt = attendedAt;
    }

}