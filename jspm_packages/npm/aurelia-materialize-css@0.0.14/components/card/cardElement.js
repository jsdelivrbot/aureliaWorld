/* */ 
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "./../../config"], function (require, exports, aurelia_framework_1, config_1) {
    "use strict";
    var CardElement = (function () {
        function CardElement() {
        }
        CardElement.prototype.attached = function () {
            this.element.classList.add("card");
            if (this.size) {
                this.element.classList.add(this.size);
            }
        };
        CardElement.prototype.detached = function () {
            this.element.classList.remove("card", "small", "medium", "large");
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], CardElement.prototype, "size", void 0);
        CardElement = __decorate([
            aurelia_framework_1.customElement(config_1.config.card),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView("<template><div ref='element'><content></content></div></template>"), 
            __metadata('design:paramtypes', [])
        ], CardElement);
        return CardElement;
    }());
    exports.CardElement = CardElement;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2FyZC9jYXJkRWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQU1BO1FBQUE7UUFpQkEsQ0FBQztRQVZVLDhCQUFRLEdBQWY7WUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQyxDQUFDO1FBQ0wsQ0FBQztRQUVNLDhCQUFRLEdBQWY7WUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdEUsQ0FBQztRQVpEO1lBQUMsNEJBQVEsRUFBRTs7aURBQUE7UUFQZjtZQUFDLGlDQUFhLENBQUMsZUFBTSxDQUFDLElBQUksQ0FBQztZQUMxQixpQ0FBYSxFQUFFO1lBQ2YsOEJBQVUsQ0FBQyxtRUFBbUUsQ0FBQzs7dUJBQUE7UUFrQmhGLGtCQUFDO0lBQUQsQ0FqQkEsQUFpQkMsSUFBQTtJQWpCWSxtQkFBVyxjQWlCdkIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2NhcmQvY2FyZEVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBiaW5kYWJsZSwgY3VzdG9tRWxlbWVudCwgY29udGFpbmVybGVzcywgaW5saW5lVmlldyB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi8uLi8uLi9jb25maWdcIjtcclxuXHJcbkBjdXN0b21FbGVtZW50KGNvbmZpZy5jYXJkKVxyXG5AY29udGFpbmVybGVzcygpXHJcbkBpbmxpbmVWaWV3KFwiPHRlbXBsYXRlPjxkaXYgcmVmPSdlbGVtZW50Jz48Y29udGVudD48L2NvbnRlbnQ+PC9kaXY+PC90ZW1wbGF0ZT5cIilcclxuZXhwb3J0IGNsYXNzIENhcmRFbGVtZW50IHtcclxuXHJcbiAgICBwdWJsaWMgZWxlbWVudDogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgQGJpbmRhYmxlKClcclxuICAgIHB1YmxpYyBzaXplOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGF0dGFjaGVkKCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiY2FyZFwiKTtcclxuICAgICAgICBpZiAodGhpcy5zaXplKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXRhY2hlZCgpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImNhcmRcIiwgXCJzbWFsbFwiLCBcIm1lZGl1bVwiLCBcImxhcmdlXCIpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
