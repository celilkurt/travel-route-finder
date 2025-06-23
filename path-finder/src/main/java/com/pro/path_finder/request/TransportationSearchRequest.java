package com.pro.path_finder.request;

import com.pro.path_finder.db.dao.TransportationType;
import com.pro.path_finder.dto.LocationDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransportationSearchRequest {

    private LocationDTO originLocation;
    private LocationDTO destinationLocation;
    private TransportationType transportationType;
}
