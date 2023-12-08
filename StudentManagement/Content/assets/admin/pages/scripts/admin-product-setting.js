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
    $.fn.deleteColor = function() {
        var actionUrl = this.data("url");
        var colorId = this.data("color-id");
        $.get(actionUrl, { colorId: colorId }, function (result) {
            if (result === "success") {
                toastr.success(messages.Mg0023);
                // DELETE UI ROW FROM TABLE
                $("#tb_color").find(`tr[data-color-id='${colorId}']`).remove();
            } else {
                toastr.error(messages.Mg0024);
            }
            // HIDE MODAL
            $("#md_color").modal("hide");
        });
    },
    $.fn.deleteSize = function() {
        var actionUrl = this.data("url");
        var sizeId = this.data("size-id");
        $.get(actionUrl, { sizeId: sizeId }, function (result) {
            if (result === "success") {
                toastr.success(messages.Mg0025);
                // DELETE UI ROW FROM TABLE
                $("#tb_size").find(`tr[data-size-id='${sizeId}']`).remove();
            } else {
                toastr.error(messages.Mg0026);
            }
            // HIDE MODAL
            $("#md_size").modal("hide");
        });
    }
})(jQuery);

jQuery(document).ready(function () {
    // DELETE COLOR
    $(".btn-delete-color").on('click', function () {
        var colorId = $(this).data("id");
        // ASSIGN COLOR ID TO CONFIRM MODAL
        $("#md_color button.btn-delete-color").attr("data-color-id", colorId);
    });
    // DELETE COLOR WHEN CONFIRM OK
    $("#md_color button.btn-delete-color").on("click", function () {
        $(this).deleteColor();
    });

    // DELETE SIZE
    $(".btn-delete-size").on('click', function () {
        var sizeId = $(this).data("id");
        // ASSIGN COLOR ID TO CONFIRM MODAL
        $("#md_size button.btn-delete-size").attr("data-size-id", sizeId);
    });
    // DELETE COLOR WHEN CONFIRM OK
    $("#md_size button.btn-delete-size").on("click", function () {
        $(this).deleteSize();
    });
});