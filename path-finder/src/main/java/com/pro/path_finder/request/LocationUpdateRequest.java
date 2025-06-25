package com.pro.path_finder.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LocationUpdateRequest {

    @NotNull(message = "id required")
    private Long id;
    @NotNull(message = "name required")
    private String name;
    @NotNull(message = "city required")
    private String city;
    @NotNull(message = "locationCode required")
    private String locationCode;
}
