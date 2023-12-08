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

    $.fn.loadCategories = function () {
        var table = $("#tb_category");

        table.dataTable({

            // Internationalisation. For more info refer to http://datatables.net/manual/i18n
            "language": {
                "sProcessing": "Đang xử lý...",
                "sLengthMenu": "Xem _MENU_ danh mục",
                "sZeroRecords": "Không tìm thấy dòng nào phù hợp",
                "sInfo": "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ danh mục",
                "sInfoEmpty": "Đang xem 0 đến 0 trong tổng số 0 danh mục",
                "sInfoFiltered": "(được lọc từ _MAX_ danh mục)",
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
            "bSort" : false,
            "lengthMenu": [
                [10, 15, 20, -1],
                [10, 15, 20, "Tất cả"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,
            "columnDefs": [{  // set default column settings
                'orderable': false
            }, {
                "searchable": false,
                "targets": [2]
            }]
        });

        var tableWrapper = jQuery("#tb_category_wrapper");

        table.find(".group-checkable").change(function () {
            var set = jQuery(this).attr("data-set");
            var checked = jQuery(this).is(":checked");
            jQuery(set).each(function () {
                if (checked) {
                    $(this).attr("checked", true);
                } else {
                    $(this).attr("checked", false);
                }
            });
            jQuery.uniform.update(set);
        });

        tableWrapper.find(".dataTables_length select").select2(); // initialize select2 dropdown
    },
    $.fn.deleteCategory = function () {
        var actionUrl = this.data("url");
        var categoryId = this.data("category-id");
        $.get(actionUrl, { categoryId: categoryId }, function(result) {
            if (result === "success") {
                toastr.success(messages.Mg0004);
                // DELETE UI ROW FROM TABLE
                $("#tb_category").find(`tr[data-category-id='${categoryId}']`).remove();
            } else {
                toastr.error(messages.Mg0012);
            }
            // HIDE MODAL
            $("#md_category").modal("hide");
            
        });
    }
})(jQuery);

jQuery(document).ready(function () {
    $("#tb_category").loadCategories();

    $(".btn-delete").off().on("click", function () {
        var cateId = $(this).data("id");
        // ASSIGN CATEGORY ID TO CONFIRM MODAL
        $("#md_category button#btn-delete").attr("data-category-id", cateId);
    });

    // DELETE CATEGORY WHEN CONFIRM OK
    $("#btn-delete").on("click", function () {
        $(this).deleteCategory();
    });
});