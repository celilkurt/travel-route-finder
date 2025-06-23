package com.pro.path_finder.dto;

import com.pro.path_finder.db.dao.TransportationType;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class TransportationDTO {

    private Long id;
    private LocationDTO originLocation;
    private LocationDTO destinationLocation;
    private TransportationType transportationType;
}
