package co.com.hyg.mpio.siro_portal.utils;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Perfil implements Serializable
{

	private static final long serialVersionUID = 1L;
	private int intIdPerfil = 0;
	private String strNombre;
	private List<Perfil> perfilesAsociados = new ArrayList<Perfil>();

	public Perfil(String role)
	{
		super();
		// TODO Auto-generated constructor stub
		strNombre = role;
	}

	public Perfil()
	{
		super();
	}

	/**
	 * @return the intIdPerfil
	 */
	public int getIdPerfil()
	{
		return intIdPerfil;
	}

	/**
	 * @param intIdPerfil
	 *            the intIdPerfil to set
	 */
	public void setIdPerfil(int intIdPerfil)
	{
		this.intIdPerfil = intIdPerfil;
	}

	/**
	 * @return the strNombre
	 */
	public String getNombre()
	{
		return strNombre;
	}

	/**
	 * @param strNombre
	 *            the strNombre to set
	 */
	public void setNombre(String strNombre)
	{
		this.strNombre = strNombre;
	}

	/**
	 * @return the perfilesAsociados
	 */
	public List<Perfil> getPerfilesAsociados()
	{
		return perfilesAsociados;
	}

	/**
	 * @param perfilesAsociados
	 *            the perfilesAsociados to set
	 */
	public void setPerfilesAsociados(List<Perfil> perfilesAsociados)
	{
		this.perfilesAsociados = perfilesAsociados;
	}

}

