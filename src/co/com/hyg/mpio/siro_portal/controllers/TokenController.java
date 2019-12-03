package co.com.hyg.mpio.siro_portal.controllers;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.jose4j.jwk.RsaJsonWebKey;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.jwt.consumer.JwtConsumer;
import org.jose4j.jwt.consumer.JwtConsumerBuilder;
import org.jose4j.keys.resolvers.JwksVerificationKeyResolver;
import org.springframework.stereotype.Controller;

import co.com.hyg.mpio.siro_portal.bo.TokenBO;
import co.com.hyg.mpio.siro_portal.utils.Usuario;
import sun.misc.BASE64Decoder;

@Controller
public class TokenController
{
	
	private TokenBO tokenBO = new TokenBO();

	public String validarToken(String token, HttpServletRequest request)
	{
		try
		{
			RsaJsonWebKey sign_jwk = publicKey();
			List jwks_list = new ArrayList();
			jwks_list.add(sign_jwk);
			JwksVerificationKeyResolver jwks_resolver = new JwksVerificationKeyResolver(jwks_list);
			JwtConsumer consumer = new JwtConsumerBuilder().setExpectedAudience("receiver").setExpectedIssuer("sender")
					.setVerificationKeyResolver(jwks_resolver).setRequireSubject().build();
			JwtClaims receivedClaims = consumer.processToClaims(token);
			HttpSession session = request.getSession();
			Usuario usuario = (Usuario) session.getAttribute("usuario");
			if (usuario != null) {
				if (!usuario.getIdentificador().equals((String) receivedClaims.getClaimValue("usuario"))) {
					usuario = tokenBO.consultarUsuario((String) receivedClaims.getClaimValue("usuario"), null);
				}
			} else{
				usuario = tokenBO.consultarUsuario((String) receivedClaims.getClaimValue("usuario"), null);
			}
			if (usuario != null) {
				session = request.getSession();
				session.setAttribute("usuario", usuario);
				return "OK";
			} else {
				return "Error Token";
			}
		} catch (Exception ex) {
			ex.printStackTrace();
			return "Error Token";
		}
	}

	public RsaJsonWebKey publicKey() throws Exception
	{
		String pubKey = loadPublicKey();
		BASE64Decoder b64d = new BASE64Decoder();
		byte[] data = b64d.decodeBuffer(pubKey);
		X509EncodedKeySpec spec = new X509EncodedKeySpec(data);
		KeyFactory fact = KeyFactory.getInstance("RSA");
		PublicKey publicKey = fact.generatePublic(spec);
		RsaJsonWebKey sign_jwk = new RsaJsonWebKey((RSAPublicKey) publicKey);
		sign_jwk.setAlgorithm("RSA");
		return sign_jwk;
	}

	public String loadPublicKey() throws Exception
	{
		String strKeyPEM = "";
		BufferedReader br = new BufferedReader(
				new InputStreamReader(this.getClass().getClassLoader().getResourceAsStream("public.pem")));
		String line;
		while ((line = br.readLine()) != null) {
			strKeyPEM += line + "\n";
		}
		br.close();
		strKeyPEM = strKeyPEM.replace("-----BEGIN PUBLIC KEY-----", "");
		strKeyPEM = strKeyPEM.replace("-----END PUBLIC KEY-----", "");
		return strKeyPEM;
	}
}