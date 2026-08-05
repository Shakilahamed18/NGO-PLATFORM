package com.ngo.platform.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "applications",
    uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "event_id"})
)
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status = ApplicationStatus.PENDING;

    @Column(nullable = false)
    private boolean attended = false;

    private LocalDateTime attendedAt;


    private String certificatePath;

    public Application() {
    }

    public Application(Long id, User user, Event event, ApplicationStatus status) {
        this.id = id;
        this.user = user;
        this.event = event;
        this.status = status;
    }

    public Application(Long id, User user, Event event, ApplicationStatus status,
                       boolean attended, LocalDateTime attendedAt, String certificatePath) {
        this.id = id;
        this.user = user;
        this.event = event;
        this.status = status;
        this.attended = attended;
        this.attendedAt = attendedAt;
        this.certificatePath = certificatePath;
    }

    public Long getId() { return id; }
    public User getUser() { return user; }
    public Event getEvent() { return event; }
    public ApplicationStatus getStatus() { return status; }
    public boolean isAttended() { return attended; }
    public LocalDateTime getAttendedAt() { return attendedAt; }
    public String getCertificatePath() { return certificatePath; }

    public void setId(Long id) { this.id = id; }
    public void setUser(User user) { this.user = user; }
    public void setEvent(Event event) { this.event = event; }
    public void setStatus(ApplicationStatus status) { this.status = status; }
    public void setAttended(boolean attended) { this.attended = attended; }
    public void setAttendedAt(LocalDateTime attendedAt) { this.attendedAt = attendedAt; }
    public void setCertificatePath(String certificatePath) { this.certificatePath = certificatePath; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private User user;
        private Event event;
        private ApplicationStatus status = ApplicationStatus.PENDING;
        private boolean attended = false;
        private LocalDateTime attendedAt;
        private String certificatePath;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder user(User user) { this.user = user; return this; }
        public Builder event(Event event) { this.event = event; return this; }
        public Builder status(ApplicationStatus status) { this.status = status; return this; }
        public Builder attended(boolean attended) { this.attended = attended; return this; }
        public Builder attendedAt(LocalDateTime attendedAt) { this.attendedAt = attendedAt; return this; }
        public Builder certificatePath(String certificatePath) { this.certificatePath = certificatePath; return this; }

        public Application build() {
            return new Application(id, user, event, status, attended, attendedAt, certificatePath);
        }
    }
}