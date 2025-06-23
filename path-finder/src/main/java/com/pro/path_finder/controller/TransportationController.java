package com.pro.path_finder.controller;

import com.pro.path_finder.dto.TransportationDTO;
import com.pro.path_finder.request.TransportationSaveRequest;
import com.pro.path_finder.request.TransportationSearchRequest;
import com.pro.path_finder.service.TransportationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("transportation")
public class TransportationController {

    @Autowired
    private TransportationService transportationService;

    @GetMapping("/search")
    public ResponseEntity<List<TransportationDTO>> getTransportations(@RequestBody TransportationSearchRequest request) {

        return ResponseEntity.ok(transportationService.search(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransportationDTO> getById(@PathVariable("id") long id) {

        return ResponseEntity.ok(transportationService.getById(id));
    }

    @PostMapping("/save")
    public ResponseEntity<TransportationDTO> save(@RequestBody TransportationSaveRequest saveRequest) {

        return ResponseEntity.ok(transportationService.save(saveRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") long id) {

        transportationService.delete(id);
        return ResponseEntity.ok(true);
    }

    @PutMapping("/update")
    public ResponseEntity<TransportationDTO> update(@RequestBody TransportationSaveRequest request) {

        return ResponseEntity.ok(transportationService.update(request));
    }
}
