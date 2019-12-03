$(document).ready(function()
{
	try
	{
		var str_where = convertirCadena(' and FK_IDSECCION = 8 and NOMBRE = \'Información\'');
		// se consulta el contenido informativo del pie de pagina
		var obj_consulta = {'SQL' : 'SQL_CONSULTAR_CONTENIDOS_PORTAL', 'N' : 1, 'DATOS' : {'P1' : str_where}};
		var obj_footer = send_query('./consultar_datos.hyg', obj_consulta, 'get', false);
		$('.information_footer').append(obj_footer[0].DESCRIPCION);
		
		var str_where = convertirCadena(' and FK_IDSECCION = 8 and NOMBRE = \'Facebook\'');
		var obj_consulta = {'SQL' : 'SQL_CONSULTAR_CONTENIDOS_PORTAL', 'N' : 1, 'DATOS' : {'P1' : str_where}};
		obj_footer = send_query('./consultar_datos.hyg', obj_consulta, 'get', false);
		var fb = obj_footer[0].DESCRIPCION.replace('<p>', '');
		fb = fb.replace('</p>', '');
		$('#facebook').prop('href', fb);
		
		var str_where = convertirCadena(' and FK_IDSECCION = 8 and NOMBRE = \'Youtube\'');
		var obj_consulta = {'SQL' : 'SQL_CONSULTAR_CONTENIDOS_PORTAL', 'N' : 1, 'DATOS' : {'P1' : str_where}};
		obj_footer = send_query('./consultar_datos.hyg', obj_consulta, 'get', false);
		var yt = obj_footer[0].DESCRIPCION.replace('<p>', '');
		yt = yt.replace('</p>', '');
		$('#youtube').prop('href', yt);
		
		
		var str_where = convertirCadena(' and FK_IDSECCION = 8 and NOMBRE = \'Twitter\'');
		var obj_consulta = {'SQL' : 'SQL_CONSULTAR_CONTENIDOS_PORTAL', 'N' : 1, 'DATOS' : {'P1' : str_where}};
		obj_footer = send_query('./consultar_datos.hyg', obj_consulta, 'get', false);
		var tt = obj_footer[0].DESCRIPCION.replace('<p>', '');
		tt = tt.replace('</p>', '');
		$('#twitter').prop('href', tt);
		
		var str_where = convertirCadena(' and FK_IDSECCION = 8 and NOMBRE = \'Instagram\'');
		var obj_consulta = {'SQL' : 'SQL_CONSULTAR_CONTENIDOS_PORTAL', 'N' : 1, 'DATOS' : {'P1' : str_where}};
		obj_footer = send_query('./consultar_datos.hyg', obj_consulta, 'get', false);
		var it = obj_footer[0].DESCRIPCION.replace('<p>', '');
		it = it.replace('</p>', '');
		$('#instagram').prop('href', it);
	}
	catch (e)
	{
		parent.msgAdvertencia('Ha ocurrido un error, vuelve a intentar mas tarde.');
	}
	
	$('.load_container').hide();
});











