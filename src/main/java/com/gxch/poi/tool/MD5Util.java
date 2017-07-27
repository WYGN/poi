package com.gxch.poi.tool;

import java.security.MessageDigest;

import org.junit.Test;

public class MD5Util {

	/**
     * ����md5
     * @param message
     * @return
     */
    public static String getMD5(String message) {
        String md5str = "";
        try {
            //1 ����һ���ṩ��ϢժҪ�㷨�Ķ��󣬳�ʼ��Ϊmd5�㷨����
            MessageDigest md = MessageDigest.getInstance("MD5");
 
            //2 ����Ϣ���byte����
            byte[] input = message.getBytes();
 
            //3 ��������ֽ�����,�������128λ��
            byte[] buff = md.digest(input);
 
            //4 ������ÿһ�ֽڣ�һ���ֽ�ռ��λ������16��������md5�ַ���
            md5str = bytesToHex(buff);
 
        } catch (Exception e) {
            e.printStackTrace();
        }
        return md5str;
    }
 
    /**
     * ������תʮ������
     * @param bytes
     * @return
     */
    public static String bytesToHex(byte[] bytes) {
        StringBuffer md5str = new StringBuffer();
        //������ÿһ�ֽڻ���16��������md5�ַ���
        int digital;
        for (int i = 0; i < bytes.length; i++) {
             digital = bytes[i];
 
            if(digital < 0) {
                digital += 256;
            }
            if(digital < 16){
                md5str.append("0");
            }
            md5str.append(Integer.toHexString(digital));
        }
        return md5str.toString().toUpperCase();
    }
    
    @Test
    public void testMD5(){
    	String message="123";
    	String result=getMD5(message);
    	System.out.println(result);
    }

}
