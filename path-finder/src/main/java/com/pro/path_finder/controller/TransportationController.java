package com.pro.path_finder.controller;

import com.pro.path_finder.db.dao.TransportationType;
import com.pro.path_finder.dto.TransportationDTO;
import com.pro.path_finder.request.TransportationDeleteRequest;
import com.pro.path_finder.request.TransportationSaveRequest;
import com.pro.path_finder.request.TransportationSearchRequest;
import com.pro.path_finder.request.TransportationUpdateRequest;
import com.pro.path_finder.response.TransportationSearchResponse;
import com.pro.path_finder.service.TransportationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("transportation")
public class TransportationController {

    @Autowired
    private TransportationService transportationService;

    @PostMapping("/search")
    public ResponseEntity<TransportationSearchResponse> getTransportations(@RequestBody TransportationSearchRequest request) {

        return ResponseEntity.ok(transportationService.search(request));
    }

    @GetMapping("/get-by-id")
    public ResponseEntity<TransportationDTO> getById(@RequestParam("id") long id) {

        return ResponseEntity.ok(transportationService.getById(id));
    }

    @PostMapping("/save")
    public ResponseEntity<TransportationDTO> save(@RequestBody @Valid TransportationSaveRequest saveRequest) {

        return ResponseEntity.ok(transportationService.save(saveRequest));
    }

    @PostMapping("/delete")
    public ResponseEntity<Boolean> delete(@RequestBody @Valid TransportationDeleteRequest request) {

        if (request.getId() == null) {
            return ResponseEntity.badRequest().body(false);
        }
        transportationService.delete(request.getId());
        return ResponseEntity.ok(true);
    }

    @PutMapping("/update")
    public ResponseEntity<TransportationDTO> update(@RequestBody @Valid TransportationUpdateRequest request) {

        return ResponseEntity.ok(transportationService.update(request));
    }

    @GetMapping("/transportation-type")
    public ResponseEntity<List<String>> getTransportationType() {
        return ResponseEntity.ok(TransportationType.TRANSPORTATION_TYPE_NAME_LIST);
    }
}
