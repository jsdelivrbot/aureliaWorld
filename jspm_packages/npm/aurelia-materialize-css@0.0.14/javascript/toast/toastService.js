/* */ 
define(["require", "exports"], function (require, exports) {
    "use strict";
    var ToastService = (function () {
        function ToastService() {
        }
        ToastService.prototype.show = function (message, displayLength, className) {
            return new Promise(function (resolve, reject) {
                Materialize.toast(message, displayLength, className, function () {
                    resolve();
                });
            });
        };
        return ToastService;
    }());
    exports.ToastService = ToastService;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImphdmFzY3JpcHQvdG9hc3QvdG9hc3RTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBQUE7UUFBQTtRQVFBLENBQUM7UUFQVSwyQkFBSSxHQUFYLFVBQVksT0FBTyxFQUFFLGFBQWEsRUFBRSxTQUFVO1lBQzFDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO2dCQUMvQixXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFO29CQUNqRCxPQUFPLEVBQUUsQ0FBQztnQkFDZCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNMLG1CQUFDO0lBQUQsQ0FSQSxBQVFDLElBQUE7SUFSWSxvQkFBWSxlQVF4QixDQUFBIiwiZmlsZSI6ImphdmFzY3JpcHQvdG9hc3QvdG9hc3RTZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFRvYXN0U2VydmljZSB7XHJcbiAgICBwdWJsaWMgc2hvdyhtZXNzYWdlLCBkaXNwbGF5TGVuZ3RoLCBjbGFzc05hbWU/KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgTWF0ZXJpYWxpemUudG9hc3QobWVzc2FnZSwgZGlzcGxheUxlbmd0aCwgY2xhc3NOYW1lLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
