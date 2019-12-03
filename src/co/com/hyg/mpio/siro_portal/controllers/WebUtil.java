package co.com.hyg.mpio.siro_portal.controllers;


import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class WebUtil {

	public static String decodeBase64(String cadenaCodificada) {
		try {
			if (cadenaCodificada == null || cadenaCodificada.equals(""))
				cadenaCodificada = "";
			BASE64Decoder decoder = new BASE64Decoder();
			byte[] decodedBytes = decoder.decodeBuffer(cadenaCodificada);
			return new String(decodedBytes).replace("||a||", "�")
					.replace("||e||", "�").replace("||i||", "�")
					.replace("||o||", "�").replace("||u||", "�")
					.replace("||A||", "�").replace("||E||", "�")
					.replace("||I||", "�").replace("||O||", "�")
					.replace("||U||", "�").replace("||n||", "�")
					.replace("||N||", "�").replace("||!||", "�")
					.replace("||?||", "�").replace("||uu||", "�")
					.replace("||UU||", "�");
		} catch (Exception e) {
			return null;
		}
	}

	public static String encodeBase64(String cadena) {
		try {
			if (cadena == null)
				cadena = "";
			BASE64Encoder encoder = new BASE64Encoder();
			String encodedBytes = encoder.encodeBuffer(cadena.getBytes());
			return encodedBytes;
		} catch (Exception e) {
			return null;
		}
	}
}
