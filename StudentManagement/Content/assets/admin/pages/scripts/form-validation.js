// advance validation
var categoryValidation = function () {
    // for more info visit the official plugin documentation: 
    // http://docs.jquery.com/Plugins/Validation

    var addForm = $('#fm_addCategory');
    var editForm = $('#fm_editCategory');

    addForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            Name: {
                maxlength: 20,
                required: true
            }
        },

        messages: { // custom messages for radio buttons and checkboxes
            Name: {
                required: "Hãy điền tên danh mục"
            }
        },

        highlight: function (element) { // hightlight error inputs
            $(element)
                 .closest('.form-group').addClass('has-error'); // set error class to the control group
        },

        unhighlight: function (element) { // revert the change done by hightlight
            $(element)
                .closest('.form-group').removeClass('has-error'); // set error class to the control group
        },

        success: function (label) {
            label
                .closest('.form-group').removeClass('has-error'); // set success class to the control group
        }
    });

    editForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            Name: {
                maxlength: 20,
                required: true
            }
        },

        messages: { // custom messages for radio buttons and checkboxes
            Name: {
                required: "Hãy điền tên danh mục"
            }
        },

        highlight: function (element) { // hightlight error inputs
            $(element)
                 .closest('.form-group').addClass('has-error'); // set error class to the control group
        },

        unhighlight: function (element) { // revert the change done by hightlight
            $(element)
                .closest('.form-group').removeClass('has-error'); // set error class to the control group
        },

        success: function (label) {
            label
                .closest('.form-group').removeClass('has-error'); // set success class to the control group
        }
    });
}

var productValidation = function () {
    // for more info visit the official plugin documentation: 
    // http://docs.jquery.com/Plugins/Validation

    var addForm = $('#fm_addProduct');
    var editForm = $('#fm_editProduct');

    addForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        rules: {
            Name: {
                maxlength: 50,
                required: true
            },
            Code: {
                maxlength: 15,
                required: true
            },
            image: {
                required: true
            },
            Price: {
                required: true
            },
            CategoryId: {
                required: true
            }
        },

        messages: { // custom messages for radio buttons and checkboxes
            Name: {
                required: "Hãy điền tên sản phẩm"
            },
            Code: {
                required: "Hãy điền mã sản phẩm"
            },
            image: {
                required: "Hãy chọn ảnh đại diện sản phẩm"
            },
            Price: {
                required: "Hãy điền giá sản phẩm"
            },
            CategoryId: {
                required: "Hãy chọn danh mục cho sản phẩm"
            }
        },

        highlight: function (element) { // hightlight error inputs
            $(element)
                 .closest('.form-group').addClass('has-error'); // set error class to the control group
        },

        unhighlight: function (element) { // revert the change done by hightlight
            $(element)
                .closest('.form-group').removeClass('has-error'); // set error class to the control group
        },

        success: function (label) {
            label
                .closest('.form-group').removeClass('has-error'); // set success class to the control group
        }
    });

    editForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: true, // do not focus the last invalid input
        rules: {
            Name: {
                maxlength: 50,
                required: true
            },
            Code: {
                maxlength: 15,
                required: true
            },
            Price: {
                required: true
            },
            CategoryId: {
                required: true
            }
        },
        messages: { // custom messages for radio buttons and checkboxes
            Name: {
                required: "Hãy điền tên sản phẩm"
            },
            Code: {
                required: "Hãy điền mã sản phẩm"
            },
            Price: {
                required: "Hãy điền giá sản phẩm"
            },
            CategoryId: {
                required: "Hãy chọn danh mục cho sản phẩm"
            }
        },
        highlight: function (element) { // hightlight error inputs
            $(element)
                 .closest('.form-group').addClass('has-error'); // set error class to the control group
        },
        unhighlight: function (element) { // revert the change done by hightlight
            $(element)
                .closest('.form-group').removeClass('has-error'); // set error class to the control group
        },
        success: function (label) {
            label
                .closest('.form-group').removeClass('has-error'); // set success class to the control group
        }
    });
}

var addressValidation = function () {
    var form = $("#fm_address");
    form.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        rules: {
            FirstName: {
                maxlength: 20,
                required: true
            },
            LastName: {
                maxlength: 30,
                required: true
            },
            Address: {
                maxlength: 100,
                required: true
            },
            City: {
                maxlength: 20,
                required: true
            },
            State: {
                maxlength: 20,
                required: true
            },
            PostalCode: {
                maxlength: 10,
                required: true
            },
            Phone: {
                maxlength: 12,
                number: true,
                required: true
            }
        },
        messages: { // custom messages for radio buttons and checkboxes
            FirstName: {
                required: "Hãy điền tên"
            },
            LastName: {
                required: "Hãy điền Họ"
            },
            Address: {
                required: "Hãy điền địa chỉ"
            },
            City: {
                required: "Hãy điền tên thành phố"
            },
            State: {
                required: "Hãy điền tên tỉnh hoặc tiểu bang"
            },
            PostalCode: {
                required: "Hãy điền mã bưu điện"
            },
            Phone: {
                required: "Hãy điền số điện thoại",
                number: "Chỉ được điền số"
            }
        },
        highlight: function (element) { // hightlight error inputs
            $(element)
                 .closest('.form-group').addClass('has-error'); // set error class to the control group
        },
        unhighlight: function (element) { // revert the change done by hightlight
            $(element)
                .closest('.form-group').removeClass('has-error'); // set error class to the control group
        },
        success: function (label) {
            label
                .closest('.form-group').removeClass('has-error'); // set success class to the control group
        }
    });
}

var handleWysihtml5 = function () {
    if (!jQuery().wysihtml5) {

        return;
    }

    if ($('.wysihtml5').size() > 0) {
        $('.wysihtml5').wysihtml5({
            "stylesheets": ["../../assets/global/plugins/bootstrap-wysihtml5/wysiwyg-color.css"]
        });
    }
}

var settingValidation = function () {
    // for more info visit the official plugin documentation: 
    // http://docs.jquery.com/Plugins/Validation

    var editForm = $('#fm_setting');

    editForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: true, // do not focus the last invalid input
        rules: {
            Name: {
                maxlength: 50,
                required: true
            },
            Code: {
                maxlength: 15,
                required: true
            },
            image: {
                required: true
            },
            Price: {
                required: true,
                number: true
            },
            CategoryId: {
                required: true
            }
        },
        messages: { // custom messages for radio buttons and checkboxes
            Name: {
                required: "Hãy điền tên sản phẩm"
            },
            Code: {
                required: "Hãy điền mã sản phẩm"
            },
            image: {
                required: "Hãy chọn ảnh đại diện sản phẩm"
            },
            Price: {
                required: "Hãy điền giá sản phẩm"
            },
            CategoryId: {
                required: "Hãy chọn danh mục cho sản phẩm"
            }
        },
        highlight: function (element) { // hightlight error inputs
            $(element)
                 .closest('.form-group').addClass('has-error'); // set error class to the control group
        },
        unhighlight: function (element) { // revert the change done by hightlight
            $(element)
                .closest('.form-group').removeClass('has-error'); // set error class to the control group
        },
        success: function (label) {
            label
                .closest('.form-group').removeClass('has-error'); // set success class to the control group
        }
    });
}

var agencyValidation = function() {
    var addForm = $('#fm_addAgency');
    addForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "", // validate all fields including form hidden input
        rules: {
            Address: {
                maxlength: 200,
                required: true
            },
            ManagerId: {
                required: true
            }
        },

        messages: { // custom messages for radio buttons and checkboxes
            Address: {
                required: "Hãy điền địa chỉ chi nhánh"
            },
            ManagerId: {
                required: "Hãy chọn quản lý của chi nhánh"
            }
        },

        highlight: function (element) { // hightlight error inputs
            $(element)
                .closest('.form-group').addClass('has-error'); // set error class to the control group
        },

        unhighlight: function (element) { // revert the change done by hightlight
            $(element)
                .closest('.form-group').removeClass('has-error'); // set error class to the control group
        },

        success: function (label) {
            label
                .closest('.form-group').removeClass('has-error'); // set success class to the control group
        }
    });
}