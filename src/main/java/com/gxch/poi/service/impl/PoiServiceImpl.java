package com.gxch.poi.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gxch.poi.dao.PoiMapper;
import com.gxch.poi.entity.Poi;
import com.gxch.poi.service.PoiServiceI;

@Service
public class PoiServiceImpl implements PoiServiceI{

	@Autowired
	private PoiMapper poiMapper;
	
	public void setPoiMapper(PoiMapper poiMapper) {
		this.poiMapper = poiMapper;
	}

	public int deleteById(String id) {
		return poiMapper.deleteByPrimaryKey(id);
	}

	public int insert(Poi record) {
		return poiMapper.insert(record);
	}

	public Poi selectById(String id) {
		return poiMapper.selectByPrimaryKey(id);
	}

	public List<Poi> getAll() {
		return poiMapper.getAll();
	}

	public int update(Poi record) {
		return poiMapper.updateByPrimaryKey(record);
	}

	public Poi selectByPrimaryKey(String id) {
		return poiMapper.selectByPrimaryKey(id);
	}

	
}
