const STUDENTS = {
    url_index: '',
    url_list: '',
    url_register: '',
    url_edit: '',
    datatable: {},
    init_page: function () {
        STUDENTS.init_list();
    },
    init_list: function () {
        STUDENTS.datatable = $("#tb_students").DataTable({
            "pagingType": "full_numbers",
            "processing": true,
            "serverSide": true,
            "ordering": false,
            "ajax": {
                "url": STUDENTS.url_list,
                "type": "POST",
                "complete": function () {
                    
                }
            },
            "columns": [
                { "data": "SN" },
                {
                    "data": "NRIC",
                    "render": function (data, type, full, meta) {

                        let editUrl = `${STUDENTS.url_edit}/${full.StudentId}`;
                        return `<a href="${editUrl}">${data}</a>`;
                    }
                },
                { "data": "StudentName" },
                { "data": "Gender" },
                { "data": "Age" },
                { "data": "TotalSubject" },
            ],
            "bStateSave": false, // save datatable state(pagination, sort, etc) in cookie.
            "lengthMenu": [
                [10, 15, 20, -1],
                [10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,
        });
    },
    init_submit_register: function () {
        $('#fm_addStudent').on('submit', function (e) {
            e.preventDefault();

            const form = $(this), form_params = form.serializeArray();
            if (form.valid()) {
                COMMON.call_ajax({
                    url: STUDENTS.url_register,
                    type: 'POST',
                    data: form_params,
                    dataType: 'json',
                    success: function (result) {
                        if (result.status) {
                            window.location = STUDENTS.url_index;
                        } else {
                            toastr.error(result.message.join('<br/>'));
                        }
                    },
                    error: function () {
                        toastr.error('System error! Please contact Admin.');
                    }
                });
            }
        });
    },
    init_register_form: function () {
        $('.date-picker').datepicker({
            format: "dd/mm/yyyy",
            orientation: "left",
            autoclose: true
        });

        STUDENTS.init_gender_dropdown();
        STUDENTS.init_subject_dropdown();

        STUDENTS.register_form_validation();
        STUDENTS.init_submit_register();
    },
    init_gender_dropdown: function () {
        $('#select2_gender').select2({
            minimumResultsForSearch: Infinity
        });
    },
    init_subject_dropdown: function () {
        const actionUrl = $("#select2_subjects").data("url");
        $('#select2_subjects').select2({
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
            placeholder: 'Choose a subject',
            multiple: true,
            allowClear: true,
            minimumResultsForSearch: Infinity
        });
    },
    register_form_validation: function () {
        let registerForm = $('#fm_addStudent');
        registerForm.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "", // validate all fields including form hidden input
            rules: {
                NRIC: {
                    maxlength: 10,
                    required: true
                },
                StudentName: {
                    maxlength: 50,
                    required: true
                },
                Gender: {
                    required: true
                },
                DOB: {
                    required: true
                }
            },

            messages: { // custom messages for radio buttons and checkboxes
                NRIC: {
                    required: "Please enter the NRIC"
                },
                StudentName: {
                    required: "Please enter the student's name"
                },
                Gender: {
                    required: "Please choose a gender"
                },
                DOB: {
                    required: "Please choose a date of birth"
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
}
