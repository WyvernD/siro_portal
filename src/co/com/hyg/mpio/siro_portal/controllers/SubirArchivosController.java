package co.com.hyg.mpio.siro_portal.controllers;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
public class SubirArchivosController 
{
	
	/*
	 * Autor:				Daiber Gonzalez.
	 * Descripción:			Esté método se usa para guardar un archivo en el servidor y retornar su nombre
	 * Fecha creación:		2017/10/17
	 * Decha modificación:	2017/10/17
	 * */
	@RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
	public static @ResponseBody String subirArchivo(MultipartHttpServletRequest request, HttpServletResponse response)
	{
		try
		{
			// Ruta de donde se guarda el archivo
			String strRuta = request.getParameter("ruta");
			// Id del registro en la base de datos (para diferenciar las imagenes)
			String strIdPP = request.getParameter("id");
			// Varaible para guardar los datos del archivo
			MultipartFile file = request.getFile("file");
			// Tipo de archivo
			String tipo = request.getParameter("tipo");
			
			// Si hay que válidar extensión
			if (request.getParameter("validar") != null)
			{
				boolean bl_vl = validarExtension(tipo, file);
				
				if (!bl_vl)
					return "0";
			}
			
			// Variable para leer y escribir el archivo
			BufferedOutputStream stream;
			// Variable para obtener los bytes del archivo
			byte[] bytes = file.getBytes();
			// Ruta donde se creará el archivo
			File rutaFile = null;
			
			rutaFile = new File(strRuta);
			
			// Se crea la carpeta en caso de no existir
			rutaFile.mkdirs();
			// Nombre original del archivo
			String strOriginalName = file.getOriginalFilename();
			// Se separa para poder obtener la extensión
			String[] strName = strOriginalName.split("\\.");
			// Varaible con el bombre que se guardará
			String strNewName = null;
			if (tipo.equals("imagen"))
				strNewName = strIdPP + ".png";
			else
				strNewName = strIdPP + "." + strName[strName.length - 1];
			
			// Se lee la ruta + el nombre de la imagen
			stream = new BufferedOutputStream(new FileOutputStream(rutaFile + File.separator + strNewName));
			// Se escriben los bytes
			stream.write(bytes);
			// Se cierra el stream
			stream.close();
			// Variable a retornar
			String resultado = null;
			
			resultado = strNewName;
			
			return resultado;
		}
		catch (Exception e)
		{
			String tmp = e.getMessage();
			return tmp;
		}
	}
	
	/*
	 * Autor:				Daiber Gonzalez.
	 * Descripción:			Esté método se usa para validar la extensión del archivo a subir
	 * Fecha creación:		2017/11/08
	 * Decha modificación:	2017/11/08
	 * */
	private static boolean validarExtension(String tipo, MultipartFile file)
	{
		// Se obtiene la extensión
		String extension = getExtension(file).toLowerCase();
		
		// Si es un documento
		if (tipo.equals("documento"))
		{
			// Solo puede tener una de las siguientes extensiones
			if (extension.equals("pdf") || extension.equals("docx") || extension.equals("doc") || extension.equals("xlsx")|| extension.equals("xls"))
				return true;
			
			return false;
		}
		// Si es imagen
		if (tipo.equals("imagen"))
		{
			// Solo puede tener una de las siguientes extensiones
			if (extension.equals("png") || extension.equals("jpg") || extension.equals("jpeg"))
				return true;

			return false;
		}
		
		return false;
	}
	
	/*
	 * Autor:				Daiber Gonzalez.
	 * Descripción:			Esté método se usa para optener extensión del archivo a subir
	 * Fecha creación:		2017/11/08
	 * Decha modificación:	2017/11/08
	 * */
	private static String getExtension(MultipartFile file)
	{
		// Nombre original del archivo
		String strOriginalName = file.getOriginalFilename();
		// Se separa para poder obtener la extensión
		String[] strName = strOriginalName.split("\\.");
		// Se retorna la extensión
		return strName[strName.length - 1];
	}
	
	/*
	 * Autor:				Daiber Gonzalez.
	 * Descripción:			Esté método se usa para guardar un archivo en el servidor y retornar su nombre
	 * Fecha creación:		2017/11/07
	 * Decha modificación:	2017/11/07
	 * */
	@RequestMapping(value = "/deleteFile", method = RequestMethod.POST)
	public static @ResponseBody String eliminarArchivo(HttpServletRequest request, HttpServletResponse response)
	{
		try
		{
			// Ruta completa del archivo
			String str_ruta = request.getParameter("ruta");
			// Ruta donde se creará el archivo
			File rutaFile = new File(str_ruta);
			
			if (!eliminar(rutaFile))
				return "0";
			
			return "1";
		}
		catch (Exception e)
		{
			String tmp = e.getMessage();
			return "-1";
		}
	}
	
	public static boolean eliminar(File fichero)
	{

	    if (!fichero.exists())
	    {
	        return false;
	    }
	    
        fichero.delete();
        return true;
	}
}