package com.pro.path_finder.mapper;

import com.pro.path_finder.db.dao.Transportation;
import com.pro.path_finder.dto.TransportationDTO;
import com.pro.path_finder.request.TransportationSaveRequest;
import com.pro.path_finder.request.TransportationSearchRequest;
import com.pro.path_finder.request.TransportationUpdateRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TransportationMapper {

    TransportationDTO entityToDTO(Transportation transportation);
    List<TransportationDTO> entityListToDTOList(List<Transportation> transportation);
    @Mapping(source = "originLocationId", target = "originLocation.id")
    @Mapping(source = "destinationLocationId", target = "destinationLocation.id")
    Transportation saveRequestToEntity(TransportationSaveRequest saveRequest);
    @Mapping(source = "originLocationId", target = "originLocation.id")
    @Mapping(source = "destinationLocationId", target = "destinationLocation.id")
    Transportation updateRequestToEntity(TransportationUpdateRequest saveRequest);
    Transportation searchRequestToEntity(TransportationSearchRequest searchRequest);
}
