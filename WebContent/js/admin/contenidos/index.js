var obj_subsecciones = [];
var obj_subseccion = {};

$(document).ready(function()
{
	asignar_cerrar();
	// Inicializar ck_editor
	ck_editor_init();
	// Llenar combos
	llenar_combo();
	// evento del combo
	combo_eventos();
	// Evento de los botones
	boton_eventos();
	
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
 * Descripción:			Está función se usa para inicializar el ckeditor
 * Fecha creación:		2017/12/28.
 * Fecha modificación:	2017/12/28.
 * */
function ck_editor_init()
{
	CKEDITOR.replace('txt_descripcion', 
	{
		language: 'es',
	    uiColor: '#dedede',
	    height: '150px'
	});
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para llenar el combo del formulario.
 * Fecha creación:		2017/12/28.
 * Fecha modificación:	2017/12/28.
 * */
function llenar_combo()
{
	var obj_consulta = {'SQL' : 'SQL_CONSULTAR_SECCION_PORTAL', 'N' : 1, 'DATOS' : {'P1' : ' and TIPO = 2'}};
	var obj_secciones = send_query('./consultar_datos.hyg', obj_consulta, 'get', true);
	llenarCombo(obj_secciones, 'cmb_seccion', false, false, '', '');
	generarSumoSelect($('#cmb_subseccion'));
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para asignar eventos a los combos.
 * Fecha creación:		2017/12/28.
 * Fecha modificación:	2017/12/28.
 * */
function combo_eventos()
{
	$('#cmb_seccion').on('change', function()
	{
		reload_combo_subsecciones();
		$('#cmb_subseccion').change();
		// El método validarSeleccion devuelve false y true,
		// false es todo correcto en este caso
		var bl_vl = validarSeleccion('#cmb_seccion', ['#cmb_subseccion'], ['disabled'], false, 0, '', '');
		
		if (!bl_vl)
		{
			// Se llena el combo de sub secciones
			llenar_subsecciones($(this).val());
		}
	});
	
	$('#cmb_subseccion').on('change', function()
	{
		if ($(this).val() != '0')
		{
			$('#btn_guardar').prop('disabled', false);
			$('#btn_guardar').removeClass('disabled');
			$('#btn_guardar').addClass('pointer');
			// Se consulta en el array de subsecciones, la subseccion con el KEY igual al valor
			// del combo.
			obj_subseccion = obj_subsecciones.filter(word => word.KEY == $(this).val());
			CKEDITOR.instances.txt_descripcion.setData(obj_subseccion[0].DESCRIPCION);
		}
		else
		{
			$('#btn_guardar').prop('disabled', true);
			$('#btn_guardar').removeClass('pointer');
			$('#btn_guardar').addClass('disabled');
			CKEDITOR.instances.txt_descripcion.setData('');
		}
	});
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para cargar el combo de sub secciones
 * Fecha creación:		2017/12/28.
 * Fecha modificación:	2017/12/28.
 * */
function llenar_subsecciones(valor)
{
	var obj_consulta = {'SQL' : 'SQL_CONSULTAR_CONTENIDOS_PORTAL', 'N' : 1, 'DATOS' : {'P1' : ' and FK_IDSECCION = ' + valor + ''}};
	obj_subsecciones = send_query('./consultar_datos.hyg', obj_consulta, 'get', true);
	llenarCombo(obj_subsecciones, 'cmb_subseccion', false, false, '', '');
	// Se recarga
	$('#cmb_subseccion')[0].sumo.reload();
	$('.SumoSelect > .CaptionCont > label > i').addClass('icon-dropdown txt_success');
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para recargar las subseccioes
 * Fecha creación:		2017/12/28.
 * Fecha modificación:	2017/12/28.
 * */
function reload_combo_subsecciones()
{
	$('#cmb_subseccion').empty();
	// Se le agrega la opción por defecto
	$('#cmb_subseccion').append('<option value="0">Seleccione</option>');
	// Se recarga
	$('#cmb_subseccion')[0].sumo.reload();
	$('.SumoSelect > .CaptionCont > label > i').addClass('icon-dropdown txt_success');
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para asignar eventos a los botones.
 * Fecha creación:		2017/12/28.
 * Fecha modificación:	2017/12/28.
 * */
function boton_eventos()
{
	$('#btn_guardar').on('click', function()
	{
		guardar();
	});
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Está función se usa para actualizar la subseccion
 * Fecha creación:		2017/12/28.
 * Fecha modificación:	2017/12/28.
 * */
function guardar()
{
	if (CKEDITOR.instances.txt_descripcion.getData().length > obj_subseccion[0].LIMITE)
	{
		parent.msgAdvertencia(convertirCadena('La descripción contiene más de ' + obj_subseccion[0].LIMITE + ' caracteres.'));
		return;
	}
	
	var obj_consulta =
	[
		{
			'SQL' : 'SQL_ACTUALIZAR_CONTENIDO_PORTAL',
			'N' : 7,
			'DATOS' :
			[
				{
					'P1' : obj_subseccion[0].KEY + '',
					'P2' : obj_subseccion[0].VALUE + '',
					'P3' : obj_subseccion[0].FK_IDSECCION + '',
					'P4' : formato(fechaActual()) + '',
					'P5' : CKEDITOR.instances.txt_descripcion.getData().trim() + '',
					'P6' : '?USUARIO?',
					'P7' : obj_subseccion[0].LIMITE + ''
				}
			]
		}
	];
	
	var str_rs = send_query('./enviar_datos.hyg', obj_consulta, 'set', true);
	
	if (str_rs == 'Ok')
	{
		parent.msgInformacion('Contenido actualizado correctamente.');
		$('#cmb_seccion').change();
		return;
	}
	
	parent.msgAdvertencia('Ha ocurrido un problema, vuelva a intentar mas tarde.');
}