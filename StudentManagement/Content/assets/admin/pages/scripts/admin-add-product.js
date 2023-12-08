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
    $.fn.loadCategoriesDropDown = function () {
        // LOAD CATEGORIES DROPDOWN
        var categoryActionUrl = $("#select2_category").data("url");
        $('#select2_category').select2({
            ajax: {
                url: categoryActionUrl,
                dataType: 'json',
                type: "GET",
                processResults: function (data) {
                    return {
                        results: data
                    };
                }
            },
            placeholder: 'Chọn Danh mục',
            multiple: true,
            allowClear: true,
            minimumResultsForSearch: 3
        });
    },
    $.fn.loadColorsDropDown = function () {
        // LOAD COLORS DROPDOWN
        var colorActionUrl = $("#select2_color").data("url");
        $('#select2_color').select2({
            ajax: {
                url: colorActionUrl,
                dataType: 'json',
                type: "GET",
                processResults: function (data) {
                    return {
                        results: data
                    };
                }
            },
            placeholder: 'Chọn màu',
            multiple: true,
            allowClear: true,
            minimumResultsForSearch: 3,
            templateResult: function (d) { return $(d.text); },
            templateSelection: function (d) { return $(d.text); }
        });
    },
    $.fn.loadSizesDropDown = function () {
        // LOAD SIZE DROP DOWN
        var sizeActionUrl = $("#select2_size").data("url");
        $('#select2_size').select2({
            ajax: {
                url: sizeActionUrl,
                dataType: 'json',
                type: "GET",
                processResults: function (data) {
                    return {
                        results: data
                    };
                }
            },
            placeholder: 'Chọn kích thước',
            multiple: true,
            allowClear: true,
            minimumResultsForSearch: Infinity
        });
    },
    $.fn.loadRelatedProductsDropDown = function () {
        var actionUrl = $("#select2_product").data("url");
        $('#select2_product').select2({
            ajax: {
                url: actionUrl,
                dataType: 'json',
                type: "GET",
                processResults: function (data) {
                    return {
                        results: data
                    };
                }
            },
            placeholder: 'Chọn sản phẩm liên quan',
            multiple: true,
            allowClear: true,
            minimumResultsForSearch: Infinity
        });
    }
})(jQuery);

jQuery(document).ready(function () {
    FormiCheck.init(); // init page demo
    ComponentsEditors.init();
    $('#select2_category').loadCategoriesDropDown();
    $('#select2_color').loadColorsDropDown();
    $('#select2_size').loadSizesDropDown();
    $('#select2_product').loadRelatedProductsDropDown();

    $(".fancybox-button").fancybox();
    productValidation();

    $(".mask_currency").inputmask('VNĐ 999.999.999', {
        numericInput: true
    });
    $("input[name=Code]").on('change', function () {
        EcommerceProductsEdit.init($(this).val());
    });
    $("input[name=Name]").on('change', function () {
        var text = $(this).val();
        var textCreate = text.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a").replace(/\ /g, '-').replace(/đ/g, "d").replace(/đ/g, "d").replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y").replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u").replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ.+/g, "o").replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ.+/g, "e").replace(/ì|í|ị|ỉ|ĩ/g, "i");
        $('input[name=FriendlyName]').val(textCreate);
    });

    $("#tab_images_uploader_uploadfiles").on("click", function () {
        // ACTIVE SAVE BUTTON
        $(".btn-save").removeAttr("disabled");
    });
});