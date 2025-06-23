package com.pro.path_finder.db.repository;

public record RouteRecord(TransportationRouteDTO firstSegment, TransportationRouteDTO secondSegment, TransportationRouteDTO thirdSegment) {}
