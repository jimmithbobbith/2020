<?php
session_start();
// To protect any php page on your site, include main.php
// and create a new User object. It's that simple!

require_once 'includes/main.php';

$user = new User();




if(!$_SESSION["doc"]){
    redirect('doc.php');
}
/*if(!$user->loggedIn()){
    redirect('index.php');
}*/
?>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>Make New Patients</title>
        <link rel="stylesheet" href="css/style.css" type="text/css" media="screen">
        <link rel="stylesheet" href="assets/css/style.css" type="text/css" media="screen">
		<link rel="stylesheet" href="css/responsive.css" type="text/css" media="screen">
        <link rel="stylesheet" type="text/css" href="css/demo1.css" />
        <link rel="stylesheet" type="text/css" href="css/elastislide.css" />
        <link rel="stylesheet" type="text/css" href="css/custom.css" />
        <link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
        <script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>

        <link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css" />
		<link rel="stylesheet" href="css/font-awesome-4.1.0/css/font-awesome.min.css" type="text/css" media="screen">
        <script>

        $(document).ready(function(){
        $(".flip").click(function(){
            $(this).next().slideToggle("slow");
        });
        });
        </script>

        <style>
        .panel, .flip {
            padding: 5px;
            text-align: center;
            background-color: #e5eecc;
            border: solid 1px #c3c3c3;
        }

        .panel {
            padding: 50px;
            display: none;
        }
        </style>
        	</head>

	<body>


    <div class="flip">Click to slide the panel down or up</div>
    <div class="panel"><?php ?></div><div class="flip">Click to slide the panel down or up</div>
    <div class="panel">Hello world!</div>
    <div id="flips">Click to slide the panel down or up</div>
		<div id="wrap">
		<h1>Filter Results or Add Patient</h1>

			<!-- Feedback message zone -->
			<div id="message"></div>

            <div id="toolbar">
              <input type="text" id="filter" name="filter" placeholder="Filter :type any text here"  />
              <a id="showaddformbutton" class="button green"><i class="fa fa-plus"></i> Add new Patient</a>
            </div>
			<!-- Grid contents -->
			<div id="tablecontent"></div>

			<!-- Paginator control -->
			<div id="paginator"></div>
		</div>
        <script src="js/editablegrid.js"></script>
        <!-- [DO NOT DEPLOY] --> <script src="js/editablegrid_renderers.js" ></script>
        <!-- [DO NOT DEPLOY] --> <script src="js/editablegrid_editors.js" ></script>
        <!-- [DO NOT DEPLOY] --> <script src="js/editablegrid_validators.js" ></script>
        <!-- [DO NOT DEPLOY] --> <script src="js/editablegrid_utils.js" ></script>
        <!-- [DO NOT DEPLOY] --> <script src="js/editablegrid_charts.js" ></script>
        <!-- <script src="js/editablegrid-2.1.0-b25.js"></script>
         <script src="js/editablegrid_renderers.js"></script>

       <script src="js/editablegrid.js"></script>-->
          <script src="js/jquery-1.11.1.min.js" ></script>
          <!-- EditableGrid test if jQuery UI is present. If present, a datepicker is automatically used for date type -->
        <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
		<script src="js/demo.js" ></script>

		<script type="text/javascript">

            var datagrid = new DatabaseGrid();
			window.onload = function() {
                $("<tr class='content1'>").insertAfter(".editablegrid-action");
                $("</tr>").insertAfter(".editablegrid-pg12");
                // key typed in the filter field
                $("#filter").keyup(function() {
                    datagrid.editableGrid.filter( $(this).val());

                    // To filter on some columns, you can set an array of column index
                    //datagrid.editableGrid.filter( $(this).val(), [0,3,5]);
                  });

                $("#showaddformbutton").click( function()  {
                  showAddForm();
              });
                $("#cancelbutton").click( function() {
                  showAddForm();
                });

                $("#addbutton").click(function() {
                  datagrid.addRow2();
                });
window.setTimeout (
                        function ()
                        {
var tempj="loaddata.php?db_tablename=reg_users";
                            $.getJSON( tempj, function( json ) {
                                window.jjj=json.data[0];
                            });


                            window.valuesch=[1];
                            /*window.chartt=new Chartist.Bar('.ct-chart', {
                                labels: window.valuesch,
                                series: window.valuesch
                            }, {
                                width: 500,
                                height: 250,

                                referenceValue: 1,
                                distributeSeries: true
                            });

                            window.chartt.update();
                            window.chartt.on('draw', function(context) {
                                // First we want to make sure that only do something when the draw event is for bars. Draw events do get fired for labels and grids too.
                                if(context.type === 'bar') {
                                    if (context.value>10 ){
                                        var asd = 70;
                                    }else{

                                        asd=10
                                    }
                                    // With the Chartist.Svg API we can easily set an attribute on our bar that just got drawn
                                    context.element.attr({

                                        // Now we set the style attribute on our bar to override the default color of the bar. By using a HSL colour we can easily set the hue of the colour dynamically while keeping the same saturation and lightness. From the context we can also get the current value of the bar. We use that value to calculate a hue between 0 and 100 degree. This will make our bars appear green when close to the maximum and red when close to zero.
                                        style: 'stroke: hsl(' + asd + ', 50%, 50%);'
                                    });
                                }
                            });*/


                            $(".editablegrid-pg5").addClass('hidcol');

                            $("[class^='editablegrid-pg']").each(function(){
                                        if(Number($(this).text()) > -1) {

                                            if(Number($(this).text().replace(/[^0-9\.]+/g,"")) > 20) {
                                                $(this).css('background', '#96C779');
                                            }else{
                                                $(this).css('background', '#FFC9C9');

                                            }
                                        }
                                });


                            $('#main').find('input[id^="people_"]').each(function(){
                               });


                            $("#tablecontent").find("tr[id^='reg_users_']").each(function(){
                               console.log("+++++++++++");
                                var idid = $(this).find("[class='editablegrid-id']");

                                var trid = $(this).closest('td').attr('class');
                                var tds = $(this).find("[class^='editablegrid-pg']");
                                var ididid;
                                var readall=1;
                                console.log(tds+"+++"+idid.txt);


                            });
                            var counterrow=0;
                            var pgvisitArray=[];
                        window.pgvisitavg=[];
                            window.pgvisittotal=[0,0,0,0,0,0,0,0,0,0,0,0];
                            window.pgvisitread=[0,0,0,0,0,0,0,0,0,0,0,0];
                            $("[id^='reg_users_']").each(function(){
                                pgvisitArray[counterrow]=[];
                                console.log("+++++++++++");
                                var readcount=0;
                                var avat = $(this).find("[class^='editablegrid-avata']");

                                var avattext="<img src='img/avatars/"+$(avat).text()+"' alt='' border='3' height='35' width='35' />";

                                $(avat).html(avattext);

                                        console.log('avat'+avat);
                                    var idid = $(this).find("[class^='number editablegrid-i']");
                                    var tds = $(this).find("[class^='editablegrid-pg']").not( document.getElementsByClassName( "editablegrid-pgavg" )) ;
                                var ididid;
var readall=1;
                                    idid.each(function(index, item) {
                                       console.log("+++++++++++"+Number($(item).text()))

                                        ididid=Number($(item).text());
                                    });
                                    var totalread=0;
                                    tds.each(function(index, item) {
                                       var cellVal=Number($(item).text());
                                        pgvisitArray[counterrow][index]=cellVal;
                                        if(cellVal<0.1){
                                            readall=0;

                                        }else{
                                            readcount++;
                                            totalread+=cellVal;
                                            if(cellVal>100){
                                                 cellVal=100;
                                            }
                                            window.pgvisittotal[index]+=cellVal;
                                            console.log(  window.pgvisittotal);
                                            window.pgvisitread[index]+=1;
                                        }

                                    });




                                console.log(totalread+"  "+readall);
                                updatePgComment(readall,"readall",ididid);
                                if(readcount>=1){

                                    updatePgComment(totalread/readcount,"pgavg",ididid);
                                }

                                counterrow++;
                            });
                            for (var p = 0; p < pgvisittotal.length; p++){

                                window.pgvisitavg[p]= window.pgvisittotal[p]/  window.pgvisitread[p];

                            }

                                $("[id^='reg_users_']").on('mouseover', function(event) {
                                var tds = $(this).addClass('row-highlight').find("[class^='editablegrid-pg']");



                                var idid = $(this).find("[class^='editablegrid-i']");
                                var readallcelll=0;
                                var readallcell= $(this).find("[class='pg2']").text();

                                console.log("yeah"+readallcell);

                                var values = [];    var valuess = [];
                                var readall=1;
                                idid.each(function(index, item) {

                                    readallcelll=($(item).text())});

                                tds.each(function(index, item) {

                                    if(Number($(item).text())<0.1){
readall=0;
                                        valuess[index] = 0;

                                    }else{
                                        valuess[index] = Number($(item).text());

                                    }

                                    values[index] = "pg"+index;
                                });
                                if (readall==1){
                                    console.log("yeah"+readallcelll);
                                    updatePgValue(1,"readall",readallcelll)
                                }
                                window.valuesch=values;
                /*               if(window.chartt){

                                   window.chartt.data.series=valuess;
                                   window.chartt.data.labels=values;
                                   window.chartt.update();

                               }
*/

                                console.log(values);
                                console.log(valuess);
                            });

                            var current = 0,
                                    $preview = $( '#preview' ),
                                    $carouselEl = $( '#carousel' ),
                                    $carouselItems = $carouselEl.children(),
                                    carousel = $carouselEl.elastislide( {
                                        current : current,
                                        minItems : 4,

                                                onClick : function( el, pos, evt ) {

                                                    changeImage( el, pos );
                                                    evt.preventDefault();


                                                },
                                        onReady : function() {

                                                    changeImage( $carouselItems.eq( current ), current );

                                        }
                                    } );

                            function changeImage( el, pos ) {
                                $('.elastislide-next').css("display", "block");
                                $preview.attr( 'src', el.data( 'preview' ) );
                                $carouselItems.removeClass( 'current-img' );
                                el.addClass( 'current-img' );
                                carousel.setCurrent( pos );
                                $('#avatar').val( el.data( 'preview' ) );
                            }

                        }, 1000
                );

			};
		</script>

        <!-- simple form, used to add a new row -->
        <div id="addform">

            <div class="row">
                <input type="text" id="email" name="email" placeholder="email" />
                <input type="hidden" id="avatar" name="avatar" placeholder="avatar" />
            </div>
            <div class="container demo-4">
                <!--/ Codrops top bar -->

                <div class="main">
                    <div class="gallery">
                        <!-- Elastislide Carousel -->
                        <ul id="carousel" class="elastislide-list">
                            <li data-preview="avatar_04.png"><a href="#"><img src="img/avatars/avatar_04.png" alt="avatar_04" /></a></li>
                            <li data-preview="avatar_05.png"><a href="#"><img src="img/avatars/avatar_05.png" alt="avatar_05" /></a></li>
                            <li data-preview="avatar_06.png"><a href="#"><img src="img/avatars/avatar_06.png" alt="avatar_06" /></a></li>
                            <li data-preview="avatar_07.png"><a href="#"><img src="img/avatars/avatar_07.png" alt="avatar_07" /></a></li>
                            <li data-preview="avatar_11.png"><a href="#"><img src="img/avatars/avatar_11.png" alt="avatar_11" /></a></li>
                            <li data-preview="avatar_12.png"><a href="#"><img src="img/avatars/avatar_12.png" alt="avatar_12" /></a></li>
                            <li data-preview="avatar_13.png"><a href="#"><img src="img/avatars/avatar_13.png" alt="avatar_13" /></a></li>
                            <li data-preview="avatar_14.png"><a href="#"><img src="img/avatars/avatar_14.png" alt="avatar_14" /></a></li>
                            <li data-preview="avatar_15.png"><a href="#"><img src="img/avatars/avatar_15.png" alt="avatar_15" /></a></li>
                            <li data-preview="avatar_16.png"><a href="#"><img src="img/avatars/avatar_16.png" alt="avatar_16" /></a></li>
                            <li data-preview="avatar_17.png"><a href="#"><img src="img/avatars/avatar_17.png" alt="avatar_17" /></a></li>
                            <li data-preview="avatar_18.png"><a href="#"><img src="img/avatars/avatar_18.png" alt="avatar_18" /></a></li>
                            <li data-preview="avatar_19.png"><a href="#"><img src="img/avatars/avatar_19.png" alt="avatar_19" /></a></li>
                            <li data-preview="avatar_20.png"><a href="#"><img src="img/avatars/avatar_20.png" alt="avatar_20" /></a></li>
                            <li data-preview="avatar_01.png"><a href="#"><img src="img/avatars/avatar_01.png" alt="avatar_01" /></a></li>
                            <li data-preview="avatar_02.png"><a href="#"><img src="img/avatars/avatar_02.png" alt="avatar_02" /></a></li>
                            <li data-preview="avatar_03.png"><a href="#"><img src="img/avatars/avatar_03.png" alt="avatar_03" /></a></li>
                            <li data-preview="avatar_08.png"><a href="#"><img src="img/avatars/avatar_08.png" alt="avatar_08" /></a></li>
                            <li data-preview="avatar_09.png"><a href="#"><img src="img/avatars/avatar_09.png" alt="avatar_09" /></a></li>
                            <li data-preview="avatar_10.png"><a href="#"><img src="img/avatars/avatar_10.png" alt="avatar_10" /></a></li>
                        </ul>
                        <!-- End Elastislide Carousel -->
                    </div>
                </div>
            </div>
            <script type="text/javascript" src="js/modernizr.custom.17475.js"></script>

            <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
            <script type="text/javascript" src="js/jquerypp.custom.js"></script>
            <script type="text/javascript" src="js/jquery.elastislide.js"></script>

            <div class="row tright">
                <a id="addbutton" class="button green" ><i class="fa fa-save"></i> Applly</a>
                <a id="cancelbutton" class="button delete">Cancel</a>
            </div>
        </div>

        <div class="ct-chart"></div>


        <script src="js/charts.js"></script><div class="flip">Click to slide the panel down or up</div>
    <div class="panel">Hello world!</div>
	</body>

</html>
