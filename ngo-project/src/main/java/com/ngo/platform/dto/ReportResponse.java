package com.ngo.platform.dto;

public class ReportResponse {

    private long totalUsers;
    private long totalEvents;
    private long totalApplications;
    private long totalAttendance;

    public ReportResponse() {
    }

    public ReportResponse(
            long totalUsers,
            long totalEvents,
            long totalApplications,
            long totalAttendance
    ) {
        this.totalUsers = totalUsers;
        this.totalEvents = totalEvents;
        this.totalApplications = totalApplications;
        this.totalAttendance = totalAttendance;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public long getTotalEvents() {
        return totalEvents;
    }

    public long getTotalApplications() {
        return totalApplications;
    }

    public long getTotalAttendance() {
        return totalAttendance;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public void setTotalEvents(long totalEvents) {
        this.totalEvents = totalEvents;
    }

    public void setTotalApplications(long totalApplications) {
        this.totalApplications = totalApplications;
    }

    public void setTotalAttendance(long totalAttendance) {
        this.totalAttendance = totalAttendance;
    }

}