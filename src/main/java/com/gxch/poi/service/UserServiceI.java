package com.gxch.poi.service;

import java.util.List;

import com.gxch.poi.entity.User;

public interface UserServiceI {
	
    int deleteByPrimaryKey(String id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
    
    List<User> getAll();
}
