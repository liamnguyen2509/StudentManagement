const STUDENTEDIT = {
    url_index: '',
    url_update: '',
    init_submit_update: function () {
        $('#fm_editStudent').on('submit', function (e) {
            e.preventDefault();

            const form = $(this), form_params = form.serializeArray();
            if (form.valid()) {
                COMMON.call_ajax({
                    url: STUDENTEDIT.url_update,
                    type: 'POST',
                    data: form_params,
                    dataType: 'json',
                    success: function (result) {
                        if (result.status) {
                            window.location = STUDENTEDIT.url_index;
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
    init_edit_form: function () {
        $('.date-picker').datepicker({
            format: "dd/mm/yyyy",
            orientation: "left",
            autoclose: true
        });

        STUDENTEDIT.init_gender_dropdown();
        STUDENTEDIT.init_subject_dropdown();

        STUDENTEDIT.edit_form_validation();
        STUDENTEDIT.init_submit_update();
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

        // ASSIGN SELECTED VALUES
        var selectedSubjects = JSON.parse($("input#selected-subjects").val());
        $.each(selectedSubjects, function (index, value) {
            var id = value.id;
            var text = value.name;
            $("#select2_subjects").append('<option value="' + id + '" selected="selected">' + text + '</option>');
        });
        $("#select2_subjects").trigger("change");
    },
    edit_form_validation: function () {
        let editForm = $('#fm_editStudent');
        editForm.validate({
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