var SettingUpload = function () {
    var handleImages = function () {
        // Popup message toastr
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
        // see http://www.plupload.com/
        var uploader = new plupload.Uploader({
            runtimes: 'html5,flash,silverlight,html4',

            browse_button: document.getElementById('tab_images_uploader_pickfiles'), // you can pass in id...
            container: document.getElementById('tab_images_uploader_container'), // ... or DOM Element itself
            url: "/Admin/GeneralSetting/UploadSlides",
            filters: {
                max_file_size: '5mb',
                mime_types: [
                    { title: "Image files", extensions: "jpg,gif,png,jpeg" }
                ]
            },
            init: {
                PostInit: function () {
                    $('#tab_images_uploader_filelist').html("");

                    $('#tab_images_uploader_uploadfiles').click(function () {
                        uploader.start();
                        return false;
                    });

                    $('#tab_images_uploader_filelist').on('click', '.added-files .remove', function () {
                        uploader.removeFile($(this).parent('.added-files').attr("id"));
                        $(this).parent('.added-files').remove();
                    });
                },

                FilesAdded: function (up, files) {
                    plupload.each(files, function (file) {
                        $('#tab_images_uploader_filelist').append('<div class="alert alert-warning added-files" id="uploaded_file_' + file.id + '">' + file.name + '(' + plupload.formatSize(file.size) + ') <span class="status label label-info"></span>&nbsp;<a href="javascript:;" style="margin-top:-5px" class="remove pull-right btn btn-sm red"><i class="fa fa-times"></i> Xóa</a></div>');
                    });
                },

                UploadProgress: function (up, file) {
                    $('#uploaded_file_' + file.id + ' > .status').html(file.percent + '%');
                },

                FileUploaded: function (up, file, response) {
                    var response = $.parseJSON(response.response);

                    if (response.result && response.result === 'OK') {
                        var id = response.id; // uploaded file's unique name. Here you can collect uploaded file names and submit an jax request to your server side script to process the uploaded files and update the images tabke
                        $('#uploaded_file_' + file.id + ' > .status').removeClass("label-info").addClass("label-success").html('<i class="fa fa-check"></i> Xong'); // set successfull upload
                        // Add image to tables
                        $("#tb_images tbody")
                            .append(
                            "<tr>" +
								"<td>" +
								"	<a href='\/Images\/Slides\/" + file.name + "' class='fancybox-button' data-rel='fancybox-button'>" +
								"	<img class='img-responsive' src='\/Images\/Slides\/" + file.name + "' alt=''></a>" +
								"</td>" +
								"<td>" +
								"	<input type='text' class='form-control' value='" + file.name + "' disabled='disabled'>" +
								"</td>" +
								"<td>" +
								"	<a href='javascript:;' class='btn default btn-sm btn-delete' data-id='" + id + "'>" +
								"	<i class='fa fa-times'></i> Xóa </a>" +
								"</td>" +
							"</tr>"
                            );

                        // DELETE SLIDE
                        $("button.btn-delete").live('click', function () {
                            var btn = $(this);
                            var slideId = $(this).data("id");
                            $.ajax({
                                url: "/Admin/GeneralSetting/DeleteSlide/" + slideId,
                                dataType: "JSON",
                                success: function (data) {
                                    if (data.result === "OK") {
                                        btn.parents("tr").remove();
                                        toastr.success("Slide đã được xóa thành công");
                                    }
                                }
                            });
                        });
                    } else {
                        $('#uploaded_file_' + file.id + ' > .status').removeClass("label-info").addClass("label-danger").html('<i class="fa fa-warning"></i> Thất bại'); // set failed upload
                        toastr.error("Một số ảnh tải lên không thành công. Thử lại", "");
                    }
                },

                Error: function (up, err) {
                    toastr.error(err.message);
                }
            }
        });
        // DELETE SLIDE
        $("button.btn-delete").live('click', function () {
            var btn = $(this);
            var slideId = $(this).data("id");
            $.ajax({
                url: "/Admin/GeneralSetting/DeleteSlide/" + slideId,
                dataType: "JSON",
                success: function (data) {
                    if (data.result === "OK") {
                        btn.parents("tr").remove();
                        toastr.success("Slide đã được xóa thành công");
                    }
                }
            });
        });
        uploader.init();

    }

    return {

        //main function to initiate the module
        init: function () {
            handleImages();
        }

    };

}();