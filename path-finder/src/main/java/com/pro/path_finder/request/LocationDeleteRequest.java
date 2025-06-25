package com.pro.path_finder.request;


import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationDeleteRequest {

    @NotNull(message = "id required")
    private Long id;
}
