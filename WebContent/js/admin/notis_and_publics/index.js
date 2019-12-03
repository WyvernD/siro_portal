var obj_noti_publi = {};
var str_where = '';
obj_subsistemas = [];
var obj_form = [];

// Rutas
var str_ruta_img_publi = '';
var str_ruta_img_publi_mini = '';
var str_ruta_img_noti = '';
var str_ruta_img_noti_mini = '';
var str_ruta_doc_publi = '';
var str_ruta_doc_noti = '';

// obj de la noticia
var obj_delete = {};

$(document).ready(function()
{
	asignar_cerrar();
	// Se carga el formulario de edición
	var obj_consulta = {'SQL' : 'SQL_CONSULTAR_FORMULARIO_ID_PORTAL', 'N' : 1, 'DATOS' : {'P1' : 8 + ''}};
	obj_form = send_query('./consultar_datos.hyg', obj_consulta, 'get', true);	

	// Llenar combos
	llenar_combo();
	// evento del combo
	combo_eventos();
	// Evento de los botones
	boton_eventos();
	// Inicializar ruta
	initialize();
	formatear_datepicker();
	$("#txt_fecha").datepicker();
	cargar_rutas();
	$('.load_container').hide();
});

function asignar_cerrar()
{
	var obj_padre = parent.$("#divModalForm_" + window.frameElement.id.replace('ifModalForm_', '')).parent();
	var obj_hermano = $(obj_padre).children()[0];
	var obj_btn_close = $(obj_hermano).children()[1];

	$(obj_btn_close).on('click', function()
	{
		setTimeout(() => 
		{
			var parent_body = parent.document.getElementsByTagName('body');
			$(parent_body).removeClass('no_scroll');
		}, 100);
	});
}

function cargar_rutas()
{
	var obj_consulta = {'SQL' : 'SQL_CONSULTAR_RUTAIMG_PUBLICACIONES', 'N' : 0, 'DATOS' : {}};
	str_ruta_img_publi = send_query('./consultar_datos.hyg', obj_consulta, 'get' ,true)[0].RUTA;
	obj_consulta = {'SQL' : 'SQL_CONSULTAR_RUTAIMG_PUBLICACIONESMINI', 'N' : 0, 'DATOS' : {}};
	str_ruta_img_publi_mini = send_query('./consultar_datos.hyg', obj_consulta, 'get' ,true)[0].RUTA;
	obj_consulta = {'SQL' : 'SQL_CONSULTAR_RUTAIMG_NOTICIAS', 'N' : 0, 'DATOS' : {}};
	str_ruta_img_noti = send_query('./consultar_datos.hyg', obj_consulta, 'get' ,true)[0].RUTA;
	obj_consulta = {'SQL' : 'SQL_CONSULTAR_RUTAIMG_NOTICIASMINI', 'N' : 0, 'DATOS' : {}};
	str_ruta_img_noti_mini = send_query('./consultar_datos.hyg', obj_consulta, 'get' ,true)[0].RUTA;
	obj_consulta = {'SQL' : 'SQL_CONSULRAR_RUTADOCS_PUBLICACIONES', 'N' : 0, 'DATOS' : {}};
	str_ruta_doc_publi = send_query('./consultar_datos.hyg', obj_consulta, 'get' ,true)[0].RUTA;
	obj_consulta = {'SQL' : 'SQL_CONSULTAR_RUTADOCS_NOTICIAS', 'N' : 0, 'DATOS' : {}};
	str_ruta_doc_noti = send_query('./consultar_datos.hyg', obj_consulta, 'get' ,true)[0].RUTA;
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para llenar el combo del formulario.
 * Fecha creación:		2017/12/20.
 * Fecha modificación:	2017/12/20.
 * */
function llenar_combo()
{
	var obj_consulta = {'SQL' : 'SQL_CONSULTAR_SUBSISTEMAS_PORTAL', 'N' : 1, 'DATOS' : {'P1' : ''}};
	obj_subsistemas = send_query('./consultar_datos.hyg', obj_consulta, 'get', true);
	llenarCombo(obj_subsistemas, 'cmb_subsistema', false, false, '', '');
	generarSumoSelect($('#cmb_tipo'));
	$('#cmb_tipo')[0].sumo.reload();
	$('.SumoSelect > .CaptionCont > label > i').addClass('icon-dropdown txt_success');
}


/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para asignar eventos a los combos.
 * Fecha creación:		2017/12/20.
 * Fecha modificación:	2017/12/20.
 * */
function combo_eventos()
{
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para asignar eventos a los botones.
 * Fecha creación:		2017/12/20.
 * Fecha modificación:	2017/12/20.
 * */
function boton_eventos()
{
	$('#btn_buscar').on('click', function()
	{
		str_where = validar_where('.where');
		var obj_consulta = {'SQL' : 'SQL_CONSULTAR_NOTICIAS_PORTAL', 'N': 1, 'DATOS' : {'P1' : str_where + ' and NP.ACTIVO = 1'}};
		obj_noti_publi = send_query('./consultar_datos.hyg', obj_consulta, 'get', true);
		var tbl = $('#tbl_noti_publi').DataTable();
		tbl.destroy();
		llenar_tabla();
		var table = $('#tbl_noti_publi').DataTable(
		{
			"language":
			{
                "url": "js/vendor/datatable/lang/es.json"
            },
            searching: false,
            ordering:  false,
            "lengthMenu": [ 5, 10, 25, 50, 75, 100 ],
            "pageLength": 5,
            "autoWidth": true,
            "scrollY": "160px",
            "sScrollX": "100%",
            "sScrollXInner": "100%",
            "bScrollCollapse": true 
		}); 
		table.draw();
	});
	
	$('#btn_nuevo').on('click', function()
	{
		// Objeto con datos para el otro formulario
		var obj_datos =
		{
			ANCHO: 4000,
			ALTO: 2250,
			ESTADO: 'nuevo',
			WEBAPP: str_url_webapp
		}
		
		obj_form[0].NOMBRE = convertirCadena('Nueva Noticia o Documentación');
		abrirFormulario(obj_datos, obj_form[0]);
	});
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para llenar la tabla.
 * Fecha creación:		2018/01/23.
 * Fecha modificación:	2018/01/23.
 * */
function llenar_tabla()
{
	var table = $('#tbl_noti_publi tbody');
	table.empty();
	
	if (obj_noti_publi.length > 0)
	{
		var tr = '';
		
		for (var i = 0; i < obj_noti_publi.length; i++)
		{
			var obj_noti_pub = encode64(JSON.stringify(obj_noti_publi[i]));
			
			tr +=
				'<tr>' +
					'<td>' +
						obj_noti_publi[i].SUBSISTEMA +
					'</td>' +
					'<td>' +
						obj_noti_publi[i].TITULO +
					'</td>' +
					'<td>' +
						formato(obj_noti_publi[i].FECHA.split(' ')[0]) +
					'</td>' +
					'<td class="text-center">' +
						'<button type="button" class="btn_hidden" onclick="ver(\'' + obj_noti_pub + '\', \'documento\')">' +
							'<span class="icon-show_docs pointer"><span>' +
						'</button>' +
					'</td>' +
					'<td class="text-center">' +
						'<button type="button" class="btn_hidden" onclick="ver(\'' + obj_noti_pub + '\', \'imagen\')">' +
							'<span class="icon-show_docs pointer"><span>' +
						'</button>' +
					'</td>' +
					'<td>' +
						obj_noti_publi[i].PUBLICO +
					'</td>' +
					'<td width="40" class="text-center">' +
						'<button type="button" class="btn_hidden" onclick="editar(\'' + obj_noti_pub + '\')">' +
							'<span class="icon-edit pointer"><span>' +
						'</button>' +
					'</td>' +
					'<td width="40" class="text-center">' +
						'<button type="button" class="btn_hidden" onclick="eliminar_enlace(\'' + obj_noti_pub + '\')">' +
							'<span class="icon-delete pointer"><span>' +
						'</button>' +
					'</td>' +
				'</tr>'
		}
		
		table.append(tr);
	}
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para abrir el formulario de editar logo.
 * Fecha creación:		2018/01/23.
 * Fecha modificación:	2018/01/23.
 * */
function editar(obj)
{
	obj = JSON.parse(decode64(obj));

	// Objeto con datos para el otro formulario
	obj.ESTADO = 'editar';
	obj.WEBAPP = str_url_webapp;
	
	obj_form[0].NOMBRE = convertirCadena('Editar Noticia o Documentación');
	abrirFormulario(obj, obj_form[0]);
}

function ver(obj, str_tipo)
{
	obj = JSON.parse(decode64(obj));
	
	if(str_tipo == 'imagen')
	{
		var str_ruta = obj.TIPO == 1 ? str_ruta_img_publi : str_ruta_img_noti;
		window.open('./' + str_ruta + obj.IMAGEN, '_blank');
	}
	else
	{
		if (obj.DOCUMENTO != '' && obj.DOCUMENTO != null)
		{
			var str_ruta = obj.TIPO == 1 ? str_ruta_doc_publi : str_ruta_doc_noti;
			window.open('./' + str_ruta + obj.DOCUMENTO, '_blank');
		}
	}
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción: 		Esté método se usa para eliminar un registro de la tabla.
 * Fecha creación: 		2018/01/25.
 * Fecha modificación: 	2018/01/25.
 */
function eliminar_enlace(obj)
{
	obj_delete = JSON.parse(decode64(obj));
	// Se muestra una alerta
	parent.msgConfirmacion(convertirCadena('¿Desea eliminar esté registro?'), 'eliminar', window.frameElement.id);
}

function eliminar()
{
	var obj_consulta =
	[
		{
			'SQL' : 'SQL_ELIMINAR_NOTICIA',
			'N' : 1,
			'DATOS' : 
			[
				{
					'P1' : obj_delete.ID + ''
				}
			]
		}
	]
	
	var str_rs = send_query('./enviar_datos.hyg', obj_consulta, 'set' ,true);
	
	if (str_rs == 'Ok')
	{
		parent.msgAdvertencia('Noticia eliminada correctamente.');
		$('#btn_buscar').click();
		return;
	}
	else
	{
		parent.msgAdvertencia('Ha ocurrido un problema, vuelta a intentar mas tarde.');
	}
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para recargar la tabla desde el formulario de editar.
 * Fecha creación:		2018/01/23.
 * Fecha modificación:	2018/01/23.
 * */
function recargar_tabla(obj = null)
{
	$('#btn_buscar').click();
}

function formatear_datepicker()
{
	$(function()
	{
		$.datepicker.setDefaults($.datepicker.regional['es'] =
		{
	  		closeText: 'Cerrar',
	  		prevText: 'Previo',
	  		changeYear: true,
	  		nextText: 'Pr\xF3ximo',
	  		monthStatus: 'Ver otro mes',
	  		yearStatus: 'Ver otro aÃ±o',
	  		monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
	  		monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
	  		dayNames: ['Domingo', 'Lunes', 'Martes', 'Mi\xE9rcoles', 'Jueves', 'Viernes', 'S\xE1bado'],
	  		dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mi\xE9;', 'Juv', 'Vie', 'S\xE1b'],
	  		dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'S\xE1'],
	  		dateFormat: 'dd/mm/yy',
	  		firstDay: 0,
	  		initStatus: 'Selecciona la fecha',
	  		isRTL: false
	 	});

	 	$.datepicker.setDefaults($.datepicker.dateFormat = "dd/mm/yy");
	});
}