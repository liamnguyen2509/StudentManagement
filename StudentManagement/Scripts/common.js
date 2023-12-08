let COMMON = {
    format_datetime_datatable: function (value) {
        let date = new Date(value);
        let day = date.getDate() <= 10 ? "0" + date.getDate() : "" + date.getDate();
        let month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : "" + (date.getMonth() + 1);
        return day + "/" + month + "/" + date.getFullYear();
    },
    call_ajax: function (data) {
        if (!(data.url && data.success)) {
            console.log('ajax is not valid.');
            return;
        }

        $.ajax({
            url: data.url,
            type: data.type ? data.type : 'GET',
            data: data.data ? data.data : null,
            dataType: data.dataType ? data.dataType : 'text',
            beforeSend: function () {
                $("#spinner-loading").show();
            },
            complete: function () {
                $("#spinner-loading").hide();
            },
            success: data.success,
            error: data.error
        })
    },
    call_ajax_upload_file: function (data) {
        if (!(data.url && data.success)) {
            console.log('ajax is not valid.');
            return;
        }

        $.ajax({
            url: data.url,
            type: data.type ? data.type : 'GET',
            data: data.data ? data.data : null,
            dataType: data.dataType ? data.dataType : 'text',
            processData: false,
            contentType: false,
            beforeSend: function () {
                $("#spinner-loading").show();
            },
            complete: function () {
                $("#spinner-loading").hide();
            },
            success: data.success,
            error: data.error
        });
    },
    format_money: function (num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
};

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

