package com.pro.path_finder.controller;

import com.pro.path_finder.dto.LocationDTO;
import com.pro.path_finder.request.LocationSaveRequest;
import com.pro.path_finder.request.LocationSearchRequest;
import com.pro.path_finder.service.LocationService;
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

    @GetMapping("/search")
    public ResponseEntity<List<LocationDTO>> getTransportations(@RequestBody LocationSearchRequest request) {

        return ResponseEntity.ok(locationService.search(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocationDTO> getById(@PathVariable("id") long id) {

        return ResponseEntity.ok(locationService.getById(id));
    }

    @PostMapping("/save")
    public ResponseEntity<LocationDTO> save(@RequestBody LocationSaveRequest saveRequest) {

        return ResponseEntity.ok(locationService.save(saveRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") long id) {

        locationService.delete(id);
        return ResponseEntity.ok(true);
    }

    @PutMapping("/update")
    public ResponseEntity<LocationDTO> update(@RequestBody LocationSaveRequest request) {

        return ResponseEntity.ok(locationService.update(request));
    }
}
