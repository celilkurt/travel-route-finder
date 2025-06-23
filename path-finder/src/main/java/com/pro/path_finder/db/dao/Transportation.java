package com.pro.path_finder.db.dao;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Transportation {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "transportationSeqGen")
    @SequenceGenerator(name = "transportationSeqGen", sequenceName = "transportation_sequence", allocationSize = 1)
    private Long id;
    @ManyToOne
    private Location originLocation;
    @ManyToOne
    private Location destinationLocation;
    @Column
    private TransportationType transportationType;
}
