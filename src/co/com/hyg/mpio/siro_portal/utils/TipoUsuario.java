package co.com.hyg.mpio.siro_portal.utils;

import java.io.Serializable;

public class TipoUsuario implements Serializable
{

	private static final long serialVersionUID = 1L;
	private int intIdTipo = 0;
	private String strDescripcion;

	/**
	 * @return the intIdTipo
	 */
	public int getIdTipo()
	{
		return intIdTipo;
	}

	/**
	 * @param intIdTipo
	 *            the intIdTipo to set
	 */
	public void setIdTipo(int intIdTipo)
	{
		this.intIdTipo = intIdTipo;
	}

	/**
	 * @return the strDescripcion
	 */
	public String getDescripcion()
	{
		return strDescripcion;
	}

	/**
	 * @param strDescripcion
	 *            the strDescripcion to set
	 */
	public void setDescripcion(String strDescripcion)
	{
		this.strDescripcion = strDescripcion;
	}
}