package com.pro.path_finder.mapper;

import com.pro.path_finder.db.dao.Location;
import com.pro.path_finder.dto.LocationDTO;
import com.pro.path_finder.request.LocationSaveRequest;
import com.pro.path_finder.request.LocationSearchRequest;
import com.pro.path_finder.request.LocationUpdateRequest;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LocationMapper {

    LocationDTO entityToDTO(Location transportation);
    List<LocationDTO> entityListToDTOList(List<Location> transportation);
    Location saveRequestToEntity(LocationSaveRequest saveRequest);
    Location updateRequestToEntity(LocationUpdateRequest saveRequest);
    Location searchRequestToEntity(LocationSearchRequest searchRequest);
}
