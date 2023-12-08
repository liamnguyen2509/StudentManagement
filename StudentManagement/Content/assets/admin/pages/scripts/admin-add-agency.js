jQuery(document).ready(function () {
    agencyValidation();
    // LOAD LIST USER
    var actionUrl = $("#userList").data("url");
    $("#userList").select2({
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
        placeholder: 'Chọn Nhân Viên',
        allowClear: true
    });
});