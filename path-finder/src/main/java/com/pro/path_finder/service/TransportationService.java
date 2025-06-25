package com.pro.path_finder.service;

import com.pro.path_finder.dto.TransportationDTO;
import com.pro.path_finder.request.TransportationSaveRequest;
import com.pro.path_finder.request.TransportationSearchRequest;
import com.pro.path_finder.request.TransportationUpdateRequest;
import com.pro.path_finder.response.TransportationSearchResponse;

import java.util.List;

public interface TransportationService {

    TransportationSearchResponse search(TransportationSearchRequest request);
    TransportationDTO getById(long id);
    TransportationDTO save(TransportationSaveRequest saveRequest);
    TransportationDTO update(TransportationUpdateRequest request);
    void delete(long id);
}
