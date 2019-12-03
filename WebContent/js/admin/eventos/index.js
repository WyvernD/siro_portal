var obj_eventos = [];
var str_where = '';
var obj_subsistemas = [];
var str_ruta_full = '';
var int_id_evt = '';
var obj_form = [];

$(document).ready(function()
{
	asignar_cerrar();
	// Se carga el formulario de edición
	var obj_consulta = {'SQL' : 'SQL_CONSULTAR_FORMULARIO_ID_PORTAL', 'N' : 1, 'DATOS' : {'P1' : 7 + ''}};
	obj_form = send_query('./consultar_datos.hyg', obj_consulta, 'get', true);	
	
	// Llenar combos
	llenar_combo();
	// evento del combo
	combo_eventos();
	// Evento de los botones
	boton_eventos();
	// Inicializar ruta
	initialize();
	formatear_datepicker()
	$("#txt_fecha_inicio").datepicker();
	$("#txt_fecha_fin").datepicker();
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

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para llenar el combo del formulario.
 * Fecha creación:		2018/01/09.
 * Fecha modificación:	2018/01/09.
 * */
function llenar_combo()
{
	var obj_consulta = {'SQL' : 'SQL_CONSULTAR_SUBSISTEMAS_PORTAL', 'N' : 1, 'DATOS' : {'P1' : ''}};
	obj_subsistemas = send_query('./consultar_datos.hyg', obj_consulta, 'get', true);
	llenarCombo(obj_subsistemas, 'cmb_subsistema', false, false, '', '');
	var obj_consulta = {'SQL' : 'SQL_CONSULTAR_TIPOEVENTOS_PORTAL', 'N' : 1, 'DATOS' : {'P1' : ''}};
	var obj_rs = send_query('./consultar_datos.hyg', obj_consulta, 'get', true);
	llenarCombo(obj_rs, 'cmb_tipo', false, false, '', '');
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para asignar eventos a los combos.
 * Fecha creación:		2018/01/09.
 * Fecha modificación:	2018/01/09.
 * */
function combo_eventos()
{
	$('#cmb_subsistema').on('change', function()
	{
		if ($(this).val() != '0')
		{
			var obj_subsistema = obj_subsistemas.filter(word => word.KEY == $(this).val());
		}
	});
}


/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para asignar eventos a los botones.
 * Fecha creación:		2018/01/09.
 * Fecha modificación:	2018/01/09.
 * */
function boton_eventos()
{
	$('#btn_buscar').on('click', function()
	{
		str_where = validar_where('.where');
		var obj_consulta = {'SQL' : 'SQL_CONSULTAR_PUBLIEVENTOS_PORTAL', 'N': 1, 'DATOS' : {'P1' : str_where + ''}};
		obj_eventos = send_query('./consultar_datos.hyg', obj_consulta, 'get', true);
		var tbl = $('#tbl_eventos').DataTable();
		tbl.destroy();
		llenar_tabla();
		var table = $('#tbl_eventos').DataTable(
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
			ESTADO: 'nuevo',
			WEBAPP: str_url_webapp
		}
		
		obj_form[0].NOMBRE = 'Nuevo Evento'	;
		abrirFormulario(obj_datos, obj_form[0]);
	});
}


/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para llenar la tabla.
 * Fecha creación:		2018/01/09.
 * Fecha modificación:	2018/01/09.
 * */
function llenar_tabla()
{
	var table = $('#tbl_eventos tbody');
	table.empty();
	
	if (obj_eventos.length > 0)
	{
		var tr = '';
		
		for (var i = 0; i < obj_eventos.length; i++)
		{
			var obj_evento = encode64(JSON.stringify(obj_eventos[i]));
			
			tr +=
				'<tr>' +
					'<td>' +
						obj_eventos[i].SUBSISTEMA +
					'</td>' +
					'<td>' +
						formato(obj_eventos[i].FECHAINICIO.split(' ')[0]) +
					'</td>' +
					'<td>' +
						formato(obj_eventos[i].FECHAFIN.split(' ')[0]) +
					'</td>' +
					'<td>' +
						obj_eventos[i].TIPO_EVT +
					'</td>' +
					'<td>' +
						obj_eventos[i].ACTIVIDAD +
					'</td>' +
					'<td>' +
						obj_eventos[i].LUGAR +
					'</td>' +
					'<td>' +
						obj_eventos[i].PUBLICO +
					'</td>' +
					'<td width="40" class="text-center">' +
						'<button type="button" class="btn_hidden" onclick="editar_evento(\'' + obj_evento + '\')">' +
							'<span class="icon-edit pointer"><span>' +
						'</button>' +
					'</td>' +
					'<td width="40" class="text-center">' +
						'<button type="button" class="btn_hidden" onclick="eliminar_evento(\'' + obj_evento + '\')">' +
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
 * Descripción:			Está función se usa para abrir el formulario de editar.
 * Fecha creación:		2018/01/13.
 * Fecha modificación:	2018/01/13.
 * */
function editar_evento(obj)
{
	obj = JSON.parse(decode64(obj));
	obj.ESTADO = 'editar';
	obj.WEBAPP = str_url_webapp;
	
	obj_form[0].NOMBRE = 'Editar Evento';	
	abrirFormulario(obj, obj_form[0]);
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para confimar si se elimina la fila
 * Fecha creación:		2018/01/13
 * Fecha modificación:	2018/01/13
 * */
function eliminar_evento(obj)
{
	obj = JSON.parse(decode64(obj));
	str_ruta_full = str_url_webapp + obj.RUTA + obj.IMAGEN;
	int_id_evt = obj.PK_IDPUBLI_EVENTOS
	parent.msgConfirmacion(convertirCadena('¿Desea eliminar esté evento?'), 'eliminar', window.frameElement.id);
};

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para eliminar el evento
 * Fecha creación:		2018/01/13
 * Fecha modificación:	2018/01/13
 * */
function eliminar()
{
	var obj_consulta =
	[
		{
			'SQL' : 'SQL_ELIMINAR_EVENTO_PORTAL',
			'N' : 1,
			'DATOS' :
			[
				{
					'P1' : int_id_evt + ''
				}
			]
		}
	];
		
	var resultado = send_query('./enviar_datos.hyg', obj_consulta, 'set', true);
	
	if (resultado == 'Ok')
	{
		resultado = eliminarFichero(str_ruta_full);

		if (resultado == '1')
		{
			recargar_tabla();
			return;
		}

		parent.msgAdvertencia(convertirCadena('No se encontró el archivo.'));
		return;
	}

	parent.msgAdvertencia('Problema interno del servidor.');
}

function recargar_tabla()
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







