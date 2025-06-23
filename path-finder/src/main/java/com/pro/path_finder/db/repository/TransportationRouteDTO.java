package com.pro.path_finder.db.repository;

import com.pro.path_finder.db.dao.TransportationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransportationRouteDTO {

    private Long id;
    private String originName;
    private String destinationName;
    private TransportationType transportationType;
}
