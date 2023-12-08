using System.Web;
using System.Web.Optimization;

namespace StudentManagement
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                         "~/Content/assets/global/plugins/bootstrap/js/bootstrap.min.js",
                         "~/Content/assets/global/plugins/jquery-validation/js/jquery.validate.min.js",
                         "~/Content/assets/global/plugins/jquery-validation/js/additional-methods.min.js",
                         "~/Content/assets/global/plugins/bootstrap-daterangepicker/moment.min.js",
                         "~/Content/assets/global/plugins/bootstrap-toastr/toastr.min.js",
                         "~/Scripts/common.js"
                         ));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/global/css").Include(
                      "~/Content/assets/global/plugins/font-awesome/css/font-awesome.min.css",
                      "~/Content/assets/global/plugins/simple-line-icons/simple-line-icons.min.css",
                      "~/Content/assets/global/plugins/bootstrap/css/bootstrap.min.css",
                      "~/Content/assets/global/plugins/select2/select2.css",
                      "~/Content/assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css",
                      "~/Content/assets/global/plugins/datatables/extensions/Responsive/css/dataTables.responsive.css",
                      "~/Content/assets/global/plugins/bootstrap-toastr/toastr.min.css",
                      "~/Content/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker.min.css"
                      ));

            bundles.Add(new StyleBundle("~/plugin/css").Include(
                     "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/theme/css").Include(
                      "~/Content/assets/global/css/components.css",
                      "~/Content/assets/global/css/plugins.css",
                      "~/Content/assets/admin/layout/css/layout.css",
                      "~/Content/assets/admin/layout/css/themes/darkblue.css",
                      "~/Content/assets/admin/layout/css/custom.css"));
        }
    }
}
