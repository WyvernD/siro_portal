package co.com.hyg.mpio.siro_portal.bo;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Types;

import org.apache.log4j.Logger;

import co.com.hyg.mpio.siro_portal.controllers.WebUtil;
import co.com.hyg.mpio.siro_portal.utils.DataBase;

public class UtilsBO
{

	// Instancia de la clase DataBase
	private DataBase dataSource = new DataBase();
	// Variable para controlar errores y guardarlos en un log
	final static Logger logger = Logger.getLogger(UtilsBO.class);
	
	/*
	 * Autor:				Daiber Gonzalez
	 * Descripción:			Esté método hace una consulta a la base de datos con el procedimiento get
	 * Fecha creación:		2017/10/26
	 * Fecha modificación:	2017/10/26
	 * */
	public String get_datos (String parametro)
	{
		// Varaible para iniciar la conexión
		Connection conexion = null;
		// Variable para ejecutar el procedimiento almacenado
		CallableStatement callStatement = null;
		// Variable para devolver a la vista
		String salida = null;
		
		try
		{
			// Se inicia la conexión
			conexion = dataSource.getConnectionApp();
			// Variable string para el nombre del procedimiento
			String query = "{call SP_GET_DATOS(?, ?)}";
			// Se prepara el procedimiento
			callStatement = conexion.prepareCall(query);
			// Se le pasa el primer parametro
			callStatement.setString(1, parametro);
			// Se le pasa el segundo parametro
			callStatement.registerOutParameter(2, Types.CLOB);
			// Se ejecuta el procedimeinto
			callStatement.execute();
			// Se guarda lo que el procedimiento devuelva como segundo parametro
			// en la variable "salida"
			salida = callStatement.getString(2);
		}
		catch (Exception e) 
		{
			// Si hay errores se guardan en el logger
			logger.error(e);
		}
		finally 
		{
			try 
			{
				// Se cierra el statetment
				if (callStatement != null)
					callStatement.close();
			} 
			catch (Exception e) 
			{
				// Si hay errores se guardan en el logger
				logger.error(e);
			}
			try 
			{
				// Se cierra la conexión
				if (conexion != null)
					conexion.close();
			} 
			catch (Exception e) 
			{
				// Si hay errores se guardan en el logger
				logger.error(e);
			}
		}
		
		return salida;
	}
	
	/*
	 * Autor:				Daiber Gonzalez
	 * Descripción:			Esté método hacer un envio de datos a la base de datos
	 * Fecha creación:		2017/11/22
	 * Fecha modificación:	2017/11/22
	 * */
	public String set_datos (String parametro)
	{
		// Variable para iniciar la conexión
		Connection conexion = null;
		// Variable para ejecutar el procedimiento almacenado
		CallableStatement callStatement = null;
		// Variable para devolverle a la vista
		String salida = null;
		
		try
		{
			// Se incia la conexión
			conexion = dataSource.getConnectionApp();
			// Query para ejecutar el procedimiento
			String query = "{call SP_SET_DATOS(?, ?)}";
			// Se prepara el procedimiento
			callStatement = conexion.prepareCall(query);
			// Se le pasa el primer parametro
			callStatement.setString(1, parametro);
			// Se le pasa el segundo parametro
			callStatement.registerOutParameter(2, Types.CLOB);
			// Se ejecuta el procedimiento
			callStatement.execute();
			// Se guarda lo que devuelva como segundo parametro en la variable "salida"
			salida = callStatement.getString(2);
		}
		catch (Exception e) 
		{
			// Si hay errores se guardan en el logger
			logger.error(e);
		}
		finally 
		{
			try 
			{
				// Se cierra el statetment
				if (callStatement != null)
					callStatement.close();
			} 
			catch (Exception e) 
			{
				// Si hay errores se guardan en el logger
				logger.error(e);
			}
			try 
			{
				// Se cierra la conexión
				if (conexion != null)
					conexion.close();
			} 
			catch (Exception e) 
			{
				// Si hay errores se guardan en el logger
				logger.error(e);
			}
		}
		
		return salida;
	}
	
	/*
	 * Autor:				Duberney Martinez.
	 * Descripción:			Esté método guardar el nuevo usuario con el procedimiento set_usuario
	 * Fecha creación:		2017/04/10
	 * Fecha modificación:	2017/04/10
	 * */
	public String set_usuario (
		String nro_doc,
		String nombre,
		String apellido,
		String email,
		String telefono,
		String identificador,
		int tipo,
		String clave)
	{
		// Varaible para iniciar la conexión
		Connection conexion = null;
		// Variable para ejecutar el procedimiento almacenado
		CallableStatement callStatement = null;
		// Variable para devolver a la vista
		String salida = null;
		
		try
		{
			// Se inicia la conexión
			conexion = dataSource.getConnectionMapgis();
			// Variable string para el nombre del procedimiento
			String query = "{call SP_SET_USUARIO(?,?,?,?,?,?,?,?,?)}";
			// Se prepara el procedimiento
			callStatement = conexion.prepareCall(query);
			// Se le pasan los parametros
			callStatement.setString(1, nro_doc);
			callStatement.setString(2, nombre);
			callStatement.setString(3, apellido);
			callStatement.setString(4, email);
			callStatement.setString(5, telefono);
			callStatement.setString(6, identificador);
			callStatement.setInt(7, tipo);
			callStatement.setString(8, clave);
			
			// Se le pasa el parametro de salida
			callStatement.registerOutParameter(9, Types.CLOB);
			// Se ejecuta el procedimiento
			callStatement.execute();
			// Se guarda lo que el procedimiento devuelva como segundo parametro
			// en la variable "salida"
			salida = callStatement.getString(9);
		}
		catch (Exception e) 
		{
			// Si hay errores se guardan en el logger
			logger.error(e);
		}
		finally 
		{
			try 
			{
				// Se cierra el statetment
				if (callStatement != null)
					callStatement.close();
			} 
			catch (Exception e) 
			{
				// Si hay errores se guardan en el logger
				logger.error(e);
			}
			try 
			{
				// Se cierra la conexión
				if (conexion != null)
					conexion.close();
			} 
			catch (Exception e) 
			{
				// Si hay errores se guardan en el logger
				logger.error(e);
			}
		}
		
		return salida;
	}
	
	/*
	 * Autor:				Duberney Martinez.
	 * Descripción:			Esté método envía un email de recuperación de clave al usuario.
	 * Fecha creación:		2017/04/21
	 * Fecha modificación:	2017/04/21
	 * */
	public String send_email_html (
		String to,
		String from,
		String fromname,
		String subject,
		String html_txt_msg
		)
	{
		// Varaible para iniciar la conexión
		Connection conexion = null;
		// Variable para ejecutar el procedimiento almacenado
		CallableStatement callStatement = null;
		// Variable para devolver a la vista
		String salida = null;
		
		try
		{
			// Se inicia la conexión
			conexion = dataSource.getConnectionMapgis();
			// Variable string para el nombre del procedimiento
			String query = "{ call SEND_MAIL_HTML(?,?,?,?,?,?,?,?,?) }";
			// Se prepara el procedimiento
			callStatement = conexion.prepareCall(query);
			// Se le pasan los parametros
			callStatement.setString(1, to);
			callStatement.setString(2, from);
			callStatement.setString(3, fromname);
			callStatement.setString(4, null);
			callStatement.setString(5, null);
			callStatement.setString(6, subject);
			callStatement.setString(7, null);
			callStatement.setString(8, html_txt_msg);
			
			// Se le pasa el parametro de salida
			callStatement.registerOutParameter(9, Types.CLOB);
			// Se ejecuta el procedimiento
			callStatement.execute();
			// Se guarda lo que el procedimiento devuelva como segundo parametro
			// en la variable "salida"
			salida = callStatement.getString(9);
		}
		catch (Exception e) 
		{
			// Si hay errores se guardan en el logger
			logger.error(e);
		}
		finally 
		{
			try 
			{
				// Se cierra el statetment
				if (callStatement != null)
					callStatement.close();
			} 
			catch (Exception e) 
			{
				// Si hay errores se guardan en el logger
				logger.error(e);
			}
			try 
			{
				// Se cierra la conexión
				if (conexion != null)
					conexion.close();
			} 
			catch (Exception e) 
			{
				// Si hay errores se guardan en el logger
				logger.error(e);
			}
		}
		
		return salida;
	}
	
}