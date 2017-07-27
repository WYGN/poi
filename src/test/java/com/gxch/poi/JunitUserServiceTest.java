package com.gxch.poi;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.gxch.poi.entity.User;
import com.gxch.poi.service.UserServiceI;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring/spring-dao.xml","classpath:spring/spring-service.xml" })
public class JunitUserServiceTest {
	
	@Autowired	
	private UserServiceI userServiceI;
	
	
	public UserServiceI getUserServiceI() {
		return userServiceI;
	}

	public void setUserServiceI(UserServiceI userServiceI) {
		this.userServiceI = userServiceI;
	}

	@Test
	public void testLoad(){
		User user =  userServiceI.selectByPrimaryKey("u002");
		System.out.println("user:--->"+user.getPassword());
	}
	
	
	@Test
	public void testDelete(){
		int r = userServiceI.deleteByPrimaryKey("u003");
		System.out.println(r);
	}
}
