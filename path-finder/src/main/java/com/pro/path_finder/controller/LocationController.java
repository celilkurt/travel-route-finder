package com.pro.path_finder.controller;

import com.pro.path_finder.dto.LocationDTO;
import com.pro.path_finder.request.LocationDeleteRequest;
import com.pro.path_finder.request.LocationSaveRequest;
import com.pro.path_finder.request.LocationSearchRequest;
import com.pro.path_finder.request.LocationUpdateRequest;
import com.pro.path_finder.response.LocationSearchResponse;
import com.pro.path_finder.service.LocationService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("location")
@Slf4j
public class LocationController {

    @Autowired
    private LocationService locationService;

    @PostMapping("/search")
    public ResponseEntity<LocationSearchResponse> getLocations(@RequestBody LocationSearchRequest request) {

        return ResponseEntity.ok(locationService.search(request));
    }

    @GetMapping("/get-by-id")
    public ResponseEntity<LocationDTO> getById(@RequestParam("id") long id) {

        return ResponseEntity.ok(locationService.getById(id));
    }

    @PostMapping("/save")
    public ResponseEntity<LocationDTO> save(@RequestBody @Valid LocationSaveRequest saveRequest) {

        return ResponseEntity.ok(locationService.save(saveRequest));
    }

    @PostMapping("/delete")
    public ResponseEntity<Boolean> delete(@RequestBody @Valid LocationDeleteRequest request) {

        locationService.delete(request.getId());
        return ResponseEntity.ok(true);
    }

    @PutMapping("/update")
    public ResponseEntity<LocationDTO> update(@RequestBody @Valid LocationUpdateRequest request) {

        return ResponseEntity.ok(locationService.update(request));
    }
}
