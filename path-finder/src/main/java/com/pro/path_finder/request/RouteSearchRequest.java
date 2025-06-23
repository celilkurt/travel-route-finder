package com.pro.path_finder.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RouteSearchRequest {

    @NotNull(message = "originLocationId required")
    private Long originLocationId;
    @NotNull(message = "destinationLocationId required")
    private Long destinationLocationId;
}
