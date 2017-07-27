package com.gxch.poi.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gxch.poi.entity.User;
import com.gxch.poi.service.CaptchaServiceI;
import com.gxch.poi.service.UserServiceI;

@Controller
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserServiceI userServiceI;
	@Autowired
	private CaptchaServiceI captchaService;
	
	private static Boolean isCaptcha;
	
	public static Boolean getIsCaptcha() {
		return isCaptcha;
	}

	public static void setIsCaptcha(Boolean isCaptcha) {
		UserController.isCaptcha = isCaptcha;
	}
	
	@RequestMapping("/findUser")
	public void findUser(){
		User user = userServiceI.selectByPrimaryKey("u002");
		System.out.println(user.getCreatetime());
	}
	/**
	 * 生成验证码
	 */
	@RequestMapping("/captcha")
	public @ResponseBody void captcha(HttpServletRequest request, HttpServletResponse response) throws IOException {
		captchaService.genernateCaptchaImage(request, response);
		isCaptcha = Boolean.FALSE;
		System.out.println("ok");
	}
}
