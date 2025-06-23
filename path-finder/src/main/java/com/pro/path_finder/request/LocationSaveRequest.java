package com.pro.path_finder.request;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LocationSaveRequest {

    private Long id;
    private String name;
    private String city;
    private String locationCode;
}
