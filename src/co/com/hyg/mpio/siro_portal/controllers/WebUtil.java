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
			return new String(decodedBytes).replace("||a||", "á")
					.replace("||e||", "é").replace("||i||", "í")
					.replace("||o||", "ó").replace("||u||", "ú")
					.replace("||A||", "Á").replace("||E||", "É")
					.replace("||I||", "Í").replace("||O||", "Ó")
					.replace("||U||", "Ú").replace("||n||", "ñ")
					.replace("||N||", "Ñ").replace("||!||", "¡")
					.replace("||?||", "¿").replace("||uu||", "ü")
					.replace("||UU||", "Ú");
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
