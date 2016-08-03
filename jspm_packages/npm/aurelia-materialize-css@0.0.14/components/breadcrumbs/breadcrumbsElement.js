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
    var BreadcrumbsElement = (function () {
        function BreadcrumbsElement() {
        }
        BreadcrumbsElement.prototype.attached = function () {
            this.element.classList.add("nav-wrapper");
        };
        BreadcrumbsElement.prototype.detached = function () {
            this.element.classList.remove("nav-wrapper");
        };
        BreadcrumbsElement = __decorate([
            aurelia_framework_1.customElement(config_1.config.breadcrumbs),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView("<template><div ref='element'><div class='col s12'><content></content></div></div></template>"), 
            __metadata('design:paramtypes', [])
        ], BreadcrumbsElement);
        return BreadcrumbsElement;
    }());
    exports.BreadcrumbsElement = BreadcrumbsElement;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYnJlYWRjcnVtYnMvYnJlYWRjcnVtYnNFbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBTUE7UUFBQTtRQVdBLENBQUM7UUFQVSxxQ0FBUSxHQUFmO1lBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFFTSxxQ0FBUSxHQUFmO1lBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFiTDtZQUFDLGlDQUFhLENBQUMsZUFBTSxDQUFDLFdBQVcsQ0FBQztZQUNqQyxpQ0FBYSxFQUFFO1lBQ2YsOEJBQVUsQ0FBQyw4RkFBOEYsQ0FBQzs7OEJBQUE7UUFZM0cseUJBQUM7SUFBRCxDQVhBLEFBV0MsSUFBQTtJQVhZLDBCQUFrQixxQkFXOUIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2JyZWFkY3J1bWJzL2JyZWFkY3J1bWJzRWxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGN1c3RvbUVsZW1lbnQsIGNvbnRhaW5lcmxlc3MsIGlubGluZVZpZXcgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIjtcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4vLi4vLi4vY29uZmlnXCI7XHJcblxyXG5AY3VzdG9tRWxlbWVudChjb25maWcuYnJlYWRjcnVtYnMpXHJcbkBjb250YWluZXJsZXNzKClcclxuQGlubGluZVZpZXcoXCI8dGVtcGxhdGU+PGRpdiByZWY9J2VsZW1lbnQnPjxkaXYgY2xhc3M9J2NvbCBzMTInPjxjb250ZW50PjwvY29udGVudD48L2Rpdj48L2Rpdj48L3RlbXBsYXRlPlwiKVxyXG5leHBvcnQgY2xhc3MgQnJlYWRjcnVtYnNFbGVtZW50IHtcclxuXHJcbiAgICBwdWJsaWMgZWxlbWVudDogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgcHVibGljIGF0dGFjaGVkKCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibmF2LXdyYXBwZXJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRldGFjaGVkKCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwibmF2LXdyYXBwZXJcIik7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
