package com.ngo.platform.dto;

import java.time.LocalDateTime;

public class ApplicationResponse {

    private Long id;
    private Long userId;
    private String userName;
    private String userEmail;
    private Long eventId;
    private String eventTitle;
    private LocalDateTime eventDate;
    private String status;
    private boolean attended;
    private String certificatePath;

    public ApplicationResponse() {
    }

    public ApplicationResponse(Long id,
            Long userId,
            String userName,
            String userEmail,
            Long eventId,
            String eventTitle,
            LocalDateTime eventDate,
            String status,
            boolean attended,
            String certificatePath) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.eventId = eventId;
        this.eventTitle = eventTitle;
        this.eventDate = eventDate;
        this.status = status;
        this.attended = attended;
        this.certificatePath = certificatePath;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public Long getEventId() {
        return eventId;
    }

    public String getEventTitle() {
        return eventTitle;
    }

    public LocalDateTime getEventDate() {
        return eventDate;
    }

    public String getStatus() {
        return status;
    }

    public boolean isAttended() {
        return attended;
    }

    public String getCertificatePath() {
        return certificatePath;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }

    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setAttended(boolean attended) {
        this.attended = attended;
    }

    public void setCertificatePath(String certificatePath) {
        this.certificatePath = certificatePath;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private Long id;
        private Long userId;
        private String userName;
        private String userEmail;
        private Long eventId;
        private String eventTitle;
        private LocalDateTime eventDate;
        private String status;
        private boolean attended;
        private String certificatePath;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder userId(Long userId) {
            this.userId = userId;
            return this;
        }

        public Builder userName(String userName) {
            this.userName = userName;
            return this;
        }

        public Builder userEmail(String userEmail) {
            this.userEmail = userEmail;
            return this;
        }

        public Builder eventId(Long eventId) {
            this.eventId = eventId;
            return this;
        }

        public Builder eventTitle(String eventTitle) {
            this.eventTitle = eventTitle;
            return this;
        }

        public Builder eventDate(LocalDateTime eventDate) {
            this.eventDate = eventDate;
            return this;
        }

        public Builder status(String status) {
            this.status = status;
            return this;
        }

        public Builder attended(boolean attended) {
            this.attended = attended;
            return this;
        }

        public Builder certificatePath(String certificatePath) {
            this.certificatePath = certificatePath;
            return this;
        }

        public ApplicationResponse build() {
            return new ApplicationResponse(
                    id,
                    userId,
                    userName,
                    userEmail,
                    eventId,
                    eventTitle,
                    eventDate,
                    status,
                    attended,
                    certificatePath);
        }
    }
}