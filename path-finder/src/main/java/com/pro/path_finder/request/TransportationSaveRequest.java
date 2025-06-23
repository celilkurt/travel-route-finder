package com.pro.path_finder.request;

import com.pro.path_finder.db.dao.TransportationType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransportationSaveRequest {

    private Long id;
    private Long originLocationId;
    private Long destinationLocationId;
    private TransportationType transportationType;
}
