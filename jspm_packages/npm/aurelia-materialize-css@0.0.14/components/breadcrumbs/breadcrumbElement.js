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
    var BreadcrumbElement = (function () {
        function BreadcrumbElement() {
        }
        BreadcrumbElement.prototype.attached = function () {
            this.element.classList.add("breadcrumb");
        };
        BreadcrumbElement.prototype.detached = function () {
            this.element.classList.remove("breadcrumb");
        };
        BreadcrumbElement = __decorate([
            aurelia_framework_1.customElement(config_1.config.breadcrumb),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView("<template><a ref='element'><content></content></a></template>"), 
            __metadata('design:paramtypes', [])
        ], BreadcrumbElement);
        return BreadcrumbElement;
    }());
    exports.BreadcrumbElement = BreadcrumbElement;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYnJlYWRjcnVtYnMvYnJlYWRjcnVtYkVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFNQTtRQUFBO1FBV0EsQ0FBQztRQVBVLG9DQUFRLEdBQWY7WUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUVNLG9DQUFRLEdBQWY7WUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQWJMO1lBQUMsaUNBQWEsQ0FBQyxlQUFNLENBQUMsVUFBVSxDQUFDO1lBQ2hDLGlDQUFhLEVBQUU7WUFDZiw4QkFBVSxDQUFDLCtEQUErRCxDQUFDOzs2QkFBQTtRQVk1RSx3QkFBQztJQUFELENBWEEsQUFXQyxJQUFBO0lBWFkseUJBQWlCLG9CQVc3QixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvYnJlYWRjcnVtYnMvYnJlYWRjcnVtYkVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjdXN0b21FbGVtZW50LCBjb250YWluZXJsZXNzLCBpbmxpbmVWaWV3IH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCI7XHJcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuLy4uLy4uL2NvbmZpZ1wiO1xyXG5cclxuQGN1c3RvbUVsZW1lbnQoY29uZmlnLmJyZWFkY3J1bWIpXHJcbkBjb250YWluZXJsZXNzKClcclxuQGlubGluZVZpZXcoXCI8dGVtcGxhdGU+PGEgcmVmPSdlbGVtZW50Jz48Y29udGVudD48L2NvbnRlbnQ+PC9hPjwvdGVtcGxhdGU+XCIpXHJcbmV4cG9ydCBjbGFzcyBCcmVhZGNydW1iRWxlbWVudCB7XHJcblxyXG4gICAgcHVibGljIGVsZW1lbnQ6IEhUTUxBbmNob3JFbGVtZW50O1xyXG5cclxuICAgIHB1YmxpYyBhdHRhY2hlZCgpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImJyZWFkY3J1bWJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRldGFjaGVkKCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYnJlYWRjcnVtYlwiKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
