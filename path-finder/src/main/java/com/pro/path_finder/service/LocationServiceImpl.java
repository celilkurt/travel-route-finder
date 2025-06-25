package com.pro.path_finder.service;

import com.pro.path_finder.db.dao.Location;
import com.pro.path_finder.db.repository.LocationRepository;
import com.pro.path_finder.dto.LocationDTO;
import com.pro.path_finder.exception.BusinessException;
import com.pro.path_finder.mapper.LocationMapper;
import com.pro.path_finder.request.LocationSaveRequest;
import com.pro.path_finder.request.LocationSearchRequest;
import com.pro.path_finder.request.LocationUpdateRequest;
import com.pro.path_finder.response.LocationSearchResponse;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationServiceImpl implements LocationService {

    @Autowired
    private LocationRepository repository;
    @Autowired
    private LocationMapper mapper;

    @Getter(lazy = true)
    private static final ExampleMatcher matcher = initMatcher();

    private static ExampleMatcher initMatcher() {

        return ExampleMatcher.matching()
                .withMatcher("name", match -> match.contains().ignoreCase())
                .withMatcher("city", match -> match.contains().ignoreCase())
                .withMatcher("locationCode", match -> match.contains().ignoreCase());
    }

    @Override
    public LocationSearchResponse search(LocationSearchRequest request) {

        Page<Location> locationPage = repository.findAll(Example.of(mapper.searchRequestToEntity(request), getMatcher()), PageRequest.of(request.getPageNumber(), request.getPageSize()));
        return new LocationSearchResponse(mapper.entityListToDTOList(locationPage.stream().toList()), locationPage.getTotalElements());
    }

    @Override
    public LocationDTO getById(long id) {

        return mapper.entityToDTO(repository.findById(id).orElse(new Location()));
    }

    @Override
    public LocationDTO save(LocationSaveRequest saveRequest) {

        return mapper.entityToDTO(repository.save(mapper.saveRequestToEntity(saveRequest)));
    }

    @Override
    public LocationDTO update(LocationUpdateRequest request) {

        return mapper.entityToDTO(repository.save(mapper.updateRequestToEntity(request)));
    }

    @Override
    public void delete(long id) {
        repository.deleteById(id);
    }
}
