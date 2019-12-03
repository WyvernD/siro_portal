var obj_dominios = [];
var obj_dominio = [];
var insert = [];
var update = [];
var drop = [];

$(document).ready(function()
{
	asignar_cerrar();
	formatear_datepicker();
	cargar_formulario();
	combo_eventos();
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
 * Descripción:			Función usada para cargar el formulario.
 * Fecha creación:		2018/02/19.
 * Fecha modificiación:	2018/02/19.
 * */
function cargar_formulario()
{
	var obj_consulta = {'SQL' : 'SQL_CONSULTAR_ADM_DOMINIO', 'N' : 0, 'DATOS' : {}};
	
	try
	{
		
		obj_dominios = send_query('./consultar_datos.hyg', obj_consulta, 'get', true);
		$('#cmb_dominios').empty();
		$('#cmb_dominios').append('<option value="0">Seleccione</option>');
		var html = '';
		
		for (var i = 0; i < obj_dominios.length; i++)
		{
			html +=
				'<option value="' + obj_dominios[i].id + '">' + obj_dominios[i].nombre + '</option>';
		}
		
		$('#cmb_dominios').append(html);
	}
	catch (e)
	{
		console.log(e);
	}
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para asignar eventos a los combos del formulario.
 * Fecha creación:		2018/02/19.
 * Fecha modificiación:	2018/02/19.
 * */
function combo_eventos()
{
	$('#cmb_dominios').on('change', function()
	{
		if ($(this).val() != 0)
		{
			crear_layout($(this).val());
			obj_dominio = obj_dominios.filter(word => word.id == $(this).val());
			
			if (obj_dominio[0].sentencia != 'null' && obj_dominio[0].sentencia != '')
			{
				insert = JSON.parse(obj_dominio[0].sentencia).INSERTAR != null ? JSON.parse(obj_dominio[0].sentencia).INSERTAR : [];
				update = JSON.parse(obj_dominio[0].sentencia).ACTUALIZAR != null ? JSON.parse(obj_dominio[0].sentencia).ACTUALIZAR : [];
				drop = JSON.parse(obj_dominio[0].sentencia).ELIMINAR != null ? JSON.parse(obj_dominio[0].sentencia).ELIMINAR : [];
			}
			else
			{
				insert = [];
				update = [];
				drop = [];
			}
			
			return;
		}
		
		$('#tbl_container').empty();
	});
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para crear dinamicamente una tabla,
 * 						la cual se adapta a los campos que vengan de la
 * 						base de datos.
 * Fecha creación:		2018/02/19.
 * Fecha modificiación:	2018/02/20.
 * */
function crear_layout(id)
{
	var obj_consulta = {'SQL' : 'SQL_CONSULTAR_LAYOUT_DOMINIO', 'N' : 1, 'DATOS' : {'P1' : id + ''}};
	
	try
	{
		var btn =
			'<button class="btn_hidden pointer btn_add" onclick="agregar_fila(this)">' +
				'<img width="30" src="img/iconos/Agregar.png">' +
			'</button>';
		var label = '<label style="color: #8E6A14">Los campos marcados con * son obligatorios</label>';
		$('#tbl_container').empty();
		$('#tbl_container').append(label);
		$('#tbl_container').append(btn);
		$('#tbl_container').append('<div class="table-responsive"></div>');
		var obj_rs = send_query('./consultar_datos.hyg', obj_consulta, 'get', true);
		// Valores de las columnas de la tabla
		var tabla = JSON.parse(obj_rs[0].dato).tabla;
		// Nombres del las columnas del encabezado de la tabla
		var col = JSON.parse(obj_rs[0].dato).columna;
		// Html para toda la tabla
		var table = "<table class='table table-striped' id='tbl_dominios'><thead><tr>";
		// Html para el body
		var tbody = "<tbody>";
		table += crear_head(col);
		tbody += crear_body(tabla, col);
		tbody += "</tbody>";
		table += ("</tr></thead>" + tbody + "</table>");
		// Se pinta la tabla en el DOM
		$('.table-responsive').empty();
		$('.table-responsive').append(table);
		
		$('.date').each(function(i, obj)
		{
			$(obj).datepicker($.datepicker.regional[ "es" ]);
		});
	}
	catch (e)
	{
		console.log(e);
	}
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para crear el head de la tabla.
 * Fecha creación:		2018/02/20.
 * Fecha modificiación:	2018/02/20.
 * */
function crear_head(col)
{
	var table = "";
	
	for (var i = 0; i < col.length; i++)
	{
		var clase = col[i].alias == "PRIMARY" ? "style='display: none;'" : "style='max-width: 200px;'";
		var requerido = col[i].obligatorio == "Y" ? "*" : "";
		
		table +=
			"<th " + clase + ">" +
				col[i].alias + requerido +
			"</th>";
	}
	
	table +=
		"<th width='50' class='text-center'>EDITAR</th>" +
		"<th width='50'>ELIMINAR</th>";
	return table;
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para crear el body de la tabla.
 * Fecha creación:		2018/02/20.
 * Fecha modificiación:	2018/02/20.
 * */
function crear_body(tabla, col)
{
	var tbody = "";
	
	for (var i = 0; i < tabla.length; i++)
	{
		var id = '';
		var html =
			"<tr>";
			
		for (var x = 0; x < col.length; x++)
		{
			var clase = col[x].alias == "PRIMARY" ? "style='display: none;'" : "style='max-width: 200px;'";
			var columna = eval("tabla[i]." + col[x].columna) == 'null' ? '' : eval("tabla[i]." + col[x].columna);
			columna = columna == '-1' ? '' : columna;
			id = eval("tabla[i]." + col[0].columna);
			var tag_id = (x + 1) + "_" + id;
			var select = col[x].select != null ? col[x].select : '';
			var obligatorio = col[x].obligatorio == 'N' ? false : true;
			var input = crear_input(tag_id, col[x].dato, columna, select, obligatorio);
			var valor = columna;
			
			/*if (columna.length > 20)
			{
				valor = columna.substr(0, 20) + "...";
			}*/
			
			html +=
				"<td " + clase + ">" +
					input +
					"<span id='lbl_" + tag_id + "' title='" + columna + "'>" + valor + "</span>" +
				"</td>";
		}
		
		html +=
			'<td width="50" class="text-center">' +
				'<button class="btn_hidden pointer" id="btn_edit_' + id + '" onclick="habilitar_fila(' + id + ', this, ' + col.length + ')">' +
					'<span class="icon-edit"></span>' +
				'</button>' +
				'<div style="width: 50px; display: none" id="btn_container_' + id + '">' +
					'<button class="btn_hidden pointer" onclick="editar_fila(' + id + ', this)">' +
						'<img width="20" src="img/iconos/editar.png">' +
					'</button>' +
					'<button class="btn_hidden pointer" onclick="deshabilitar_fila(' + id + ', ' + col.length + ')">' +
						'<span class="icon-delete"></span>' +
					'</button>' +
				'</div>' +
			'</td>' +
			'<td width="50" class="text-center">' +
				'<button class="btn_hidden pointer" onclick="eliminar_fila(' + id + ')">' +
					'<span class="icon-delete"></span>' +
				'</button>' +
			'</td>';
		
		html += "</tr>";
		tbody += html;
	}
	
	return tbody;
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para crear los input editables de la tabla.
 * Fecha creación:		2018/02/20.
 * Fecha modificiación:	2018/02/20.
 * */
function crear_input(id, tipo, valor, select, requerido)
{
	var input = "";
	var str_requerido = requerido == true ? 'required' : '';
	
	switch (tipo)
	{
		case "NUMBER":
			input = "<input style='display: none;' type='number' class='form-control' id='input_" + id + "' value='" + valor + "' " + str_requerido + ">";
			break;
		case "VARCHAR2":
			input = "<input style='display: none;' type='text' class='form-control' id='input_" + id + "' value='" + valor + "' " + str_requerido + ">";
			break;
		case "DATETIME":
		case "DATE":
			input = "<input style='display: none;' type='text' class='form-control date readonly' id='input_" + id + "' value='" + valor + "' placeholder='dd/mm/aaaa' readonly " + str_requerido + ">";
			break;
		case "SELECT":
			input = "<select id='input_" + id + "' class='form-control' style='display: none; width: 80px' " + str_requerido + ">" +
						"<option value='0'>Seleccione</option>";
			
			for (var i = 0; i < select.length; i++)
			{
				input +=
					"<option value='" + select[i].id + "'>" + select[i].nombre + "</option>";
			}
			
			input += "</select>";
			break;
	}
	
	return input;
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para válidar si se agrega un nuevo registro a la tabla.
 * Fecha creación:		2018/02/20.
 * Fecha modificiación:	2018/02/20.
 * */
function agregar_fila(obj)
{
	$(obj).prop('disabled', true);
	$(obj).removeClass('pointer');
	$(obj).addClass('disabled');
	
	if (insert.length > 0)
	{
		// se agrega la fila
		insertar();
	}
	else
	{
		parent.msgAdvertencia(convertirCadena('El dominio no tiene la función de insertar.'));
	}
	
	$(obj).prop('disabled', false);
	$(obj).addClass('pointer');
	$(obj).removeClass('disabled');
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para agregar un nuevo registro a la tabla.
 * Fecha creación:		2018/02/20.
 * Fecha modificiación:	2018/02/20.
 * */
function insertar()
{
	try
	{
		var str_rs = send_query('./enviar_datos.hyg', insert, 'set', true);
		
		if (str_rs == 'Ok')
		{
			parent.msgInformacion('Registro guardado correctamente.');
			crear_layout($('#cmb_dominios').val());
			return;
		}
		
		parent.msgAdvertencia('Ha ocurrido un error.');
	}
	catch (e)
	{
		console.log(e);
	}
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para válidar si se actualiza el registro en la tabla.
 * Fecha creación:		2018/02/20.
 * Fecha modificiación:	2018/02/20.
 * */
function editar_fila(id, input)
{
	$(input).prop('disabled', true);
	$(input).addClass('disabled');
	$(input).removeClass('pointer');
	
	if (update.length > 0)
	{
		var datos = '[{';
		
		for (var i = 1; i <= update[0].N; i++)
		{
			var coma = i == update[0].N ? '' : ',';
			
			if ($('#input_' + i + '_' + id).prop('required') && $('#input_' + i + '_' + id).val() == '')
			{
				parent.msgAdvertencia('Los campos marcados con * son obligatorios.');
				$(input).prop('disabled', false);
				$(input).removeClass('disabled');
				$(input).addClass('pointer');
				return;
			}
			
			if ($('#input_' + i + '_' + id).val())
			{
				datos +=
					'"P' + i + '":"' + $('#input_' + i + '_' + id).val() + '"' + coma;
			}
			else
			{
				datos +=
					'"P' + i + '":"' + $('#lbl_' + i + '_' + id).html().trim() + '"' + coma;
			}
		}
		
		datos += '}]';
		update[0].DATOS = JSON.parse(datos);
		editar();
	}
	else
	{
		parent.msgAdvertencia(convertirCadena('El dominio no tiene la función de actualizar.'));
	}
	
	$(input).prop('disabled', false);
	$(input).removeClass('disabled');
	$(input).addClass('pointer');
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para agregar un nuevo registro a la tabla.
 * Fecha creación:		2018/02/20.
 * Fecha modificiación:	2018/02/20.
 * */
function editar()
{
	try
	{
		var str_rs = send_query('./enviar_datos.hyg', update, 'set', true);
		
		if (str_rs == 'Ok')
		{
			parent.msgInformacion('Registro actualizado correctamente.');
			crear_layout($('#cmb_dominios').val());
			return;
		}
		
		parent.msgAdvertencia('Ha ocurrido un error.');
	}
	catch (e)
	{
		console.log(e);
	}
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para válidar si se elimina el registro en la tabla.
 * Fecha creación:		2018/02/21.
 * Fecha modificiación:	2018/02/21.
 * */
function eliminar_fila(id)
{
	if (drop.length > 0)
	{
		var datos = [{'P1' : id + ''}];
		drop[0].DATOS = datos;
		parent.msgConfirmacion("Va a eliminar el registro, \u00BFDesea continuar\u003F", "eliminar",this.frameElement.id);
	}
	else
	{
		parent.msgAdvertencia(convertirCadena('El dominio no tiene la función de eliminar.'));
	}
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para eliminar un registro de la tabla.
 * Fecha creación:		2018/02/21.
 * Fecha modificiación:	2018/02/21.
 * */
function eliminar()
{
	try
	{
		var str_rs = send_query('./enviar_datos.hyg', drop, 'set', true);
		
		if (str_rs == 'Ok')
		{
			parent.msgInformacion('Registro eliminado correctamente.');
			crear_layout($('#cmb_dominios').val());
			return;
		}
		
		if (str_rs == '-1')
		{
			parent.msgAdvertencia('No se peude eliminar, por favor verifique que no existan datos asociados a este registro.');
			return;
		}
		
		parent.msgAdvertencia('Ha ocurrido un error.');
	}
	catch (e)
	{
		console.log(e);
	}
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para habilitar la edición de la fila en la tabla.
 * Fecha creación:		2018/02/20.
 * Fecha modificiación:	2018/02/20.
 * */
function habilitar_fila(id, input, cantidad)
{
	for (var i = 1; i <= cantidad; i++)
	{
		$('#lbl_' + i + '_' + id).hide();
		$('#input_' + i + '_' + id).show();
		$('#input_' + i + '_' + id).val($('#lbl_' + i + '_' + id).html().trim());
	}
	
	$(input).hide();
	$('#btn_container_' + id).css({'display' : 'flex', 'justify-content' : 'center', 'margin-top' : '.2rem', 'margin-bottom' : '.2rem'});
}

/*
 * Autor:				Daiber Gonzalez.
 * Descripción:			Función usada para bloquear la edición de la fila en la tabla.
 * Fecha creación:		2018/02/20.
 * Fecha modificiación:	2018/02/20.
 * */
function deshabilitar_fila(id, cantidad)
{
	for (var i = 1; i <= cantidad; i++)
	{
		$('#input_' + i + '_' + id).hide();
		$('#lbl_' + i + '_' + id).show();
	}
	
	$('#btn_container_' + id).css({'display' : 'none'});
	$('#btn_edit_' + id).show();
}

function formatear_datepicker()
{
	$.datepicker.regional['es'] =
	{
		closeText: 'Cerrar',
   		prevText: '< Ant',
   		nextText: 'Sig >',
   		currentText: 'Hoy',
   		monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
   		monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
   		dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
   		dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
   		dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','S&aacute;'],
   		weekHeader: 'Sm',
   		dateFormat: 'dd/mm/yy',
   		firstDay: 1,
   		isRTL: false,
   		showMonthAfterYear: false,
   		yearSuffix: ''
	};
	$.datepicker.setDefaults($.datepicker.regional['es']);
	$(function()
	{
		$('#txt_fecha').datepicker($.datepicker.regional[ "es" ]);
	});
}