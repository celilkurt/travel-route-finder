package com.pro.path_finder.service;

import com.pro.path_finder.db.dao.Transportation;
import com.pro.path_finder.db.repository.TransportationRepository;
import com.pro.path_finder.dto.TransportationDTO;
import com.pro.path_finder.exception.BusinessException;
import com.pro.path_finder.mapper.TransportationMapper;
import com.pro.path_finder.request.TransportationSaveRequest;
import com.pro.path_finder.request.TransportationSearchRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
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
    public List<TransportationDTO> search(TransportationSearchRequest request) {

        return mapper.entityListToDTOList(repository.findAll(Example.of(mapper.searchRequestToEntity(request)), Pageable.ofSize(200)).stream().toList());
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
    public TransportationDTO update(TransportationSaveRequest saveRequest) {

        checkUpdateRequest(saveRequest);
        return mapper.entityToDTO(repository.save(mapper.saveRequestToEntity(saveRequest)));
    }

    protected void checkUpdateRequest(TransportationSaveRequest saveRequest) {

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
