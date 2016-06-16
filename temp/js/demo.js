/**
 *  highlightRow and highlight are used to show a visual feedback. If the row has been successfully modified, it will be highlighted in green. Otherwise, in red
 */
function highlightRow(rowId, bgColor, after) {
    var rowSelector = $("#" + rowId);
    rowSelector.css("background-color", bgColor);
    rowSelector.fadeTo("normal", 0.5, function () {
        rowSelector.fadeTo("fast", 1, function () {
            rowSelector.css("background-color", '');
        });
    });
}

function highlight(div_id, style) {
    highlightRow(div_id, style == "error" ? "#e5afaf" : style == "warning" ? "#ffcc00" : "#8dc70a");
}

/**
 updateCellValue calls the PHP script that will update the database.
 */
updateCellValue = function (editableGrid, rowIndex, columnIndex, oldValue, newValue, row, onResponse) {

    console.log(editableGrid.name + " " + editableGrid.getRowId(rowIndex) + " " + editableGrid.getColumnType(columnIndex) + " " + editableGrid.getColumnName(columnIndex) + " " + editableGrid.getColumnType(columnIndex))
    $.ajax({
        url: 'update.php',
        type: 'POST',
        dataType: "html",
        data: {
            tablename: editableGrid.name,
            id: editableGrid.getRowId(rowIndex),
            newvalue: editableGrid.getColumnType(columnIndex) == "boolean" ? (newValue ? 1 : 0) : newValue,
            colname: editableGrid.getColumnName(columnIndex),
            coltype: editableGrid.getColumnType(columnIndex)
        },
        success: function (response) {
            // reset old value if failed then highlight row
            var success = onResponse ? onResponse(response) : (response == "ok" || !isNaN(parseInt(response))); // by default, a sucessfull reponse can be "ok" or a database id
            if (!success) editableGrid.setValueAt(rowIndex, columnIndex, oldValue);
            highlight(row.id, success ? "ok" : "error");
        },
        error: function (XMLHttpRequest, textStatus, exception) {
            alert("Ajax failure9999999\n" + errortext);
        },
        async: true
    });


    greenn()


}

window.sendj = function (pookey) {

    $.ajax({
        // 2 integer rank integer
        url: 'update2.php',
        type: 'POST',
        dataType: "html",
        data: {
            q1: pookey
        },
        success: function (response) {
            // reset old value if failed then highlight row
            //var success = onResponse ? onResponse(response) : (response == "ok" || !isNaN(parseInt(response))); // by default, a sucessfull reponse can be "ok" or a database id
            //if (!success) editableGrid.setValueAt(rowIndex, columnIndex, oldValue);
            //highlight(row.id, success ? "ok" : "error");
        },
        error: function (XMLHttpRequest, textStatus, exception) {
            alert("Ajax failure222222\n" + errortext);
        },
        async: true
    });

}

updatePgValue = function (pgTime, pgName, pgID) {
    if (!pgID) {
        pgID = 1;
    }
    console.log(pgTime + "    " + pgName + "   pgID   " + pgID);
    $.ajax({
        // 2 integer rank integer
        url: 'update.php',
        type: 'POST',
        dataType: "html",
        data: {
            tablename: "reg_users",
            id: pgID,
            newvalue: pgTime,
            colname: pgName,
            coltype: "integer"
        },
        success: function (response) {
            // reset old value if failed then highlight row
            //var success = onResponse ? onResponse(response) : (response == "ok" || !isNaN(parseInt(response))); // by default, a sucessfull reponse can be "ok" or a database id
            //if (!success) editableGrid.setValueAt(rowIndex, columnIndex, oldValue);
            //highlight(row.id, success ? "ok" : "error");
        },
        error: function (XMLHttpRequest, textStatus, exception) {
            alert("Ajax failure444444\n" + errortext);
        },
        async: true
    });

}
updatePgComment = function (pgTime, pgName, pgID) {
    if (!pgID) {
        pgID = 12;
    }
    console.log("updatePgComment   " + pgTime + "    " + pgName + "   pgID   " + pgID);
    $.ajax({
        // 2 integer rank integer
        url: 'update.php',
        type: 'POST',
        dataType: "html",
        data: {
            tablename: "reg_users",
            id: pgID,
            newvalue: pgTime,
            colname: pgName,
            coltype: "integer"
        },
        success: function (response) {
            // reset old value if failed then highlight row
            //var success = onResponse ? onResponse(response) : (response == "ok" || !isNaN(parseInt(response))); // by default, a sucessfull reponse can be "ok" or a database id
            //if (!success) editableGrid.setValueAt(rowIndex, columnIndex, oldValue);
            //highlight(row.id, success ? "ok" : "error");
        },
        error: function (XMLHttpRequest, textStatus, exception) {
            alert("Ajax failure55555\n" + errortext);
        },
        async: true
    });

}

updatePgFeedback = function (fbk,pgID) {
    if (!pgID) {
        pgID = 12;
    }
   // console.log("updatePgComment   " + pgTime + "    " + pgName + "   pgID   " + pgID);
    $.ajax({
        // 2 integer rank integer
        url: 'updatej.php',
        type: 'POST',
        dataType: "html",
        data: {
            tablename: "reg_users",
            id: pgID,
            newvalue: fbk,
            colname: "feedback",
            coltype: "TEXT"
        },
        async: true
    });

}




function DatabaseGrid() {
    this.editableGrid = new EditableGrid("reg_users", {
        enableSort: true,
        // define the number of row visible by page
        pageSize: 50,
        // Once the table is displayed, we update the paginator state
        tableRendered: function () {
            updatePaginator(this);
        },
        tableLoaded: function () {
            datagrid.initializeGrid(this);
        },
        modelChanged: function (rowIndex, columnIndex, oldValue, newValue, row) {
            console.log("this " + this.name)
            updateCellValue(this, rowIndex, columnIndex, oldValue, newValue, row);
        }
    });
    this.fetchGrid();

}

DatabaseGrid.prototype.fetchGrid = function () {
    // call a PHP script to get the data
    this.editableGrid.loadJSON("loaddata.php?db_tablename=reg_users");
    rowsCycle();

};
DatabaseGrid.prototype.initializeGrid = function (grid) {

    var self = this;

// render for the action column
    grid.setCellRenderer("action", new CellRenderer({
        render: function (cell, id) {
            cell.innerHTML += "<i onclick=\"datagrid.deleteRow(" + id + ");\" class='fa fa-trash-o red' ></i>";
        }
    }));

    $("[class^='editablegrid-pg']").css('background', '#00ff00');
    this.editableGrid.getColumn("pg10").editable = false;
    this.editableGrid.getColumn("pg10").hidden = true;
    grid.renderGrid("tablecontent", "testgrid");
};

DatabaseGrid.prototype.deleteRow = function (id) {

    var self = this;

    if (confirm('Are you sur you want to delete the row id ' + id)) {

        $.ajax({
            url: 'delete.php',
            type: 'POST',
            dataType: "html",
            data: {
                tablename: self.editableGrid.name,
                id: id
            },
            success: function (response) {
                if (response == "ok")
                    self.editableGrid.removeRow(id);
            },
            error: function (XMLHttpRequest, textStatus, exception) {
                alert("Ajax failure666666\n" + errortext);
            },
            async: true
        });


    }

};


DatabaseGrid.prototype.addRow = function (id) {

    var self = this;

    $.ajax({
        url: 'add.php',
        type: 'POST',
        dataType: "html",
        data: {
            tablename: self.editableGrid.name,
            email: $("#email").val(),
            avatar: $("#avatar").val()
        },
        success: function (response) {
            if (response == "ok") {

                // hide form
                showAddForm();
                $("#email").val('');

                // alert("Row added : reload model");
                window.setTimeout (
                    function () {
                        rowsCycle();
                    }, 5000
                );
                self.fetchGrid();
            }
            else
                alert("zzerror");
        },
        error: function (XMLHttpRequest, textStatus, exception) {
            alert("Ajax failure77777777\n");
        },
        async: true
    });

};


DatabaseGrid.prototype.addRow2 = function (id) {

    var self = this;

    $.ajax({
        url: 'add2.php',
        type: 'POST',
        dataType: "html",
        data: {
            tablename: self.editableGrid.name,
            email: $("#email").val(),
            avatar: $("#avatar").val()
                },
        success: function (response) {
            if (response == "ok") {

                // hide form
                showAddForm();
                $("#email").val('');

                // alert("Row added : reload model");
                window.setTimeout (
                    function () {
                        rowsCycle();
                    }, 5000
                );
                self.fetchGrid();
            }
            else
                alert(response);
        },
        error: function (XMLHttpRequest, textStatus, exception) {
            alert("Ajax failure888888\n" + errortext);
        },
        async: true
    });

};


function updatePaginator(grid, divId) {
    divId = divId || "paginator";
    var paginator = $("#" + divId).empty();
    var nbPages = grid.getPageCount();

    // get interval
    var interval = grid.getSlidingPageInterval(20);
    if (interval == null) return;

    // get pages in interval (with links except for the current page)
    var pages = grid.getPagesInInterval(interval, function (pageIndex, isCurrent) {
        if (isCurrent) return "<span id='currentpageindex'>" + (pageIndex + 1) + "</span>";
        return $("<a>").css("cursor", "pointer").html(pageIndex + 1).click(function (event) {
            grid.setPageIndex(parseInt($(this).html()) - 1);
        });
    });

    // "first" link
    var link = $("<a class='nobg'>").html("<i class='fa fa-fast-backward'></i>");
    if (!grid.canGoBack()) link.css({opacity: 0.4, filter: "alpha(opacity=40)"});
    else link.css("cursor", "pointer").click(function (event) {
        grid.firstPage();
    });
    paginator.append(link);

    // "prev" link
    link = $("<a class='nobg'>").html("<i class='fa fa-backward'></i>");
    if (!grid.canGoBack()) link.css({opacity: 0.4, filter: "alpha(opacity=40)"});
    else link.css("cursor", "pointer").click(function (event) {
        grid.prevPage();
    });
    paginator.append(link);

    // pages
    for (p = 0; p < pages.length; p++) paginator.append(pages[p]).append(" ");

    // "next" link
    link = $("<a class='nobg'>").html("<i class='fa fa-forward'>");
    if (!grid.canGoForward()) link.css({opacity: 0.4, filter: "alpha(opacity=40)"});
    else link.css("cursor", "pointer").click(function (event) {
        grid.nextPage();
    });
    paginator.append(link);

    // "last" link
    link = $("<a class='nobg'>").html("<i class='fa fa-fast-forward'>");
    if (!grid.canGoForward()) link.css({opacity: 0.4, filter: "alpha(opacity=40)"});
    else link.css("cursor", "pointer").click(function (event) {
        grid.lastPage();
    });
    paginator.append(link);
};


function showAddForm() {


    if ($("#addform").is(':visible'))
        $("#addform").hide();
    else
        $("#addform").show();
}

function showFeedback() {


    if ($("#formm").is(':visible')) {
        $("#formm").hide();

    }
    else {
        $("#formm").show();
        classie.removeClass(theForm.querySelector('.simform-inner'), 'hide');
        classie.removeClass(theForm.querySelector('.final-message'), 'show');

    }
}

function showSign() {


    if ($("#formmz").is(':visible'))
        $("#formmz").hide();
    else

        $("#formmz").fadeIn("slow", function () {
        });

}

function greenn() {
    $("[class^='editablegrid-pg']").each(function () {
        if (Number($(this).text()) > -1) {
            if (Number($(this).text().replace(/[^0-9\.]+/g, "")) > 10) {
                $(this).css('background', '#96C779');
            } else {
                $(this).css('background', '#FFC9C9');

            }
        }
    });

}
window.runCycle = 0;


function rowsCycle() {
    window.runCycle++;
    if (window.runCycle > 1) {

    } else {
        return;
    }


    var tempj = "loaddata.php?db_tablename=reg_users"
    $.getJSON(tempj, function (json) {
        window.jjj = json.data[0];
    });


    /*  window.valuesch=[1];
     window.chartt=new Chartist.Bar('.ct-chart', {
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
     var colourOfBar = 70;
     }else{

     colourOfBar=10
     }
     // With the Chartist.Svg API we can easily set an attribute on our bar that just got drawn
     context.element.attr({

     // Now we set the style attribute on our bar to override the default color of the bar. By using a HSL colour we can easily set the hue of the colour dynamically while keeping the same saturation and lightness. From the context we can also get the current value of the bar. We use that value to calculate a hue between 0 and 100 degree. This will make our bars appear green when close to the maximum and red when close to zero.
     style: 'stroke: hsl(' + colourOfBar + ', 50%, 50%);'
     });
     }
     });

     */
    $(".editablegrid-pg5").addClass('hidcol');

    $("[class^='editablegrid-pg']").each(function () {
        if (Number($(this).text()) > -1) {

            if (Number($(this).text().replace(/[^0-9\.]+/g, "")) > 20) {
                $(this).css('background', '#96C779');
            } else {
                $(this).css('background', '#FFC9C9');

            }
        }
    });


    $('#main input[id^="people_"]').each(function () {
    });


    $("#tablecontent").find("tr[id^='reg_users_']").each(function () {
        //   console.log("+++++++++++");
        var idid = $(this).find("[class='editablegrid-id']");

        var trid = $(this).closest('td').attr('class');
        var tds = $(this).find("[class^='editablegrid-pg']");
        var ididid;
        var readall = 1;
        //console.log(tds+"+++"+idid.txt);


    })
    var counterrow = 0;
    window.pgvisitArray = [];
    window.pgvisitavg = [];
    window.pgvisittotal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    window.pgvisitread = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    $("[id^='reg_users_']").each(function () {
        //console.log("+++++++++++");
        var readcount = 0;
        var avat = $(this).find("[class^='editablegrid-avata']");

        var avattext = "<img src='img/avatars/" + $(avat).text() + "' alt='' border='3' height='35' width='35' />"

        $(avat).html(avattext);

        console.log('avat' + avat);
        var idid = $(this).find("[class^='number editablegrid-i']");
        var pgVisitTime = $(this).find("[class^='editablegrid-pg']").not(document.getElementsByClassName("editablegrid-pgavg"));
        var ididid;
        var readall = 1;
        idid.each(function (index, item) {
            //    console.log("+++++++++++"+Number($(item).text()))

            ididid = Number($(item).text());
        })


        var totalread = 0;
        var values = [];
        window.pgvisitArray[ididid] = [];
        pgVisitTime.each(function (index, item) {
            var cellVal = Number($(item).text());
            values[index] = "pg" + index;
            window.pgvisitArray[ididid][index] = cellVal;
            if (cellVal < 0.1) {
                readall = 0;

            } else {
                readcount++;
                totalread += cellVal;
                /* if(cellVal>100){
                 cellVal=100;
                 }*/
                window.pgvisittotal[index] += cellVal;
                console.log(window.pgvisittotal)
                window.pgvisitread[index] += 1;
            }


            var minutes = Math.floor(cellVal / 60);

            var seconds = Math.floor(cellVal - minutes * 60);
            if (seconds < 10) {
                seconds = "0" + seconds;

            }
            console.log("cellValB44444 = " + cellVal);

            cellVal = minutes + ":" + seconds;
            console.log("cellVal = " + cellVal);
            $(item).text(cellVal);
        })


        console.log(totalread + "  " + readall)
        updatePgComment(readall, "readall", ididid);
        if (readcount >= 1) {
            var temptime = totalread / readcount;
            var minutes = Math.floor(temptime / 60);

            var seconds = Math.floor(temptime - minutes * 60);
            if (seconds < 10) {
                seconds = "0" + seconds;

            }

            temptime = minutes + ":" + seconds;
            updatePgComment(temptime, "pgavg", ididid);
        }

        counterrow++;
        ;
    })
    for (p = 0; p < pgvisittotal.length; p++) {

        window.pgvisitavg[p] = window.pgvisittotal[p] / window.pgvisitread[p];

    }

    /*    $("[id^='reg_users_']").on('mouseover', function(event) {
     var idid = $(this).find("[class^='number editablegrid-i']");
     var ididid;

     idid.each(function(index, item) {
     //    console.log("+++++++++++"+Number($(item).text()))

     ididid=Number($(item).text());
     })


     var pgVisitTime = $(this).addClass('row-highlight').find("[class^='editablegrid-pg']");
     var mouseNear=  Math.round((event.pageY ) / 30) * 30 + "px"
     $(".ct-chart").css("top",mouseNear)



     var values = [];

     pgVisitTime.each(function(index, item) {


     values[index] = "pg"+index;
     });

     window.valuesch=values;
     if(window.chartt){

     window.chartt.data.series=window.pgvisitArray[ididid];
     window.chartt.data.labels=values;
     window.chartt.update();

     }


     console.log("values = "+ values);
     });*/

    var current = 0,
        $preview = $('#preview'),
        $carouselEl = $('#carousel'),
        $carouselItems = $carouselEl.children(),
        carousel = $carouselEl.elastislide({
            current: current,
            minItems: 4,

            onClick: function (el, pos, evt) {

                changeImage(el, pos);
                evt.preventDefault();


            },
            onReady: function () {

                changeImage($carouselItems.eq(current), current);

            }
        });

    function changeImage(el, pos) {
        $('.elastislide-next').css("display", "block");
        $preview.attr('src', el.data('preview'));
        $carouselItems.removeClass('current-img');
        el.addClass('current-img');
        carousel.setCurrent(pos);
        $('#avatar').val(el.data('preview'));


    }


}
