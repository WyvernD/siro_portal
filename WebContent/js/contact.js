$(document).ready(function()
{
	// se consulta el contenido informativo de contacto
	var obj_consulta = {'SQL' : 'SQL_CONSULTAR_CONTENIDOS_PORTAL', 'N' : 1, 'DATOS' : {'P1' : ' and FK_IDSECCION = 14 or NOMBRE = \'Contenido\''}};
	
	try
	{
		obj_contacto = send_query('./consultar_datos.hyg', obj_consulta, 'get', false);
		$('.information_contacto').append(obj_contacto[0].DESCRIPCION);
	}
	catch (e)
	{
		parent.msgAdvertencia('Ha ocurrido un error, vuelve a intentar mas tarde.');
	}
});