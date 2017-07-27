package com.gxch.poi.dao;

import java.util.List;

import com.gxch.poi.entity.Poi;

public interface PoiMapper {
    int deleteByPrimaryKey(String id);

    int insert(Poi record);

    int insertSelective(Poi record);

    Poi selectByPrimaryKey(String id);
    
    List<Poi> getAll();

    int updateByPrimaryKeySelective(Poi record);

    int updateByPrimaryKey(Poi record);
}