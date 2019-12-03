package co.com.hyg.mpio.siro_portal.utils;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ResourceBundle;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import org.apache.log4j.Logger;

public class DataBase
{

	private static ResourceBundle rb = ResourceBundle.getBundle("co.com.hyg.mpio.siro_portal.config.conexion");
	final static Logger logger = Logger.getLogger(DataBase.class);

	public Connection getConnectionApp()
	{
		String conexionName = rb.getString("CONEXION_SIRO");
		return getConnection(conexionName);
	}

	public Connection getConnectionMapgis()
	{
		String conexionName = rb.getString("CONEXION_MAPGIS");
		return getConnection(conexionName);
	}

	public Connection getConnection(String conexionName)
	{
		try
		{
			Context initCtx = new InitialContext();
			DataSource ds = null;
			ds = (DataSource) initCtx.lookup(conexionName);
			return ds.getConnection();
		}
		catch (SQLException ex)
		{
			logger.error(ex.getMessage());
			return null;
		}
		catch (NamingException e)
		{
			try
			{
				Context initCtx = new InitialContext();
				Context envCtx = (Context) initCtx.lookup("java:comp/env");
				DataSource ds = null;
				ds = (DataSource) envCtx.lookup(conexionName);
				return ds.getConnection();
			}
			catch (SQLException ex)
			{
				logger.error(ex.getMessage());
				return null;
			}
			catch (NamingException e2)
			{
				try
				{
					Context initCtx = new InitialContext();
					Context envCtx = (Context) initCtx.lookup("java:");
					DataSource ds = null;
					ds = (DataSource) envCtx.lookup(conexionName);
					return ds.getConnection();
				}
				catch (SQLException ex)
				{
					logger.error(ex.getMessage());
					return null;
				}
				catch (NamingException e3)
				{
					logger.error(e3.getMessage());
					return null;
				}
			}
		}
	}
}