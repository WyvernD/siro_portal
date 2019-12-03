package co.com.hyg.mpio.siro_portal.utils;

import java.io.Serializable;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class Usuario implements Serializable
{

	private static final long serialVersionUID = 1L;
	private int intIdUsuario = 0;
	private TipoUsuario tipoUsuario;
	private String strIdentificador;
	private String strNombre;
	private String strClave;
	private String strEmail;
	private String strApellido;
	private String strTelefono;
	private List<Perfil> perfiles = new ArrayList<Perfil>();
	private Perfil perfilPpal;
	private boolean activo;
	private String estado;
	private String Foto;
	private Double idPeriodicidad;
	private Date fechaVencimiento;
	private int intentos = 0;
	private int bloqueo = 0;

	public Double getIdPeriodicidad()
	{
		return idPeriodicidad;
	}

	public void setIdPeriodicidad(Double idPeriodicidad)
	{
		this.idPeriodicidad = idPeriodicidad;
	}

	public Date getFechaVencimiento()
	{
		return fechaVencimiento;
	}

	public void setFechaVencimiento(Date fechaVencimiento)
	{
		this.fechaVencimiento = fechaVencimiento;
	}

	public int getIntentos()
	{
		return intentos;
	}

	public void setIntentos(int intentos)
	{
		this.intentos = intentos;
	}

	public int getBloqueo()
	{
		return bloqueo;
	}

	public void setBloqueo(int bloqueo)
	{
		this.bloqueo = bloqueo;
	}

	public Usuario() {

	}

	/**
	 * @return the intIdUsuario
	 */
	public int getIdUsuario()
	{
		return intIdUsuario;
	}

	/**
	 * @param intIdUsuario
	 *            the intIdUsuario to set
	 */
	public void setIdUsuario(int intIdUsuario)
	{
		this.intIdUsuario = intIdUsuario;
	}

	/**
	 * @return the tipoUsuario
	 */
	public TipoUsuario getTipoUsuario()
	{
		return tipoUsuario;
	}

	public int getIntIdUsuario()
	{
		return intIdUsuario;
	}

	public void setIntIdUsuario(int intIdUsuario)
	{
		this.intIdUsuario = intIdUsuario;
	}

	public String getStrIdentificador()
	{
		return strIdentificador;
	}

	public void setStrIdentificador(String strIdentificador)
	{
		this.strIdentificador = strIdentificador;
	}

	public String getStrNombre()
	{
		return strNombre;
	}

	public void setStrNombre(String strNombre)
	{
		this.strNombre = strNombre;
	}

	public String getStrClave()
	{
		return strClave;
	}

	public void setStrClave(String strClave)
	{
		this.strClave = strClave;
	}

	public String getStrEmail()
	{
		return strEmail;
	}

	public void setStrEmail(String strEmail)
	{
		this.strEmail = strEmail;
	}

	public String getStrApellido()
	{
		return strApellido;
	}

	public void setStrApellido(String strApellido)
	{
		this.strApellido = strApellido;
	}

	public String getStrTelefono()
	{
		return strTelefono;
	}

	public void setStrTelefono(String strTelefono)
	{
		this.strTelefono = strTelefono;
	}

	/**
	 * @param tipoUsuario
	 *            the tipoUsuario to set
	 */
	public void setTipoUsuario(TipoUsuario tipoUsuario)
	{
		this.tipoUsuario = tipoUsuario;
	}

	/**
	 * @return the strIdentificador
	 */
	public String getIdentificador()
	{
		return strIdentificador;
	}

	/**
	 * @param strIdentificador
	 *            the strIdentificador to set
	 */
	public void setIdentificador(String strIdentificador)
	{
		this.strIdentificador = strIdentificador;
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
	 * @return the strClave
	 */
	public String getClave()
	{
		return strClave;
	}

	/**
	 * @param strClave
	 *            the strClave to set
	 */
	public void setClave(String strClave)
	{
		this.strClave = strClave;
	}

	/**
	 * @return the strEmail
	 */
	public String getEmail()
	{
		return strEmail;
	}

	/**
	 * @param strEmail
	 *            the strEmail to set
	 */
	public void setEmail(String strEmail)
	{
		this.strEmail = strEmail;
	}

	/**
	 * @return the strApellido
	 */
	public String getApellido()
	{
		return strApellido;
	}

	/**
	 * @param strApellido
	 *            the strApellido to set
	 */
	public void setApellido(String strApellido)
	{
		this.strApellido = strApellido;
	}

	/**
	 * @return the intTelefono
	 */
	public String getTelefono()
	{
		return strTelefono;
	}

	/**
	 * @param intTelefono
	 *            the intTelefono to set
	 */
	public void setTelefono(String strTelefono)
	{
		this.strTelefono = strTelefono;
	}

	/**
	 * @return the perfil
	 */
	public List<Perfil> getPerfiles()
	{
		return perfiles;
	}

	/**
	 * @param perfil
	 *            the perfil to set
	 */
	public void setPerfiles(List<Perfil> perfiles) 
	{
		this.perfiles = perfiles;
	}

	public Perfil getPerfilPpal()
	{
		return perfilPpal;
	}

	public void setPerfilPpal(Perfil perfilPpal)
	{
		this.perfilPpal = perfilPpal;
	}

	public boolean isActivo()
	{
		return activo;
	}

	public void setActivo(boolean activo)
	{
		this.activo = activo;
	}

	public String getEstado()
	{
		return estado;
	}

	public void setEstado(String estado)
	{
		this.estado = estado;
	}

	public String getFoto()
	{
		return Foto;
	}

	public void setFoto(String foto)
	{
		Foto = foto;
	}

}

