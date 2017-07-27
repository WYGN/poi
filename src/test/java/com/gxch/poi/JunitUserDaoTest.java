package com.gxch.poi;


import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.alibaba.fastjson.JSON;
import com.gxch.poi.dao.UserMapper;
import com.gxch.poi.entity.User;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring/spring-dao.xml"})
public class JunitUserDaoTest {
	
	private static final Logger logger = Logger.getLogger(JunitUserDaoTest.class);	
	@Autowired	
	private UserMapper userMapper;

	@Test
	public void testLoad(){
		User user =  userMapper.selectByPrimaryKey("u001");
		System.out.println(user.toString());
	}
	
	
	
	@Test
	public void testDelete(){
		int r = userMapper.deleteByPrimaryKey("u003");
		System.out.println(r);
	}
}
