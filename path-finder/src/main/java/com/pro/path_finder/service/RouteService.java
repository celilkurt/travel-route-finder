package com.pro.path_finder.service;

import com.pro.path_finder.db.repository.RouteRecord;

import java.util.List;

public interface RouteService {

    List<RouteRecord> getRoutes(Long originId, Long destinationId);
}
