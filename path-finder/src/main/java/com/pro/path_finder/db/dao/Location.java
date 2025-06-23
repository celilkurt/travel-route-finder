package com.pro.path_finder.db.dao;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "locationSeqGen")
    @SequenceGenerator(name = "locationSeqGen", sequenceName = "location_sequence", allocationSize = 1)
    private Long id;
    @Column
    private String name;
    @Column
    private String city;
    @Column(unique = true)
    private String locationCode;
}
