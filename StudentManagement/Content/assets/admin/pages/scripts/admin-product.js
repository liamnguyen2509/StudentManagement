var PRODUCT = {
    current_action: '',
    url_list: '',
    url_edit: '',
    url_make_product_hot: '',
    url_create: '',
    url_delete: '',
    id_delete: 0,
    datatable: {},
    language_labels: {
        btn_edit: '',
        btn_delete: ''
    },
    init_page: function () {
        PRODUCT.load_list_content();
    },
    load_list_content: function () {

        PRODUCT.datatable = $("#tb_product").DataTable({
            createdRow: function (row, full, dataIndex) {
                $(row).attr('data-product-id', full.Id);
            },
            "language": {
                url: "//cdn.datatables.net/plug-ins/1.10.19/i18n/Vietnamese.json"
            },
            "pagingType": "full_numbers",
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": PRODUCT.url_list,
                "type": "POST",
                "complete": function () {
                    PRODUCT.init_list_action();
                }
            },
            "columns": [
                {
                    "data": "Image",
                    "render": function (data, type, full, meta) {
                        return '<img src="' + full.Image + '" style="width: 60px; height: 60px;" class="img-responsive" alt="' + full.Image + '"/></td>';
                    }
                },
                {
                    "data": "Name",
                    "render": function (data, type, full, meta) {

                        var editUrl = PRODUCT.url_edit + '/' + full.Id;
                        return '<a href="' + editUrl + '">' + full.Name + '</a>';
                    }
                },
                { "data": "Code" },
                { "data": "CategoriesString" },
                { "data": "Price" },
                { "data": "DiscountedPrice" },
                {
                    "render": function (data, type, full, meta) {
                        var newButton = '<span class="label label-sm label-success">Mới</span>';
                        var saleButton = '<span class="label label-sm label-info">Sale</span>';
                        if (full.IsNew === true) {
                            return newButton;
                        }
                        if (full.IsSale === true) {
                            return saleButton;
                        }
                        return "";
                    }
                },
                {
                    "data": "IsBest",
                    "render": function (data, type, full, meta) {
                        var hotIcon = '<i class="btn-hot-product fa fa-star" style="color: green; cursor: pointer" data-product-id="' + full.Id + '" data-product-hot-url="' + PRODUCT.url_make_product_hot + '"></i>';
                        var defaultIcon = '<i class="btn-hot-product fa fa-star-o" style="cursor: pointer" data-product-id="' + full.Id + '" data-product-hot-url="' + PRODUCT.url_make_product_hot + '"></i>';
                        if (full.IsBest) {
                            return hotIcon;
                        } else {
                            return defaultIcon;
                        }
                    }
                },
                {
                    "data": "Id",
                    "render": function (data, type, full, meta) {
                        var activeTitle = full.IsActive ? 'Ẩn' : 'Hiển thị';
                        var activeColor = full.IsActive ? 'btn-deactive red' : 'btn-active blue';
                        var activeIcon = full.IsActive ? 'fa fa-eye-slash' : 'fa fa-eye';
                        var editButton = '<a href="' + PRODUCT.url_edit + '/' + full.Id + '" class="btn default btn-xs purple"><i class="fa fa-edit"></i> Sửa</a>';
                        var deleteButton = '<a data-id="' + full.Id + '" onclick="PRODUCT.show_comfirm_delete(' + full.Id + ')" class="btn default btn-xs black btn-delete"><i class="fa fa-trash"></i> Xóa</a>';
                        var activeButton = '<a id="btn-active-' + full.Id + '" data-id="' + full.Id + '" onclick="PRODUCT.show_comfirm_AcDetive(' + full.Id + ')" title="' + activeTitle + '" class="btn default btn-xs ' + activeColor + '" data-toggle="modal" data-target="#md_product_active"><i class="' + activeIcon + '"></i></a>';

                        return editButton + deleteButton + activeButton;
                    }
                }
            ],
            "bStateSave": false, // save datatable state(pagination, sort, etc) in cookie.
            "lengthMenu": [
                [10, 15, 20, -1],
                [10, 15, 20, "Tất Cả"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,
            "columnDefs": [{  // set default column settings
                'orderable': false,
                'targets': [0, 7, 8]
            }, {
                "searchable": false,
                "targets": [0, 7, 8]
            }],
            "initComplete": function (settings, json) {
                $("#tb_product").on('page', function () {
                    alert("aaaaa");
                });
            }
        });
    },
    init_list_action: function () {
        // DELETE PRODUCT WHEN CONFIRM OK
        $("#btn-delete").off('click');
        $("#btn-delete").on("click", function (e) {
            e.preventDefault();
            var actionUrl = PRODUCT.url_delete;
            var productId = parseInt($(this).attr("data-product-id"));
            $.get(actionUrl, { productId: productId }, function (result) {
                if (result === 'success') {
                    toastr.success(messages.Mg0009);
                    // DELETE UI ROW FROM TABLE
                    $("#tb_product").find(`tr[data-product-id='${productId}']`).remove();
                } else {
                    toastr.error(messages.Mg0015);
                }
                // HIDE MODAL
                $("#md_product").modal("hide");
            });
        });

        $("#btn-active").on("click", function () {
            var element = $(this);
            PRODUCT.activeProduct(element);
        });

        $('.btn-active').on('click', function () {
            var productId = $(this).data("id");
            // ASSIGN PRODUCT ID TO CONFIRM MODAL
            $("#md_product_active button#btn-active").attr("data-product-id", productId);
            $("#md_product_active .modal-body p").html('Bạn có muốn hiển thị sản phẩm này?');

        });

        $(".btn-hot-product").on("click", function () {
            PRODUCT.makeProductToHot(this);
        });
    },
    makeProductToHot: function (da) {
        var icon = $(da);
        var actionUrl = icon.data("product-hot-url");
        var productId = icon.data("product-id");
        $.post(actionUrl, { productId: productId }, function (data) {
            icon.removeClass();
            icon.addClass(data.Class);
            icon.css("color", data.Color);
        });
    },
    show_comfirm_delete: function (productId) {

        // ASSIGN CATEGORY ID TO CONFIRM MODAL
        $("#md_product button#btn-delete").attr("data-product-id", productId);
        // SHOW MODAL
        $("#md_product").modal("show");
    },
    activeProduct: function (ele) {

        var actionUrl = ele.attr("data-url");
        var productId = ele.attr("data-product-id");
        var btnActiveOrDeactive = $(`a#btn-active-${productId}`);
        var buttonIsInStateActive = btnActiveOrDeactive.hasClass("btn-active");
        $.get(actionUrl, { productId: productId }, function (result) {
            if (result === "success") {
                if (buttonIsInStateActive === true) {
                    // ADD CLASS ACTIVE TO BUTTON
                    btnActiveOrDeactive.removeClass("btn-active").removeClass("blue");
                    btnActiveOrDeactive.addClass("btn-deactive").addClass("red");
                    // CHANGE ICON TO ACTIVE
                    btnActiveOrDeactive.children("i").removeClass("fa-eye").addClass("fa-eye-slash");
                    // SHOW MESS
                    toastr.success("Sản phẩm đã được ẩn trên cửa hàng");
                } else {
                    // ADD CLASS ACTIVE TO BUTTON
                    btnActiveOrDeactive.removeClass("btn-deactive").removeClass("red");
                    btnActiveOrDeactive.addClass("btn-active").addClass("blue");
                    // CHANGE ICON TO ACTIVE
                    btnActiveOrDeactive.children("i").removeClass("fa-eye-slash").addClass("fa-eye");
                    // SHOW MESS
                    toastr.success("Sản phẩm đã được hiển thị trên cửa hàng");

                }
            } else {
                toastr.error("Sản Phẩm được cập nhật không thành công");
            }
            // HIDE MODAL
            $("#md_product_active").modal("hide");
        });
    },
    show_comfirm_AcDetive: function (productId) {

        // ASSIGN PRODUCT ID TO CONFIRM MODAL
        $("#md_product_active button#btn-active").attr("data-product-id", productId);
        $("#md_product_active .modal-body p").html('Bạn có muốn ẩn sản phẩm này?');
    },
}