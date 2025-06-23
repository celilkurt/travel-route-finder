package com.pro.path_finder.service;

import com.pro.path_finder.db.dao.Location;
import com.pro.path_finder.db.repository.LocationRepository;
import com.pro.path_finder.dto.LocationDTO;
import com.pro.path_finder.exception.BusinessException;
import com.pro.path_finder.mapper.LocationMapper;
import com.pro.path_finder.request.LocationSaveRequest;
import com.pro.path_finder.request.LocationSearchRequest;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Pageable;
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
    public List<LocationDTO> search(LocationSearchRequest request) {

        return mapper.entityListToDTOList(repository.findAll(Example.of(mapper.searchRequestToEntity(request), getMatcher()), Pageable.ofSize(200)).stream().toList());
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
    public LocationDTO update(LocationSaveRequest saveRequest) {

        checkUpdateRequest(saveRequest);
        return mapper.entityToDTO(repository.save(mapper.saveRequestToEntity(saveRequest)));
    }

    protected void checkUpdateRequest(LocationSaveRequest saveRequest) {

        if (saveRequest.getId() == null) {
            throw new BusinessException("Id cannot be null!");
        } else if (!repository.existsById(saveRequest.getId())) {
            throw new BusinessException("Record not found by id!");
        }
    }

    @Override
    public void delete(long id) {
        repository.deleteById(id);
    }
}
