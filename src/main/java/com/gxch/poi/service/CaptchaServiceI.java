package com.gxch.poi.service;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface CaptchaServiceI {

	/**
	 * ������֤��
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void genernateCaptchaImage(HttpServletRequest request, HttpServletResponse response)  
            throws IOException;
}
