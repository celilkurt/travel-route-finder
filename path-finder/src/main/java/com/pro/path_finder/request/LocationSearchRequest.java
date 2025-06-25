package com.pro.path_finder.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationSearchRequest extends SearchRequestBase {

    private String name;
    private String city;
    private String locationCode;
}
