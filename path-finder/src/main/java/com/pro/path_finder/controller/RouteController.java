package com.pro.path_finder.controller;


import com.pro.path_finder.db.repository.RouteRecord;
import com.pro.path_finder.db.repository.RouteRepository;
import com.pro.path_finder.request.RouteSearchRequest;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/route")
@Slf4j
public class RouteController {

    @Autowired
    private RouteRepository routeRepository;

    @GetMapping("/search")
    public ResponseEntity<List<RouteRecord>> getRoutes(@RequestBody @Valid RouteSearchRequest searchRequest) {
        return ResponseEntity.ok(routeRepository.getRoutes(searchRequest.getOriginLocationId(), searchRequest.getDestinationLocationId()));
    }
}
