package com.pro.path_finder.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransportationDeleteRequest {

    @NotNull(message = "id required")
    private Long id;
}
