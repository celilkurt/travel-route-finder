package com.pro.path_finder.service;

import com.pro.path_finder.db.repository.RouteRecord;
import com.pro.path_finder.db.repository.RouteRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class RouteServiceImpl implements RouteService {

    @Autowired
    private RouteRepository routeRepository;

    @Override
    public List<RouteRecord> getRoutes(Long originId, Long destinationId) {
        return routeRepository.getRoutes(originId, destinationId);
    }
}
