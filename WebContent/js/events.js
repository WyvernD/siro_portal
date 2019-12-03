var bl_show = false;
var timer = null;

$(document).ready(function()
{
	if ($(window).width() <= 750)
	{
		if (!bl_show)
		{
			$('.event_note').hide();
			bl_show = true;
		}
	}
	
	$(window).resize(function()
	{
		if ($(window).width() <= 750)
		{
			if (!bl_show)
			{
				$('.event_note').hide();
				bl_show = true;
			}
		}
	});
	
	render_calendar();
	render_calendar_agenda();
	
	$('.btn_toggle_event').on('click', function()
	{
		$('.event_note').toggle("slow", function()
    	{
    		$('.event_date').show();
    	});
	});
});;

function render_calendar()
{
	$('#calendar').fullCalendar(
	{
		// Lenguaje
		locale: 'es',
		// Evento al hacer click
		events : 'consultar_eventos.hyg',
		eventLimit : true,
		header :
		{
		    left:   'prev',
		    center: 'title',
		    right:  'next'
		},
		// Función al hacer click
	    dayClick: function(date, jsEvent, view)
	    {
	    	if ($(window).width() <= 750)
	    	{ 		
	    		$('.event_date').toggle("slow", function()
		    	{
		    		$('.event_note').show();
		    		$('#calendarAgenda .fc-next-button').click();
		    		$('#calendarAgenda .fc-prev-button').click();
		    	});
	    	}
	    	
    		$('#calendarAgenda').fullCalendar( 'gotoDate', date )
    		//$('#btnRegresar_Event').attr('style', 'display: block;')
	    },
	    eventRender: function (event, element, view)
	    {
	    	var currDate = moment(event.start).startOf('day');
	        var lastDate = moment(event.end).startOf('day');
	        
	        var dateString = currDate.format('YYYY-MM-DD');
	        $('#calendar').find('.fc-day-number[data-date="' + dateString + '"]').css('background-color', '#219bda');
	        
	        while(currDate.add(1, 'days').diff(lastDate) < 0)
	        {
		        var dateString = currDate.format('YYYY-MM-DD');
		        $('#calendar').find('.fc-day-number[data-date="' + dateString + '"]').css('background-color', '#219bda');
	        }
	    }
	});
	
	$('#calendar').fullCalendar('option', 'height', $(".eventosCont").height());
}

function render_calendar_agenda()
{
	$('#calendarAgenda').fullCalendar(
	{
		events : 'consultar_eventos.hyg',
		eventLimit : true,
		eventLimitClick : "popover",
		eventClick : function(calEvent, jsEvent, view)
		{
			abrirEventoId(calEvent.id);
		},
		defaultView: 'basicDay',
		eventMouseover : crearPopOver,
		header : {
		    left:   'prev',
		    center: 'title',
		    right:  'next'
		},
		dayRender: function( date, cell )
		{
        	$(".fc-day").css('background-color', '');
        	var dateString = date.format('YYYY-MM-DD');
	        $('#calendar').find('.fc-day[data-date="' + dateString + '"]').css('background-color', 'red');
	    },
	});
	$('#calendarAgenda').fullCalendar('option', 'height', $(".eventosCont").height());
}


function crearPopOver(calEvent, jsEvent, view)
{
	$(".popOverEvento").remove();
	var html = "<div style='left:" + jsEvent.pageX + "px;top:" + jsEvent.pageY
			+ "px;'>" + calEvent.title;
	var fechaIni = calEvent.start._i;
	
	if (fechaIni.split("T").length > 1)
	{
		html += "<br/><br/><b class='lblEvento'>Fecha Inicio:</b> " + fechaIni.split("T")[0];
		html += "<br/><b class='lblEvento'>Hora Inicio:</b> " + fechaIni.split("T")[1];
	}
	else
	{
		html += "<br/><br/><b class='lblEvento'>Fecha Inicio:</b> " + fechaIni;
	}
	if(calEvent.end)
	{
		var fechaFin = calEvent.end._i;
		if (fechaFin.split("T").length > 1)
		{
			html += "<br/><b class='lblEvento'>Fecha Final:</b> " + fechaFin.split("T")[0];
			html += "<br/><b class='lblEvento'>Hora Final:</b> " + fechaFin.split("T")[1];
		}
		else
		{
			html += "<br/><b class='lblEvento'>Fecha Final:</b> " + fechaFin;
		}
	}
	
	html += "</div>";
	var div = $(html);
	div.addClass('popOverEvento').hide().appendTo('body');
	
	$(".popOverEvento").css('margin-top',
			"-" + ($(".popOverEvento").height()/2) + "px").css(
			'margin-left', "40px");
	$(".popOverEvento").fadeIn();
	$(".popOverEvento").mouseout(function()
	{
		if (timer)
		{
			clearTimeout(timer);
			timer = null;
		}
		$(".popOverEvento").fadeOut(300, function()
		{
			$(this).remove();
		});
	});
	$(".popOverEvento").mouseover(function()
	{
		if (timer)
		{
			clearTimeout(timer);
			timer = null;
		}
	});
	if (timer)
	{
		clearTimeout(timer);
		timer = null;
	}
	timer = setTimeout(function()
	{
		$(".popOverEvento").fadeOut(300, function() {
			$(this).remove();
		});
	}, 3000);
}

function abrirEventoId(id)
{
	$.ajax(
	{
		"url" : "consultar_evento_id.hyg",
		"data" : {id : id},
		"success" : function(evento)
		{
			if (evento != null)
			{
				var rs = JSON.parse(evento);
				
				$('.btn_modal_event').click();
				
				$('#event_title').html(rs[0].ACTIVIDAD);
				
				if (rs[0].IMAGEN != null && rs[0].IMAGEN != "")
				{
					var html = "<br/><br/><img src='" + rs[0].RUTA + rs[0].IMAGEN + "' style='width: 100%;' />";
					$('#event_img').html(html);
				}
				
				if (rs[0].DESCRIPCION != null && rs[0].DESCRIPCION != "")
				{
					$('#event_descripcion').html(convertirCadena('Descripción: <br/>' + rs[0].DESCRIPCION));
				}
				
				if (rs[0].LUGAR != null && rs[0].LUGAR != "")
				{
					$('#event_lugar').html(convertirCadena('Lugar: ' + rs[0].LUGAR));
				}
				
				var fechaIni = rs[0].FECHAINICIO;
				$('#event_fecha_ini').html('Fecha inicio: ' + fechaIni);
				var fechaFin =  rs[0].FECHAFIN;			
				$('#event_fecha_fin').html('Fecha fin: ' + fechaFin);
				$('#event_subsistema').html('Subsistema: ' + rs[0].SUBSISTEMA);
			}
		},
		"error" : function(xhr, status, err)
		{
			alert("Error al contactar el servidor");
		}
	});
}




