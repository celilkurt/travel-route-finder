package com.pro.path_finder.service;

import com.pro.path_finder.db.dao.Transportation;
import com.pro.path_finder.db.repository.TransportationRepository;
import com.pro.path_finder.dto.TransportationDTO;
import com.pro.path_finder.exception.BusinessException;
import com.pro.path_finder.mapper.TransportationMapper;
import com.pro.path_finder.request.TransportationSaveRequest;
import com.pro.path_finder.request.TransportationSearchRequest;
import com.pro.path_finder.request.TransportationUpdateRequest;
import com.pro.path_finder.response.TransportationSearchResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransportationServiceImpl implements TransportationService {

    @Autowired
    private TransportationRepository repository;
    @Autowired
    private TransportationMapper mapper;

    @Override
    public TransportationSearchResponse search(TransportationSearchRequest request) {

        Page<Transportation> transportationPage = repository.findAll(Example.of(mapper.searchRequestToEntity(request)), PageRequest.of(request.getPageNumber(), request.getPageSize()));

        return new TransportationSearchResponse(mapper.entityListToDTOList(transportationPage.stream().toList()), transportationPage.getTotalElements());
    }

    @Override
    public TransportationDTO getById(long id) {

        return mapper.entityToDTO(repository.findById(id).orElse(new Transportation()));
    }

    @Override
    public TransportationDTO save(TransportationSaveRequest saveRequest) {

        return mapper.entityToDTO(repository.save(mapper.saveRequestToEntity(saveRequest)));
    }

    @Override
    public TransportationDTO update(TransportationUpdateRequest request) {

        return mapper.entityToDTO(repository.save(mapper.updateRequestToEntity(request)));
    }

    @Override
    public void delete(long id) {
        repository.deleteById(id);
    }
}
