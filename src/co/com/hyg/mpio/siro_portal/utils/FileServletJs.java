package co.com.hyg.mpio.siro_portal.utils;

import java.io.File;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;

import org.jose4j.json.internal.json_simple.JSONObject;
import org.jose4j.json.internal.json_simple.parser.JSONParser;
import org.jose4j.json.internal.json_simple.parser.ParseException;
import org.omnifaces.servlet.FileServlet;

import co.com.hyg.mpio.siro_portal.bo.UtilsBO;

@WebServlet("/jss/*")
public class FileServletJs extends FileServlet
{

	private UtilsBO u_bo = new UtilsBO();
	private static final long serialVersionUID = 1L;
	private File folder;

	@Override
	public void init() throws ServletException
	{		
		// Estructura json para hacer la consulta
		String str_json = "{'SQL' : 'SQL_CONSULTAR_RUTA_JS_PORTAL', 'N' : 0, 'DATOS' : {}}";
		// Se guarda el resultado de la consulta
		String str_ruta = u_bo.get_datos(str_json);
		// Se le remueven los corchetes al string
		str_ruta = str_ruta.replace("[", "");
		str_ruta = str_ruta.replace("]", "");
		// Variable para parsear a JSON
		JSONParser parser = new JSONParser();
		// Variable para crear JSON
		JSONObject json = null;
		
		try
		{
			// Se crea el json parseando el string
			json = (JSONObject) parser.parse(str_ruta);
			String str_full_ruta = json.get("RUTA").toString();
			folder = new File(str_full_ruta);
		}
		catch (ParseException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	protected File getFile(HttpServletRequest request) {
		String pathInfo = request.getPathInfo();

		if (pathInfo == null || pathInfo.isEmpty() || "/".equals(pathInfo)) {
			throw new IllegalArgumentException();
		}

		return new File(folder, pathInfo);
	}

}