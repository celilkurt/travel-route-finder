package com.pro.path_finder.response;


import com.pro.path_finder.dto.TransportationDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransportationSearchResponse {

    private List<TransportationDTO> data;
    private Long totalCount;
}
