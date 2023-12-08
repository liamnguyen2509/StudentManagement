var TableManaged = function () {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-bottom-right",
        "onclick": null,
        "showDuration": "1000",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    // EDIT TABLE ACTION
    function restoreRow(oTable, nRow) {
        var aData = oTable.fnGetData(nRow);
        var jqTds = $('>td', nRow);
        $("span.total").html(aData[4]);
        for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
            oTable.fnUpdate(aData[i], nRow, i, false);
        }

        oTable.fnDraw();
    }

    function editRow(oTable, nRow) {
        var aData = oTable.fnGetData(nRow);
        var jqTds = $('>td', nRow);
        jqTds[0].innerHTML = aData[0];
        jqTds[1].innerHTML = aData[1];
        jqTds[2].innerHTML = aData[2];
        jqTds[3].innerHTML = '<input type="number" name="quantity" class="form-control input-small quantity" maxlength="2" value="' + aData[3] + '">';
        jqTds[4].innerHTML = '<input type="text" class="form-control input-small total" value="' + aData[4] + '" disabled="disabled">';
        jqTds[5].innerHTML = '<a href="javascript:;" class="btn default btn-xs blue edit"><i class="fa fa-edit"></i> Cập Nhật</a>' +
                                '<a href="javascript:;" class="btn default btn-xs purple cancel"><i class="fa fa-edit"></i> Thoát</a>';
    }

    function saveRow(oTable, nRow) {
        var aData = oTable.fnGetData(nRow);
        var jqInputs = $('input', nRow);
        oTable.fnUpdate(jqInputs[0].value, nRow, 3, false);
        oTable.fnUpdate(jqInputs[1].value, nRow, 4, false);
        oTable.fnUpdate('<a href="javascript:;" class="btn default btn-xs purple edit"><i class="fa fa-edit"></i> Sửa</a>' +
            '<a href="javascript:;" class="btn default btn-xs black delete"><i class="fa fa-edit"></i> Xóa</a>', nRow, 5, false);
        oTable.fnDraw();
        $.ajax({
            url: '/Admin/Order/UpdateDetail/' + aData[0],
            method: 'POST',
            data: { quantity: jqInputs[0].value },
            success: function () {
                location.reload();
                toastr["success"]("Cập Nhật Thành Công", "");
            },
            error: function () {
                restoreRow(oTable, nRow);
                toastr["error"]("Cập Nhật Không Thành Công", "");
            }
        });

    }

    function deleteRow(oTable, nRow) {
        var aData = oTable.fnGetData(nRow);
        $.ajax({
            url: '/Admin/Order/DeleteDetail/' + aData[0],
            method: 'POST',
            success: function () {
                location.reload();
                oTable.fnDeleteRow(nRow);
            },
            error: function () {
            }
        });
    }

    function cancelEditRow(oTable, nRow) {
        var jqInputs = $('input', nRow);
        oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
        oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
        oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
        oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
        oTable.fnUpdate('<a class="edit" href="">Edit</a>', nRow, 4, false);
        oTable.fnDraw();
    }

    // EDIT ORDER TABLE
    var initTableOrderDetail = function () {

        var table = $('#tb_orderdetail');

        var oTable = table.dataTable({
            // Internationalisation. For more info refer to http://datatables.net/manual/i18n
            "language": {
                "sProcessing": "Đang xử lý...",
                "sLengthMenu": "Xem _MENU_ mục",
                "sZeroRecords": "Không tìm thấy dòng nào phù hợp",
                "sInfo": "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
                "sInfoEmpty": "Đang xem 0 đến 0 trong tổng số 0 mục",
                "sInfoFiltered": "(được lọc từ _MAX_ mục)",
                "sInfoPostFix": "",
                "sSearch": "Tìm:",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "Đầu",
                    "sPrevious": "Trước",
                    "sNext": "Tiếp",
                    "sLast": "Cuối"
                }
            },

            "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.

            "lengthMenu": [
                [10, 15, 20, -1],
                [10, 15, 20, "Tất Cả"] // change per page values here
            ],
            // set the initial value
            "pageLength": 5,
            "columnDefs": [{  // set default column settings
                'orderable': false,
                'targets': [5]
            }, {
                "searchable": false,
                "targets": [5]
            }]
        });

        var tableWrapper = $("#tb_orderdetail");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;
        table.on('click', '.delete', function (e) {
            e.preventDefault();

            if (confirm("Bạn có muốn xóa ?") === false) {
                return;
            }

            var nRow = $(this).parents('tr')[0];
            deleteRow(oTable, nRow);
        });

        table.on('click', '.cancel', function (e) {
            e.preventDefault();
            if (nNew) {
                oTable.fnDeleteRow(nEditing);
                nEditing = null;
                nNew = false;
            } else {
                restoreRow(oTable, nEditing);
                nEditing = null;
            }
        });

        table.on('click', '.edit', function (e) {
            e.preventDefault();

            /* Get the row as a parent of the link that was clicked on */
            var nRow = $(this).parents('tr')[0];

            if (nEditing !== null && nEditing !== nRow) {
                /* Currently editing - but not this row - restore the old before continuing to edit mode */
                restoreRow(oTable, nEditing);
                editRow(oTable, nRow);
                nEditing = nRow;
            } else if (nEditing === nRow && this.innerText === " Cập Nhật") {
                /* Editing this row and want to save it */
                saveRow(oTable, nEditing);
                nEditing = null;
            } else {
                /* No edit in progress - let's start one */
                editRow(oTable, nRow);
                nEditing = nRow;
            }
        });

        table.on('keyup',
            '.quantity',
            function (e) {
                e.preventDefault();
                var quantity = $(this).val();
                /* Get the row as a parent of the link that was clicked on */
                var nRow = $(this).parents('tr')[0];
                var aData = oTable.fnGetData(nRow);
                var total = parseInt(quantity) * parseInt(aData[2]);
                $(".total").val(total);
                $("span.total").html(total);
            });
    }

    return {

        //main function to initiate the module
        init: function () {
            if (!jQuery().dataTable) {
                return;
            }

            initTableCategory();
            initTableProduct();
            initTableOrder();
            initTableOrderDetail();
        }

    };

}();