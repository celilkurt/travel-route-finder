package com.pro.path_finder.response;

import com.pro.path_finder.dto.LocationDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LocationSearchResponse {

    private List<LocationDTO> data;
    private Long totalCount;
}
