package com.pro.path_finder.db.dao;


import java.util.Arrays;
import java.util.List;

public enum TransportationType {
    FLIGHT,BUS,SUBWAY,UBER;

    public static final List<String> TRANSPORTATION_TYPE_NAME_LIST = Arrays.stream(TransportationType.values()).map(Enum::name).toList();
}
