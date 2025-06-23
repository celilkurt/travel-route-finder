package com.pro.path_finder.service;

import com.pro.path_finder.dto.TransportationDTO;
import com.pro.path_finder.request.TransportationSaveRequest;
import com.pro.path_finder.request.TransportationSearchRequest;

import java.util.List;

public interface TransportationService {

    List<TransportationDTO> search(TransportationSearchRequest request);
    TransportationDTO getById(long id);
    TransportationDTO save(TransportationSaveRequest saveRequest);
    TransportationDTO update(TransportationSaveRequest saveRequest);
    void delete(long id);
}
