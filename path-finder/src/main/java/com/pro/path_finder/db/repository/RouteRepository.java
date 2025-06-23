package com.pro.path_finder.db.repository;


import com.pro.path_finder.db.dao.Location;
import com.pro.path_finder.db.dao.Transportation;
import com.pro.path_finder.db.dao.TransportationType;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Repository
public class RouteRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<RouteRecord> getRoutes(Long origId, Long destId) {

        List<RouteRecord> routes = new ArrayList<>();

        routes.addAll(getOneSegmentFlightRoutes(origId, destId));
        routes.addAll(findThreeSegmentTransportationDetails(origId, destId));
        routes.addAll(findTwoSegmentRoutes(origId, destId, false));
        routes.addAll(findTwoSegmentRoutes(origId, destId, true));

        return routes;
    }

    protected List<RouteRecord> findThreeSegmentTransportationDetails(Long initialOrigId, Long finalDestId) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<RouteRecord> query = cb.createQuery(RouteRecord.class);

        Root<Transportation> firstT = query.from(Transportation.class);
        Root<Transportation> secondT = query.from(Transportation.class);
        Root<Transportation> thirdT = query.from(Transportation.class);


        Join<Transportation, Location> firstTOriginLoc = firstT.join("originLocation");
        Join<Transportation, Location> firstTDestLoc = firstT.join("destinationLocation");

        Join<Transportation, Location> secondTOriginLoc = secondT.join("originLocation");
        Join<Transportation, Location> secondTDestLoc = secondT.join("destinationLocation");

        Join<Transportation, Location> thirdTOriginLoc = thirdT.join("originLocation");
        Join<Transportation, Location> thirdTDestLoc = thirdT.join("destinationLocation");


        Predicate finalWhereClause = cb.and(
                cb.notEqual(firstT.get("transportationType"), TransportationType.FLIGHT.ordinal()),
                cb.equal(firstT.get("originLocation").get("id"), cb.parameter(Long.class, "initialOrigId")),

                cb.equal(secondT.get("transportationType"), TransportationType.FLIGHT.ordinal()),
                cb.equal(secondT.get("originLocation").get("id"), firstT.get("destinationLocation").get("id")),

                cb.notEqual(thirdT.get("transportationType"), TransportationType.FLIGHT.ordinal()),
                cb.equal(thirdT.get("originLocation").get("id"), secondT.get("destinationLocation").get("id")),
                cb.equal(thirdT.get("destinationLocation").get("id"), cb.parameter(Long.class, "finalDestId"))
        );

        query.where(finalWhereClause);

        query.multiselect(
                cb.construct(TransportationRouteDTO.class,
                        firstT.get("id"),
                        firstTOriginLoc.get("name"),
                        firstTDestLoc.get("name"),
                        firstT.get("transportationType")
                ),
                cb.construct(TransportationRouteDTO.class,
                        secondT.get("id"),
                        secondTOriginLoc.get("name"),
                        secondTDestLoc.get("name"),
                        secondT.get("transportationType")
                ),
                cb.construct(TransportationRouteDTO.class,
                        thirdT.get("id"),
                        thirdTOriginLoc.get("name"),
                        thirdTDestLoc.get("name"),
                        thirdT.get("transportationType")
                )
        );

        return entityManager.createQuery(query)
                .setParameter("initialOrigId", initialOrigId)
                .setParameter("finalDestId", finalDestId)
                .getResultList();
    }

    public List<RouteRecord> getOneSegmentFlightRoutes(Long origId, Long destId) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<TransportationRouteDTO> query = cb.createQuery(TransportationRouteDTO.class);

        Root<Transportation> transportation = query.from(Transportation.class);
        Join<Transportation, Location> originLocationJoin = transportation.join("originLocation");
        Join<Transportation, Location> destinationLocationJoin = transportation.join("destinationLocation");

        query.where(
                cb.equal(transportation.get("destinationLocation").get("id"), cb.parameter(Long.class, "destId")),
                cb.equal(transportation.get("originLocation").get("id"), cb.parameter(Long.class, "origId")),
                cb.equal(transportation.get("transportationType"), TransportationType.FLIGHT.ordinal())
        );

        query.select(
                cb.construct(TransportationRouteDTO.class,
                        transportation.get("id"),
                        originLocationJoin.get("name"),
                        destinationLocationJoin.get("name"),
                        transportation.get("transportationType")
                )
        );

        List<TransportationRouteDTO> results = entityManager.createQuery(query)
                .setParameter("destId", destId)
                .setParameter("origId", origId)
                .getResultList();

        return results.stream()
                .map(dto -> new RouteRecord(dto, null, null))
                .collect(Collectors.toList());
    }

    private Predicate getTransportationTypePredicate(CriteriaBuilder cb, Root<Transportation> transportationRoot, boolean isEqual) {

        if (isEqual) {
            return cb.equal(transportationRoot.get("transportationType"), TransportationType.FLIGHT.ordinal());
        }
        return cb.notEqual(transportationRoot.get("transportationType"), TransportationType.FLIGHT.ordinal());
    }

    protected List<RouteRecord> findTwoSegmentRoutes(Long origId, Long destId,
                                                  boolean isFlightFirst) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Object[]> query = cb.createQuery(Object[].class);

        Root<Transportation> firstT = query.from(Transportation.class);
        Root<Transportation> secondT = query.from(Transportation.class);

        Join<Transportation, Location> firstTOriginLoc = firstT.join("originLocation");
        Join<Transportation, Location> firstTDestLoc = firstT.join("destinationLocation");

        Join<Transportation, Location> secondTOriginLoc = secondT.join("originLocation");
        Join<Transportation, Location> secondTDestLoc = secondT.join("destinationLocation");


        Predicate finalWhereClause = cb.and(
                getTransportationTypePredicate(cb, firstT, isFlightFirst),
                cb.equal(firstT.get("originLocation").get("id"), cb.parameter(Long.class, "origId")),

                getTransportationTypePredicate(cb, secondT, !isFlightFirst),
                cb.equal(secondT.get("originLocation").get("id"), firstT.get("destinationLocation").get("id")),
                cb.equal(secondT.get("destinationLocation").get("id"), cb.parameter(Long.class, "destId"))
        );

        query.where(finalWhereClause);

        query.multiselect(
                cb.construct(TransportationRouteDTO.class,
                        firstT.get("id"),
                        firstTOriginLoc.get("name"),
                        firstTDestLoc.get("name"),
                        firstT.get("transportationType")
                ),
                cb.construct(TransportationRouteDTO.class,
                        secondT.get("id"),
                        secondTOriginLoc.get("name"),
                        secondTDestLoc.get("name"),
                        secondT.get("transportationType")
                )
        );

        List<Object[]> results = entityManager.createQuery(query)
                .setParameter("origId", origId)
                .setParameter("destId", destId)
                .getResultList();

        return results.stream()
                .map(row -> new RouteRecord((TransportationRouteDTO) row[0], (TransportationRouteDTO) row[1], null))
                .collect(Collectors.toList());
    }
}
