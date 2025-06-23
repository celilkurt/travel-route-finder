package com.pro.path_finder.service;

import com.pro.path_finder.dto.LocationDTO;
import com.pro.path_finder.request.LocationSaveRequest;
import com.pro.path_finder.request.LocationSearchRequest;

import java.util.List;

public interface LocationService {

    List<LocationDTO> search(LocationSearchRequest request);
    LocationDTO getById(long id);
    LocationDTO save(LocationSaveRequest saveRequest);
    LocationDTO update(LocationSaveRequest saveRequest);
    void delete(long id);
}
