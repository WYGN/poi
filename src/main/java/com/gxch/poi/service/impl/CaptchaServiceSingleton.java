package com.gxch.poi.service.impl;

import com.gxch.poi.tool.GMailEngine;
import com.octo.captcha.service.captchastore.FastHashMapCaptchaStore;
import com.octo.captcha.service.image.DefaultManageableImageCaptchaService;
import com.octo.captcha.service.image.ImageCaptchaService;

public class CaptchaServiceSingleton {
	private static ImageCaptchaService instance = new DefaultManageableImageCaptchaService(
			new FastHashMapCaptchaStore(), new GMailEngine(), 180, 100000, 75000);

	public static ImageCaptchaService getInstance() {
		return instance;
	}
}
