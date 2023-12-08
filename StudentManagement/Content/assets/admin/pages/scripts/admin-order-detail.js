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
    },
    $.fn.loadOrderDetail = function () {
        var table = $('#tb_orderdetail');

        var oTable = table.dataTable({
            // Internationalisation. For more info refer to http://datatables.net/manual/i18n
            "language": {
                "sProcessing": "Đang xử lý...",
                "sLengthMenu": "Xem _MENU_ sản phẩm",
                "sZeroRecords": "Không tìm thấy dòng nào phù hợp",
                "sInfo": "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ sản phẩm",
                "sInfoEmpty": "Đang xem 0 đến 0 trong tổng số 0 sản phẩm",
                "sInfoFiltered": "(được lọc từ _MAX_ sản phẩm)",
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
            "pageLength": 10,
            "columnDefs": [{  // set default column settings
                'orderable': false,
                'targets': [7]
            }, {
                "searchable": false,
                "targets": [7]
            }]
        });

        var tableWrapper = $("#tb_orderdetail_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown
    },
    $.fn.initBillingForm = function () {
        $("#BillingFirstName").editable();
        $("#BillingLastName").editable();
        $("#BillingAddress").editable();
        $("#BillingPhone").editable();
    },
    $.fn.initShippingForm = function () {
        $("#ShippingFirstName").editable();
        $("#ShippingLastName").editable();
        $("#ShippingAddress").editable();
        $("#ShippingPhone").editable();
        $("#Description").editable();
    },
    $.fn.deleteOrderDetail = function () {
        var actionUrl = this.data("url");
        var orderDetailId = this.data("order-detail-id");
        $.get(actionUrl, { orderDetailId: orderDetailId }, function (result) {
            if (result === "success") {
                toastr.success(messages.Mg0021);
                // DELETE UI ROW FROM TABLE
                $("#tb_order").find(`tr[data-order-detail-id='${orderDetailId}']`).remove();
            } else {
                toastr.error(messages.Mg0022);
            }
            // HIDE MODAL
            $("#md_deleteOderDetail").modal("hide");
        });
    }
})(jQuery);

$(document).ready(function () {
    $("#tb_orderdetail").loadOrderDetail();

    // EDITABLE BILLING FORM
    $(document).initBillingForm();
    // EDITABLE SHIPPING FORM
    $(document).initShippingForm();
    // CHANGE STAUS ORDER
    var selectedValue = $("#Status").find("label").text();
    $("#Status").editable({
        value: selectedValue,
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

    $('.btn-delete').on('click', function () {
        var orderDetailId = $(this).data("id");
        // ASSIGN CATEGORY ID TO CONFIRM MODAL
        $("#md_deleteOrderDetail button#btn-delete").attr("data-order-detail-id", orderDetailId);
    });

    // DELETE ORDER DETAIL WHEN CONFIRM OK
    $("#btn-delete").on("click", function () {
        $(this).deleteOrderDetail();
    });
});