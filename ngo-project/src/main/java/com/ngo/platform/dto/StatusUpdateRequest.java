package com.ngo.platform.dto;

import com.ngo.platform.model.ApplicationStatus;

public class StatusUpdateRequest {

    private ApplicationStatus status;

    public StatusUpdateRequest() {
    }

    public StatusUpdateRequest(ApplicationStatus status) {
        this.status = status;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }
}