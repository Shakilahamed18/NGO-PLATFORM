package com.ngo.platform.dto;

public class ProfileResponse {

    private String name;
    private String email;
    private String role;

    private long totalApplications;
    private long approvedApplications;
    private long completedApplications;
    private long attendanceCount;
    private long certificateCount;

    public ProfileResponse() {
    }

    public ProfileResponse(
            String name,
            String email,
            String role,
            long totalApplications,
            long approvedApplications,
            long completedApplications,
            long attendanceCount,
            long certificateCount
    ) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.totalApplications = totalApplications;
        this.approvedApplications = approvedApplications;
        this.completedApplications = completedApplications;
        this.attendanceCount = attendanceCount;
        this.certificateCount = certificateCount;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public long getTotalApplications() {
        return totalApplications;
    }

    public long getApprovedApplications() {
        return approvedApplications;
    }

    public long getCompletedApplications() {
        return completedApplications;
    }

    public long getAttendanceCount() {
        return attendanceCount;
    }

    public long getCertificateCount() {
        return certificateCount;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setTotalApplications(long totalApplications) {
        this.totalApplications = totalApplications;
    }

    public void setApprovedApplications(long approvedApplications) {
        this.approvedApplications = approvedApplications;
    }

    public void setCompletedApplications(long completedApplications) {
        this.completedApplications = completedApplications;
    }

    public void setAttendanceCount(long attendanceCount) {
        this.attendanceCount = attendanceCount;
    }

    public void setCertificateCount(long certificateCount) {
        this.certificateCount = certificateCount;
    }

}