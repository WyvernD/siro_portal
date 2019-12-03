package co.com.hyg.mpio.siro_portal.controllers;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.jose4j.json.internal.json_simple.JSONArray;
import org.jose4j.json.internal.json_simple.JSONObject;
import org.jose4j.json.internal.json_simple.parser.JSONParser;
import org.jose4j.json.internal.json_simple.parser.ParseException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import co.com.hyg.mpio.siro_portal.bo.UtilsBO;
import co.com.hyg.mpio.siro_portal.utils.Usuario;
import co.com.hyg.mpio.siro_portal.utils.Perfil;
import co.com.hyg.mpio.siro_portal.utils.MD5;

@Controller
public class UtilsController
{
	
	// Instancia de la clase UtilsBO
	private UtilsBO uBO = new UtilsBO();
	// Instancia de la clase TokenController
	private TokenController tokenCO = new TokenController();
	// Instancia de la clase MD5
	private MD5 codMD5 = new MD5();
	
	@RequestMapping(value = "consultar_datos", method = RequestMethod.POST)
	public @ResponseBody String consultarDatos(HttpServletRequest request, HttpServletResponse response)
	{
		// Variable que almacena lo que retorna el método consultarEstado(método perteneciente al BO)
		String resultado = null;
		// Parametro sql
		String str_sql = WebUtil.decodeBase64(request.getParameter("str_sql"));
		// Token del usuario
		String token = WebUtil.decodeBase64(request.getParameter("token"));
		
		// Si el token es -1 es porque no es requerido par la petición
		if (!request.getParameter("token").equals("-1"))
		{
			// Se válida el token
			String rtaToken = tokenCO.validarToken(token, request);
			
			// Si el token es válido
			if (rtaToken != "Error Token")
			{
				try
				{
					// Se obtiene el objeto sql
					String strSql = WebUtil.decodeBase64(request.getParameter("str_sql"));
					// Se optiene la sección
					HttpSession session = request.getSession(true);
					// Se obtiene el usuario
					Usuario usuario = (Usuario) session.getAttribute("usuario");
					// Se asigna el usuario al strsql
					strSql = strSql.replace("?USUARIO?", usuario.getIntIdUsuario() + "");
					// Se optiene el resultado
					resultado = uBO.get_datos(strSql);
				}
				catch (Exception e)
				{
					resultado = "error";
				}
			}
			else
				resultado = "Sin autenticación";
		}
		else
			resultado = uBO.get_datos(str_sql);
		
		// Se retorna el JSON
		return resultado;
	}
	
	@RequestMapping(value = "enviar_datos", method = RequestMethod.POST)
	public @ResponseBody String enviarDatos(HttpServletRequest request, HttpServletResponse response)
	{
		// Variable que almacena lo que retorna el método consultarEstado(método perteneciente al BO)
		String resultado = null;
		// Parametro sql
		String strSql = WebUtil.decodeBase64(request.getParameter("str_sql"));
		// Token del usuario
		String token = WebUtil.decodeBase64(request.getParameter("token"));
		
		// Si el token es -1 es porque no es requerido par la petición
		if (!request.getParameter("token").equals("-1"))
		{
			// Se válida el token
			String rtaToken = tokenCO.validarToken(token, request);
			
			// Si el token es válido
			if (rtaToken != "Error Token")
			{
				try
				{
					// Se optiene la sección
					HttpSession session = request.getSession(true);
					// Se obtiene el usuario
					Usuario usuario = (Usuario) session.getAttribute("usuario");
					// Se asigna el usuario al strsql
					strSql = strSql.replace("?USUARIO?", usuario.getIntIdUsuario() + "");
					// Se optiene el resultado
					resultado = uBO.set_datos(strSql);
				}
				catch (Exception e)
				{
					resultado = "error";
				}
			}
			else
				resultado = "Sin autenticación";
		}
		else
			resultado = uBO.set_datos(strSql);
		
		// Se retorna el JSON
		return resultado;
	}
	
	@RequestMapping(value = "consultar_perfil", method = RequestMethod.POST)
	public @ResponseBody List<Perfil> get_perfil(HttpServletRequest request, HttpServletResponse response)
	{
		List<Perfil> respuesta = null;
		String token = WebUtil.decodeBase64(request.getParameter("token"));
		String rtaToken = tokenCO.validarToken(token, request);
		
		if (rtaToken != "Error Token")
		{
			try
			{
				HttpSession session = request.getSession();
				Usuario usuario = (Usuario) session.getAttribute("usuario");
				respuesta = usuario.getPerfiles();
			}
			catch (Exception e)
			{
				respuesta = null;
			}
		}
		else
		{
			respuesta = null;
		}
		
		return respuesta;
	}
	
	
	@RequestMapping(value = "consultar_datos_usuario", method = RequestMethod.POST)
	public @ResponseBody String consultarDatosUsuario(HttpServletRequest request, HttpServletResponse response)
	{
		// Variable que almacena lo que retorna el método consultarEstado(método perteneciente al BO)
		String resultado = null;
		// Parametro sql
		String str_sql = WebUtil.decodeBase64(request.getParameter("str_sql"));

		try
		{
			// Se obtiene el objeto sql
			String strSql = WebUtil.decodeBase64(request.getParameter("str_sql"));
			// Se optiene el resultado
			resultado = uBO.get_datos(strSql);
		}
		catch (Exception e)
		{
			resultado = "error";
		}
		
		// Se retorna el JSON
		return resultado;
	}
	
	@RequestMapping(value = "guardar_usuario", method = RequestMethod.POST)
	public @ResponseBody String guardarDatosUsuario( HttpServletRequest request, HttpServletResponse response )
	{
		
		String resultado = null;
		// Parametros
		String nro_doc = WebUtil.decodeBase64(request.getParameter("nro_doc"));
		String nombre = WebUtil.decodeBase64(request.getParameter("nombre"));
		String apellido = WebUtil.decodeBase64(request.getParameter("apellido"));
		String email = WebUtil.decodeBase64(request.getParameter("email"));
		String telefono = WebUtil.decodeBase64(request.getParameter("telefono"));
		String identificador = WebUtil.decodeBase64(request.getParameter("identificador"));
		int tipo = Integer.parseInt(WebUtil.decodeBase64(request.getParameter("tipo")));
		String clave = WebUtil.decodeBase64(request.getParameter("clave"));
		
		try
		{
			String claveCod = codMD5.codificarMD5HMA(clave, identificador);
			// Se optiene el resultado
			resultado = uBO.set_usuario(nro_doc, nombre, apellido, email, telefono, identificador, tipo, claveCod);
		}
		catch (Exception e)
		{
			resultado = "error";
		}
		
		// Se retorna el JSON
		return resultado;
	}
	
	@RequestMapping(value = "recuperar_usuario", method = RequestMethod.POST)
	protected void recuperarClaveUsuario( HttpServletRequest request, HttpServletResponse response ) throws IOException
	{
		response.setContentType("text/html; charset=UTF-8");
		
		// Parametros
		String email = WebUtil.decodeBase64(request.getParameter("email"));
		
		PrintWriter out = response.getWriter();
				
		String resultado = null;
		
		String strSql = "{'SQL': 'SQL_VALIDAR_RECUPERAR_CLAVE', 'N': 1, 'DATOS': {'P1': '" + email + "'}}"; 
		resultado = uBO.get_datos(strSql);
		
		try 
		{
			JSONArray json = new JSONArray(string_to_jsonarray(resultado));
			JSONObject obj = (JSONObject) json.get(0);
			
			String idUsuario = obj.get("ID_USUARIO").toString();
			String nUsuario = obj.get("NOMBRE").toString();
			String uUsuario = obj.get("IDENTIFICADOR").toString();
			int tClave = 0;
			
			strSql = "{'SQL': 'SQL_SELECT_USUARIO_PASSWORD', 'N': 0, 'DATOS': { }}";
			resultado = uBO.get_datos(strSql);
			try 
			{
				JSONArray jsonClave = new JSONArray(string_to_jsonarray(resultado));
				JSONObject objClave = (JSONObject) jsonClave.get(0);
				tClave = Integer.parseInt(objClave.get("TAM").toString());
			} 
			catch (Exception e) { }
			
			String nuevaClave = "";
			String NUMEROS = "0123456789";
			String MAYUSCULAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		 	String MINUSCULAS = "abcdefghijklmnopqrstuvwxyz";
			String key = NUMEROS + MAYUSCULAS + MINUSCULAS;
			
			for (int i = 0; i < tClave; i++) 
			{
				nuevaClave += key.charAt((int)(Math.random() * key.length()));
			}
		
			String styleCss = "";
			strSql = "{'SQL': 'SQL_PARAM_MSG_EMAIL_RECUPERAR_S', 'N': 0, 'DATOS': { }}";
			resultado = uBO.get_datos(strSql);
			
			try 
			{
				JSONArray jsonStyle = new JSONArray(string_to_jsonarray(resultado));
				JSONObject objStyle = (JSONObject) jsonStyle.get(0);
				int cssCount = 0;
				cssCount = Integer.parseInt(objStyle.get("COL").toString());
				styleCss += objStyle.get("CSS").toString();
				
				if(cssCount > 0) 
				{
					for (int i = 0; i < cssCount; i++) 
					{
						strSql = "{'SQL': 'SQL_PARAM_MSG_EMAIL_RECUPERAR_S"+i+"', 'N': 0, 'DATOS': { }}";
						resultado = uBO.get_datos(strSql);
						
						try 
						{
							styleCss += ((JSONObject) new JSONArray(string_to_jsonarray(resultado)).get(0)).get("CSS").toString();
						} 
						catch (Exception e) { }
						
					}
				}
				
			} 
			catch (Exception e) { }
			
			String headHtml = "";
			strSql = "{'SQL': 'SQL_PARAM_MSG_EMAIL_RECUPERAR_H', 'N': 0, 'DATOS': { }}";
			resultado = uBO.get_datos(strSql);
			try 
			{
				JSONArray jsonHead = new JSONArray(string_to_jsonarray(resultado));
				JSONObject objHead = (JSONObject) jsonHead.get(0);
				headHtml += objHead.get("HEAD").toString();
			}
			catch (Exception e) { }
			
			String bodyHtml = "";
			strSql = "{'SQL': 'SQL_PARAM_MSG_EMAIL_RECUPERAR_B', 'N': 0, 'DATOS': { }}";
			resultado = uBO.get_datos(strSql);
			
			try 
			{
				JSONArray jsonBody = new JSONArray(string_to_jsonarray(resultado));
				JSONObject objBody = (JSONObject) jsonBody.get(0);
				bodyHtml += objBody.get("BODY").toString();
			} 
			catch (Exception e) { }
			
			String footerHtml = "";
			strSql = "{'SQL': 'SQL_PARAM_MSG_EMAIL_RECUPERAR_B', 'N': 0, 'DATOS': { }}";
			resultado = uBO.get_datos(strSql);
			
			try {
				JSONArray jsonFooter = new JSONArray(string_to_jsonarray(resultado));
				JSONObject objFooter = (JSONObject) jsonFooter.get(0);
				bodyHtml += objFooter.get("FOOTER").toString();
			} 
			catch (Exception e) { }
			
			String html_txt = "";
			html_txt += "<!doctype html>";
			html_txt += "<html>"; 
				html_txt += "<head>";
				html_txt += "<meta name='viewport' content='width=device-width' />";
				html_txt +=	"<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />";
				html_txt += "<style>"+styleCss+"</style>";
				html_txt +=	"<body class=''>";
				html_txt += headHtml;
				html_txt += bodyHtml;
				html_txt += footerHtml;
				html_txt +=	"</body>"; 
			html_txt += "</html>";
			
			html_txt = html_txt.replace("${USUARIO}", nUsuario);
			html_txt = html_txt.replace("${CLAVE}", nuevaClave);
			
			strSql = "{'SQL': 'SQL_PARAM_MSG_EMAIL_RECUPERAR_CONFIG', 'N': 0, 'DATOS': { }}";
			resultado = uBO.get_datos(strSql);
			String from = "";
			String fromname = "";
			String to = email;
			String subject = "";
			
			try {
				JSONObject datosConfig = (JSONObject) new JSONArray(string_to_jsonarray(resultado)).get(0);
				from = datosConfig.get("FROM").toString();
				subject = datosConfig.get("SUBJECT").toString();
			} catch (Exception e) { }
			
			resultado = uBO.send_email_html(to, from, fromname, subject, html_txt);
			
			if(resultado == null) 
			{
				out.print("No disponible actualmente, intente mas tarde.");
			} 
			else 
			{
				if(resultado.equals("Ok"))
				{
					String nuevaClaveI = "";
					nuevaClaveI = codMD5.codificarMD5HMA(nuevaClave, uUsuario);
					strSql = "[{'SQL': 'SQL_UPDATE_RECUPERAR_CLAVE', 'N': 2, 'DATOS': [{ 'P1': '"+nuevaClaveI+"', 'P2': '"+idUsuario+"' }]}]";
					resultado = uBO.set_datos(strSql);
					
					if(resultado.equals("Ok"))
					{
						out.print("Se ha enviado satisfactoriamente.");
					}
				}
			}
			
		} 
		catch (Exception e) 
		{
			out.print(e);
		} finally { }
		
	}

	@RequestMapping(value = "cambiar_clave", method = RequestMethod.POST)
	public @ResponseBody String cambiarClaveUsuario( HttpServletRequest request, HttpServletResponse response )
	{

		String resultado = null;
		
		// Parametros
		String clave = WebUtil.decodeBase64(request.getParameter("clave"));
		String clave_n = WebUtil.decodeBase64(request.getParameter("clave_n"));
		
		try
		{
			HttpSession session = request.getSession(true);
			// Se obtiene el usuario
			Usuario usuario = (Usuario) session.getAttribute("usuario");
			String strSql = "{'SQL': 'SQL_SELECT_INFO_USUARIO', 'N': 1, 'DATOS': { 'P1': '"+ usuario.getIntIdUsuario()+"' }}";
			resultado = uBO.get_datos(strSql);
			String identificador = "";
			
			String claveCodA = "";
			String claveCod = "";
			
			try 
			{
				identificador = ((JSONObject) new JSONArray(string_to_jsonarray(resultado)).get(0)).get("IDENTIFICADOR").toString();
				claveCodA = ((JSONObject) new JSONArray(string_to_jsonarray(resultado)).get(0)).get("CLAVE").toString();
			} catch (Exception e) { }
			
			claveCod = codMD5.codificarMD5HMA(clave, identificador);
			
			if(claveCodA.equals(claveCod))
			{
				
				claveCod = codMD5.codificarMD5HMA(clave_n, identificador);
				
				strSql = "[{'SQL': 'SQL_UPDATE_RECUPERAR_CLAVE', 'N': 2, 'DATOS': [{ 'P1': '"+claveCod+"', 'P2': '"+usuario.getIntIdUsuario()+"' }]}]";
				resultado = uBO.set_datos(strSql);
				
			}
			else
			{
				resultado = "La clave ingresada no corresponde con la clave actual.";
			}
			
		}
		catch (Exception e)
		{
			resultado = "error";
		}
		
		// Se retorna el JSON
		return resultado;
	}
	
	public JSONArray string_to_jsonarray(String value)
	{
		// Variable para parsear a JSON
		JSONParser parser = new JSONParser();
		// Variable para crear JSON
		JSONArray json = null;
		
		try
		{
			// Se crea el json parseando el string
			json = (JSONArray) parser.parse(value);
		}
		catch (ParseException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return json;
	}
	
	public JSONObject string_to_json(String value)
	{
		value = value.replace("[", "");
		value = value.replace("]", "");
		// Variable para parsear a JSON
		JSONParser parser = new JSONParser();
		// Variable para crear JSON
		JSONObject json = null;
		
		try
		{
			// Se crea el json parseando el string
			json = (JSONObject) parser.parse(value);
		}
		catch (ParseException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return json;
	}
}
