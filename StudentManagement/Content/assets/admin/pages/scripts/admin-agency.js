(function ($) {
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

    $.fn.loadAgencies = function () {
        var table = $("#tb_agency");

        table.dataTable({

            // Internationalisation. For more info refer to http://datatables.net/manual/i18n
            "language": {
                "sProcessing": "Đang xử lý...",
                "sLengthMenu": "Xem _MENU_ chi nhánh",
                "sZeroRecords": "Không tìm thấy dòng nào phù hợp",
                "sInfo": "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ chi nhánh",
                "sInfoEmpty": "Đang xem 0 đến 0 trong tổng số 0 chi nhánh",
                "sInfoFiltered": "(được lọc từ _MAX_ chi nhánh)",
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

            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
            // So when dropdowns used the scrollable div should be removed. 
            //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",

            "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
            "bSort": true,
            "lengthMenu": [
                [10, 15, 20, -1],
                [10, 15, 20, "Tất cả"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,
            "columnDefs": [{  // set default column settings
                'orderable': false,
                "targets": [4]
            }, {
                "searchable": false,
                "targets": [4]
            }]
        });

        var tableWrapper = jQuery("#tb_agency_wrapper");
        tableWrapper.find(".dataTables_length select").select2(); // initialize select2 dropdown
    },
    $.fn.deleteAgency = function () {
        var actionUrl = this.data("url");
        var agencyId = this.data("agency-id");
        $.get(actionUrl, { agencyId: agencyId }, function (result) {
            if (result === "success") {
                toastr.success(messages.Mg0031);
                // DELETE UI ROW FROM TABLE
                $("#tb_agency").find(`tr[data-agency-id='${agencyId}']`).remove();
            } else {
                toastr.error(messages.Mg0032);
            }
            // HIDE MODAL
            $("#md_agency").modal("hide");

        });
    },
    $.fn.initAgencyEditable = function () {
        $(".address").editable();
        $(".phone").editable();
        $(".fax").editable();
        $.ajax({
            url: $(".manager").data("source-url"),
            dataType: 'json',
            success: function (data) {
                $(".manager").editable({
                    value: $(".manager").data("value"),
                    source: data
                });
            }
        });
    }
})(jQuery);

jQuery(document).ready(function () {
    $("#tb_agency").loadAgencies();

    $(".btn-delete").on("click", function () {
        var agencyId = $(this).data("id");
        // ASSIGN CATEGORY ID TO CONFIRM MODAL
        $("#md_agency button#btn-delete").attr("data-agency-id", agencyId);
    });

    // DELETE CATEGORY WHEN CONFIRM OK
    $("#btn-delete").on("click", function () {
        $(this).deleteAgency();
    });

    // EDITABLE INFORMATION
    $(document).initAgencyEditable();
});