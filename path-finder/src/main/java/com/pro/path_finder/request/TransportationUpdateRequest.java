package com.pro.path_finder.request;

import com.pro.path_finder.db.dao.TransportationType;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransportationUpdateRequest {

    @NotNull(message = "id required")
    private Long id;
    @NotNull(message = "originLocationId required")
    private Long originLocationId;
    @NotNull(message = "destinationLocationId required")
    private Long destinationLocationId;
    @NotNull(message = "transportationType required")
    private TransportationType transportationType;
}
