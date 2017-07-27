package com.gxch.poi.service;

import java.util.List;

import com.gxch.poi.entity.Poi;

public interface PoiServiceI {
	
    int deleteById(String id);

    int insert(Poi record);

    Poi selectByPrimaryKey(String id);
    
    List<Poi> getAll();

    int update(Poi record);

}
