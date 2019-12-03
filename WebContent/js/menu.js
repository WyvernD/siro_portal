var items_show = 0;
var items_count = 5;
var int_curent_index = 1;
var obj_contenidos = [];

$(document).ready(function()
		{
	cargar_menu();
	event_items_menu();
	// Organizar menu responsive
	responsive_menu();

	$(window).resize( function()
			{
		if ($(window).width() <= 974)
		{
			responsive_menu();
		}
			});

	show_information();
	event_rows();
		});

function cargar_menu()
{
	var obj_consulta = {'SQL' : 'SQL_CONSULTAR_LOGOS_PORTAL', 'N' : 1, 'DATOS' : {'P1' : 'and L.FK_IDSECCION = 3 and L.PUBLICO = 1'}};

	try
	{
		var obj_rs = send_query('./consultar_datos.hyg', obj_consulta, 'get', false);
		$('#info_am_2 a').attr('href', obj_rs[0].DESCRIPCION);
		$('#info_siro_2 a').attr('href', obj_rs[1].DESCRIPCION);
		$('#imgLogoSiro_2').attr('href', obj_rs[1].DESCRIPCION);	
	}
	catch (e)
	{
		console.log(e);
	}
}

function show_information()
{	
	$('.logo').each(function(i, obj)
			{
		// Etiqueta padre
		var obj_parent = $(obj).parent();
		// Etiqueta de información
		var obj_info = $(obj_parent).children()[1];

		// hover y out al logo
		$(obj).on('mouseover', function()
				{
			$(obj_info).show();
				});
		$(obj).on('mouseout', function()
				{
			$(obj_info).hide();
				});
		// Hover y out a la información
		$(obj_info).on('mouseover', function()
				{
			$(this).show();
				});
		$(obj_info).on('mouseout', function()
				{
			$(this).hide();
				});
			});
}

function responsive_menu()
{
	int_curent_index = 1;
	for (var i = 1; i <= items_count; i++)
	{
		$('.item_' + i).hide();
	}

	if ($(window).width() <= 750 && $(window).width() >= 559)
	{
		// se muestran 4 items
		items_show = 4;
	}
	else if ($(window).width() <= 558 && $(window).width() >= 443)
	{
		// se muestran 3 items
		items_show = 3;
	}
	else if ($(window).width() <= 442)
	{
		// se muestran 2 items
		items_show = 2;
	}
	else
	{
		// Show all
		items_show = 5;
	}

	validar_flechas();

	for (var i = 1; i <= items_show; i++)
	{
		$('.item_' + i).show();
	}
}

function validar_flechas()
{
	if (items_show >= items_count)
	{
		$('#left').hide();
		$('#right').hide();
	}
	else
	{
		$('#left').show();
		$('#right').show();
	}
}

function event_rows()
{
	$('#left').on('click', function()
			{
		anterior_menu();
			});

	$('#right').on('click', function()
			{
		siguiente_menu();
			});
}

function anterior_menu()
{
	if ($(window).width() <= 750 && $(window).width() >= 559)
	{
		// se muestran 4 items
		if (int_curent_index == 1)
		{
			return;
		}

		$('.item_' + int_curent_index).hide();
		int_curent_index = 1;
		$('.item_' + int_curent_index).show();
	}
	else if ($(window).width() <= 558 && $(window).width() >= 443)
	{
		// se muestran 3 items
		if (int_curent_index == 1)
		{
			return;
		}

		$('.item_' + (int_curent_index + 2)).hide();
		int_curent_index--;
		$('.item_' + int_curent_index).show();
	}
	else if ($(window).width() <= 442)
	{
		// se muestran 2 items
		if (int_curent_index == 1)
		{
			return;
		}

		$('.item_' + (int_curent_index + 1)).hide();
		int_curent_index--;
		$('.item_' + int_curent_index).show();
	}
}

function siguiente_menu()
{
	if ($(window).width() <= 750 && $(window).width() >= 559)
	{
		// se muestran 4 items
		if (int_curent_index == 5)
		{
			return;
		}

		$('.item_' + int_curent_index).hide();
		int_curent_index = 5;
		$('.item_' + int_curent_index).show();
	}
	else if ($(window).width() <= 558 && $(window).width() >= 443)
	{
		// se muestran 3 items
		if (int_curent_index == 3)
		{
			return;
		}

		$('.item_' + int_curent_index).hide();
		int_curent_index++;
		$('.item_' + (int_curent_index + 2)).show();
	}
	else if ($(window).width() <= 442)
	{
		// se muestran 2 items
		if (int_curent_index == 4)
		{
			return;
		}

		$('.item_' + int_curent_index).hide();
		int_curent_index++;
		$('.item_' + (int_curent_index + 1)).show();
	}
}

function event_items_menu()
{	
	for (var i = 1; i <= items_count; i++)
	{
		$('.item_' + i).on('click', function()
				{
			abrir_modal(this);
				});
	}

	for (var i = 1; i <= items_count; i++)
	{
		$('.btn_menu_' + i).on('click', function()
				{
			abrir_modal(this);
				});
	}
}

function abrir_modal(obj)
{
	try
	{
		var int_ancho = 500;
		var str_name = $(obj).attr('name');

		// Se consulta el contenido
		var obj_consulta = {'SQL' : 'SQL_CONSULTAR_CONTENIDOS_PORTAL', 'N' : 1, 'DATOS' : {'P1' : ' and NOMBRE = \'' + str_name + '\''}};
		var obj_subseccion = send_query('./consultar_datos.hyg', obj_consulta, 'get', false);
		// Se consulta la seccion de la imagen
		obj_consulta = {'SQL' : 'SQL_CONSULTAR_SECCION_PORTAL', 'N' : 1, 'DATOS' : {'P1' : ' and NOMBRESECCION = \'' + str_name + '\''}};
		var obj_secciones = send_query('./consultar_datos.hyg', obj_consulta, 'get', false);
		var str_ruta = obj_secciones[0].RUTA;
		var html_contenido = '';

		// Se consultan los logos internos
		obj_consulta = {'SQL' : 'SQL_CONSULTAR_LOGOS_PORTAL', 'N': 1, 'DATOS' : {'P1' : ' and FK_IDSECCION = ' + obj_secciones[0].KEY + ''}};
		var obj_logos = send_query('./consultar_datos.hyg', obj_consulta, 'get', false);

		if(str_name == 'SIF')
		{
			int_ancho = 760;
			var items = ''

				for (var i = 0; i < obj_logos.length; i++)
				{
					var clase = i == (obj_logos.length - 1) ? 'carousel-item active' : 'carousel-item';

					items +=
						'<div class="' + clase + '">' +
						'<img class="d-block w-100" src="' + str_ruta + obj_logos[i].NOMBRE + '" alt="...">' +
						'</div>';

					// '<img src="' + str_ruta + obj_logos[0].NOMBRE + '" style="width: 100%;">';
				}

			html_contenido =
				'<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">' +
				'<div class="carousel-inner">' +
				items +
				'</div>' +
				'<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">' +
				'<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
				'<span class="sr-only">Previous</span>' +
				'</a>' +
				'<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">' +
				'<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
				'<span class="sr-only">Next</span>' +
				'</a>' +
				'</div>';
		}
		else
		{
			html_contenido = obj_subseccion[0].DESCRIPCION;
		}

		var html_logo = str_name == 'SIF' ? '' : '<img src="' + str_ruta + obj_logos[0].NOMBRE + '">';
		var html_footer = '';

		if (str_name == 'HuecosMed')
		{
			$('#menu_modal_logo').addClass('huecos_logo')
			html_footer =
				'<div class="row">' +
				'<div class="col-6">' +
				'<a href="' + obj_logos[1].DESCRIPCION + '" target="_blank"> ' +
				'<img src="' + str_ruta + obj_logos[1].NOMBRE + '" style="width: 100%;">' +
				'</a>' +
				'</div>' +
				'<div class="col-6">' +
				'<a href="' + obj_logos[2].DESCRIPCION + '" target="_blank">' +
				'<img src="' + str_ruta + obj_logos[2].NOMBRE + '" style="width: 100%;">' +
				'</a>' +
				'</div>' +
				'</div>';
		}
		else
		{
			$('#menu_modal_logo').removeClass('huecos_logo')
		}

		if(str_name == 'Siro')
		{
			$('#menu_modal_logo').addClass('siro_logo');
		}
		else
		{
			$('#menu_modal_logo').removeClass('siro_logo');
		}

		if(str_name == 'SgVial')
		{
			$('#menu_modal_logo').addClass('sgvial_logo');
		}
		else
		{
			$('#menu_modal_logo').removeClass('sgvial_logo');
		}

		$('#menu_modal_logo').html(html_logo);
		$('#menu_modal_contenido').html(html_contenido);
		$('#menu_modal_footer').html(html_footer);
		$('#btn_modal_menu').click();
		$('#menu_modal .modal-dialog').css({'max-width' : int_ancho + 'px'});
	}
	catch (e)
	{
		parent.msgAdvertencia('Ha ocurrido un error, vuelve a intentar mas tarde.');
	}
}
