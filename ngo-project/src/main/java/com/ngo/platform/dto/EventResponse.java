package com.ngo.platform.dto;

import java.time.LocalDateTime;

public class EventResponse {

    private Long id;
    private String title;
    private String description;
    private LocalDateTime date;
    private String location;
    private String qrToken;

    public EventResponse() {
    }

    public EventResponse(Long id, String title, String description,
                         LocalDateTime date, String location,
                         String qrToken) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
        this.qrToken = qrToken;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public String getLocation() {
        return location;
    }

    public String getQrToken() {
        return qrToken;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setQrToken(String qrToken) {
        this.qrToken = qrToken;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private Long id;
        private String title;
        private String description;
        private LocalDateTime date;
        private String location;
        private String qrToken;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder title(String title) {
            this.title = title;
            return this;
        }

        public Builder description(String description) {
            this.description = description;
            return this;
        }

        public Builder date(LocalDateTime date) {
            this.date = date;
            return this;
        }

        public Builder location(String location) {
            this.location = location;
            return this;
        }

        public Builder qrToken(String qrToken) {
            this.qrToken = qrToken;
            return this;
        }

        public EventResponse build() {
            return new EventResponse(
                    id,
                    title,
                    description,
                    date,
                    location,
                    qrToken
            );
        }
    }
}