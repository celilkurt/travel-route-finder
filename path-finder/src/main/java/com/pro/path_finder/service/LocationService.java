package com.pro.path_finder.service;

import com.pro.path_finder.dto.LocationDTO;
import com.pro.path_finder.request.LocationSaveRequest;
import com.pro.path_finder.request.LocationSearchRequest;
import com.pro.path_finder.request.LocationUpdateRequest;
import com.pro.path_finder.response.LocationSearchResponse;

import java.util.List;

public interface LocationService {

    LocationSearchResponse search(LocationSearchRequest request);
    LocationDTO getById(long id);
    LocationDTO save(LocationSaveRequest saveRequest);
    LocationDTO update(LocationUpdateRequest request);
    void delete(long id);
}
