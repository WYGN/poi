package com.gxch.poi.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gxch.poi.dao.UserMapper;
import com.gxch.poi.entity.User;
import com.gxch.poi.service.UserServiceI;

@Service
public class UserserviceImpl implements UserServiceI {

	@Autowired
	private UserMapper userMapper;	

	public int deleteByPrimaryKey(String id) {
		return userMapper.deleteByPrimaryKey(id);
	}

	public int insert(User record) {
		return userMapper.insert(record);
	}

	public User selectByPrimaryKey(String id) {
		return userMapper.selectByPrimaryKey(id);
	}

	public List<User> getAll() {
		return userMapper.getAll();
	}

	public int update(User record) {
		return userMapper.updateByPrimaryKey(record);
	}

	public int insertSelective(User record) {
		return userMapper.insertSelective(record);
	}

	public int updateByPrimaryKeySelective(User record) {
		return userMapper.updateByPrimaryKeySelective(record);
	}

	public int updateByPrimaryKey(User record) {
		return userMapper.updateByPrimaryKey(record);
	}
	
}
