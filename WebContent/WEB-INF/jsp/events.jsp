<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<c:set var="rand"><%= java.lang.Math.round(java.lang.Math.random() * 999999) %></c:set>
<!-- <link rel="stylesheet" type="text/css" href="css/vendor/fullcalendar/fullcalendar.min.css"> -->
<link rel="stylesheet" type="text/css" href="css/vendor/fullcalendar_2/fullcalendar.css">
<link href="css/events.css?p=${rand}" rel="stylesheet" type="text/css" />

<div class="events" id="events">
	<div class="events_bg">
		<c:if test="${secciones.size() > 0}">
  			<img src="${secciones.get(0).RUTA}${secciones.get(0).NOMBRE}?p=${rand}">
  		</c:if>
	</div>
	<div class="mask">
		<div class="container">
			<div class="row">
				<div class="col-md-6 event_date d-md-block d-lg-block d-xl-block">
					<div id='calendar' class="calendar"></div>
				</div>
				<div class="col-md-6 event_note d-md-block d-lg-block d-xl-block">
					<div class="btn_toggle_event d-md-none d-lg-none d-xl-none">
						<span>X</span>
					</div>
					<div id='calendarAgenda' class="calendarAgenda">
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<button class="btn_modal_event d-none" type="button" data-toggle="modal" data-target="#event_modal"></button>

<!-- Modal -->
<div class="modal fade" id="event_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<div class="container-fluid">
      		<div class="row">
      			<div class="col-12">
      				<h2 id="event_title" class="text-center"></h2>
      			</div>
      			<div class="col-12" id="event_img">
      			</div>
      			<div class="col-12">
      				<p id="event_descripcion"></p>
      				<p id="event_fecha_ini"></p>
      				<p id="event_fecha_fin"></p>
      				<p id="event_subsistema"></p>
      			</div>
      		</div>
      	</div>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript" src="js/vendor/moment/moment.min.js"></script>
<!-- <script type="text/javascript" src="js/vendor/fullcalendar/fullcalendar.min.js"></script> -->
<!-- <script type="text/javascript" src="js/vendor/fullcalendar/locale/locale-all.js"></script> -->
<script type="text/javascript" src="js/vendor/fullcalendar_2/fullcalendar.min.js"></script>
<script type="text/javascript" src="js/vendor/fullcalendar_2/locale/es.js"></script>
<script src="js/events.js?p=${rand}"></script>