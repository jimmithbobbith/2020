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

    $('.editablegrid-action').click(function(){

        $(this).nextUntil('editablegrid-id').slideToggle(1000);
    });
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
//$("[class^='editablegrid-pg']").wrap(document.createElement("tr"));

$(('.editablegrid-action').nextUntil('tr.editablegrid-id')).wrapAll(document.createElement("tr"));
