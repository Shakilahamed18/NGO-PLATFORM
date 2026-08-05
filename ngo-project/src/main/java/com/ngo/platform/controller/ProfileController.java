package com.ngo.platform.controller;

import com.ngo.platform.dto.ProfileResponse;
import com.ngo.platform.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<ProfileResponse> getProfile() {

        return ResponseEntity.ok(
                profileService.getMyProfile()
        );

    }

}