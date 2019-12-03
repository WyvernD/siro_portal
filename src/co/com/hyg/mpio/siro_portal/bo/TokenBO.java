package co.com.hyg.mpio.siro_portal.bo;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

import org.apache.log4j.Logger;

import co.com.hyg.mpio.siro_portal.utils.DataBase;
import co.com.hyg.mpio.siro_portal.utils.Perfil;
import co.com.hyg.mpio.siro_portal.utils.Usuario;

public class TokenBO
{
	
	DataBase dataSource = new DataBase();

	final static Logger logger = Logger.getLogger(TokenBO.class);

	private static ResourceBundle rb = ResourceBundle.getBundle("co.com.hyg.mpio.siro_portal.config.SQL");

	public Usuario consultarUsuario(String id, String clave) throws Exception
	{
		Usuario usuario = null;
		PreparedStatement pst = null;
		Connection con = dataSource.getConnectionMapgis();
		String query = "";
		
		if (clave == null)
			query = rb.getString("SQL_VALIDAR_USUARIO_SIMPLE");
		else
			query = rb.getString("SQL_VALIDAR_USUARIO");
		
		ResultSet rs = null;
		try
		{
			pst = con.prepareStatement(query);
			pst.setString(1, id);
			
			if (clave != null)
				pst.setString(2, clave);
			
			rs = pst.executeQuery();
			
			if (rs.next())
			{
				usuario = new Usuario();
				usuario.setIdUsuario(rs.getInt(1));
				usuario.setIdentificador(rs.getString(2));
				usuario.setNombre(rs.getString(3));
				usuario.setApellido(rs.getString(4));
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
			logger.error(e);
		}
		finally
		{
			try
			{
				if (pst != null)
					pst.close();
			}
			catch (Exception e){}
			try
			{
				if (con != null)
					con.close();
			}
			catch (Exception e){}
		}

		List<Perfil> perfiles = consultarPerfiles(usuario);
		usuario.setPerfiles(perfiles);
		return usuario;
	}

	public List<Perfil> consultarPerfiles(Usuario usuario) throws Exception
	{
		List<Perfil> perfiles = new ArrayList<Perfil>();
		PreparedStatement pst = null;
		Connection con = dataSource.getConnectionMapgis();
		String query = rb.getString("SQL_CONSULTAR_PERFILES_USUARIO");
		ResultSet rs = null;
		
		try
		{
			pst = con.prepareStatement(query);
			pst.setInt(1, usuario.getIdUsuario());
			rs = pst.executeQuery();
			Perfil perfil;
			
			while (rs.next())
			{
				perfil = new Perfil();
				perfil.setIdPerfil(rs.getInt(1));
				perfiles.add(perfil);
			}
			
			if (perfiles.size() == 0)
				perfiles = null;
		}
		catch (Exception e)
		{
			e.printStackTrace();
			logger.error(e);
		}
		finally
		{
			try
			{
				if (pst != null)
					pst.close();
			}
			catch (Exception e){}
			try
			{
				if (con != null)
					con.close();
			}
			catch (Exception e){}
		}
		
		return perfiles;
	}
}