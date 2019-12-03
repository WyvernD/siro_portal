var obj_logos = {};
var str_where = '';
var obj_secciones = [];
var obj_form = [];

$(document).ready(function()
{
	asignar_cerrar();
	
	// Se carga el formulario de edición
	var obj_consulta = {'SQL' : 'SQL_CONSULTAR_FORMULARIO_ID_PORTAL', 'N' : 1, 'DATOS' : {'P1' : 6 + ''}};
	obj_form = send_query('./consultar_datos.hyg', obj_consulta, 'get', true);
	
	// Llenar combos
	llenar_combo();
	// evento del combo
	combo_eventos();
	// Evento de los botones
	boton_eventos();
	// Inicializar ruta
	initialize();
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
 * Fecha creación:		2017/12/20.
 * Fecha modificación:	2017/12/20.
 * */
function llenar_combo()
{
	var obj_consulta = {'SQL' : 'SQL_CONSULTAR_SECCION_PORTAL', 'N' : 1, 'DATOS' : {'P1' : 'and TIPO = 1'}};
	obj_secciones = send_query('./consultar_datos.hyg', obj_consulta, 'get', true);
	llenarCombo(obj_secciones, 'cmb_section', false, false, '', '');
}


/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para asignar eventos a los combos.
 * Fecha creación:		2017/12/20.
 * Fecha modificación:	2017/12/20.
 * */
function combo_eventos()
{
	$('#cmb_section').on('change', function()
	{
		var strOption = $("#cmb_section option[value='" + $(this).val() + "']").text();
		if($(this).val().indexOf(2) != -1 && strOption == convertirCadena('BANNER'))
		{
			$('#btn_nuevo').show();
			return;
		}
		
		$('#btn_nuevo').hide();
	});
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
		var obj_consulta = {'SQL' : 'SQL_CONSULTAR_LOGOS_PORTAL', 'N': 1, 'DATOS' : {'P1' : str_where + ''}};
		obj_logos = send_query('./consultar_datos.hyg', obj_consulta, 'get', true);
		var tbl = $('#tbl_logos').DataTable();
		tbl.destroy();
		llenar_tabla();
		var table = $('#tbl_logos').DataTable(
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
		var obj_seccion = obj_secciones.filter(word => word.KEY == $('#cmb_section').val());
		// Objeto con datos para el otro formulario
		var obj_datos =
		{
			ANCHO: 4000,
			ALTO: 2250,
			ID_SECCION: $('#cmb_section').val(),
			ESTADO: 'nuevo',
			WEBAPP: str_url_webapp,
			RUTA: obj_seccion[0].RUTA
		}
		
		obj_form[0].NOMBRE = 'Nuevo Logo';		
		abrirFormulario(obj_datos, obj_form[0]);
	});
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para llenar la tabla de logos.
 * Fecha creación:		2017/12/20.
 * Fecha modificación:	2017/12/20.
 * */
function llenar_tabla()
{
	var table = $('#tbl_logos tbody');
	table.empty();
	
	if (obj_logos.length > 0)
	{
		var tr = '';
		
		for (var i = 0; i < obj_logos.length; i++)
		{
			var obj_logo = encode64(JSON.stringify(obj_logos[i]));
			
			tr +=
				'<tr>' +
					'<td>' +
						obj_logos[i].NOMBRE +
					'</td>' +
					'<td>' +
						obj_logos[i].SECCION +
					'</td>' +
					'<td width="40" class="text-center">' +
						'<button type="button" class="btn_hidden" onclick="editar_logo(\'' + obj_logo + '\')">' +
							'<span class="icon-edit pointer"><span>' +
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
 * Fecha creación:		2017/12/26.
 * Fecha modificación:	2017/12/26.
 * */
function editar_logo(obj)
{
	obj = JSON.parse(decode64(obj));

	// Objeto con datos para el otro formulario
	var obj_datos =
	{
		ANCHO: obj.ANCHO,
		ALTO: obj.ALTO,
		ID_SECCION: obj.ID_SECCION,
		ESTADO: 'editar',
		WEBAPP: str_url_webapp,
		RUTA: obj.RUTA,
		ID: obj.ID,
		NOMBRE: obj.NOMBRE,
		DESCRIPCION: obj.DESCRIPCION,
		PUBLICO: obj.PUBLICO
	}
	
	obj_form[0].NOMBRE = 'Editar Logo';
	abrirFormulario(obj_datos, obj_form[0]);
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para recargar la tabla desde el formulario de editar.
 * Fecha creación:		2017/12/27.
 * Fecha modificación:	2017/12/27.
 * */
function recargar_tabla(obj = null)
{
	$('#btn_buscar').click();
}