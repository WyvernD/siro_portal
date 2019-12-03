package co.com.hyg.mpio.siro_portal.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.Provider;
import java.security.Security;

import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

public class MD5 {

	public static String codificarMD5Simple(String data, String key) {
		try {
			MessageDigest md5 = MessageDigest.getInstance("MD5");

			md5.update(data.getBytes());

			byte[] result = md5.digest(key.getBytes());

			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < result.length; i++) {

				String s = Integer.toHexString(result[i]);
				int length = s.length();

				if (length >= 2)
					sb.append(s.substring(length - 2, length));
				else {
					sb.append("0");
					sb.append(s);
				}
			}
			return sb.toString();
		} catch (NoSuchAlgorithmException e) {
			return null;
		}
	}
	
	public static boolean validarMD5Simple(String data, String key, String keyedDigest) {
		String string = codificarMD5Simple(data,key);
		if(string.equals(keyedDigest))
			return true;
		else
			return false;
	}

	public static boolean validarMD5MD5HMA(String data, String key, String keyedDigest) {
		String string = codificarMD5HMA(data,key);
		if(string.equals(keyedDigest))
			return true;
		else
			return false;
	}
	
	//metodo a utilizar con ecriptacion en javasecript
    public static String codificarMD5HMA( String message, String keyString)  {
    	Provider sunJce = new com.sun.crypto.provider.SunJCE();
            Security.insertProviderAt(sunJce,0);
            SecretKey key = new SecretKeySpec(keyString.getBytes(), "HmacMD5");
            try {
    		Mac mac = Mac.getInstance("HmacMD5");
    		mac.init(key);
    		return toHEX(mac.doFinal(message.getBytes())); 
            } catch (Exception e) { 
    		throw new RuntimeException("Failed to create signature", e);
            }
        }
        
        private static String toHEX(byte[] digest) {
            StringBuffer hexString = new StringBuffer();
            for (int i = 0; i < digest.length; ++i) { 
    		String hx = Integer.toHexString(0xFF & digest[i]); 
    		if (hx.length() == 1) { 
    			hx = "0" + hx; 
    		} 
    		hexString.append(hx); 
            }
            return hexString.toString();
        }
}