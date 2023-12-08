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
    };

    $.fn.loadOrders = function () {
        var table = $('#tb_order');

        table.dataTable({
            // Internationalisation. For more info refer to http://datatables.net/manual/i18n
            "language": {
                "sProcessing": "Đang xử lý...",
                "sLengthMenu": "Xem _MENU_ đơn hàng",
                "sZeroRecords": "Không tìm thấy dòng nào phù hợp",
                "sInfo": "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ đơn hàng",
                "sInfoEmpty": "Đang xem 0 đến 0 trong tổng số 0 đơn hàng",
                "sInfoFiltered": "(được lọc từ _MAX_ đơn hàng)",
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

            "bStateSave": false, // save datatable state(pagination, sort, etc) in cookie.

            "lengthMenu": [
                [10, 15, 20, -1],
                [10, 15, 20, "Tất Cả"] // change per page values here
            ],
            // set the initial value
            "order": [[0, "desc"]],
            "pageLength": 10,
            "columnDefs": [{  // set default column settings
                'orderable': false,
                'targets': [7]
            }, {
                "searchable": false,
                "targets": [7]
                }],
            "initComplete": function (settings, json) {
                $(document).initOrderEditable();
                $('.btn-delete').on('click', function () {
                    var orderId = $(this).attr("data-id");
                    // ASSIGN ORDER ID TO CONFIRM MODAL
                    $("#btn-delete-confirm").attr("data-order-id", orderId);
                });
            },
            "drawCallback": function (settings) {
                $('.btn-delete').on('click', function () {
                    var orderId = $(this).attr("data-id");
                    // ASSIGN ORDER ID TO CONFIRM MODAL
                    $("#btn-delete-confirm").attr("data-order-id", orderId);
                });
            }
        });

        var tableWrapper = jQuery('#tb_order_wrapper');

        tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
    },
        $.fn.deleteOrder = function () {
            var actionUrl = this.data("url");
            var orderId = this.data("order-id");
            $.get(actionUrl, { orderId: orderId }, function (result) {
                if (result === "success") {
                    toastr.success(messages.Mg0016);
                    // DELETE UI ROW FROM TABLE
                    $("#tb_order").find(`tr[data-order-id='${orderId}']`).remove();
                } else {
                    toastr.error(messages.Mg0017);
                }
                // HIDE MODAL
                $("#md_order").modal("hide");
            });
        },
        $.fn.initOrderEditable = function () {
            $(".billingFirstName").editable();
            $(".billingLastName").editable();
            $(".shippingFirstName").editable();
            $(".shippingLastName").editable();
            $(".shippingAddress").editable();
            // DROPDOWN ORDER STATUS
            $(".orderStatus").each(function (i) {
                var orderStatus = $(this).find("label").data("value");
                $(this).editable({
                    value: orderStatus,
                    source: [
                        { value: "Đang xử lý", text: "Đang xử lý" },
                        { value: "Đã xác nhận", text: "Đã xác nhận" },
                        { value: "Đã chuyển hàng", text: "Đã chuyển hàng" },
                        { value: "Đã thanh toán", text: "Đã thanh toán" },
                        { value: "Hủy", text: "Hủy" }
                    ],
                    display: function (response) {
                        if (response === "Hủy") {
                            $(this).html($("<label>", { value: response, text: response }).attr("class", "label label-danger").css("cursor", "pointer"));
                        } else {
                            $(this).html($("<label>", { value: response, text: response }).attr("class", "label label-info").css("cursor", "pointer"));
                        }
                        return response;
                    }
                });
            });
        }
})(jQuery);

jQuery(document).ready(function () {
    // LOAD LIST ORDERS
    $('#tb_order').loadOrders();

    // DELETE ORDER WHEN CONFIRM OK
    $("#btn-delete-confirm").on("click", function () {
        $(this).deleteOrder();
    });
});