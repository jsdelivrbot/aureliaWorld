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
define(["require", "exports", "aurelia-framework", "aurelia-dependency-injection", "./../../config"], function (require, exports, aurelia_framework_1, aurelia_dependency_injection_1, config_1) {
    "use strict";
    var BreadcrumbAttribute = (function () {
        function BreadcrumbAttribute(element) {
            this.element = element;
        }
        BreadcrumbAttribute.prototype.attached = function () {
            this.element.classList.add("breadcrumb");
        };
        BreadcrumbAttribute.prototype.detached = function () {
            this.element.classList.remove("breadcrumb");
        };
        BreadcrumbAttribute = __decorate([
            aurelia_framework_1.customAttribute(config_1.config.breadcrumb),
            aurelia_dependency_injection_1.inject(Element), 
            __metadata('design:paramtypes', [HTMLElement])
        ], BreadcrumbAttribute);
        return BreadcrumbAttribute;
    }());
    exports.BreadcrumbAttribute = BreadcrumbAttribute;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYnJlYWRjcnVtYnMvYnJlYWRjcnVtYkF0dHJpYnV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQU1BO1FBRUksNkJBQW1CLE9BQW9CO1lBQXBCLFlBQU8sR0FBUCxPQUFPLENBQWE7UUFBRyxDQUFDO1FBRXBDLHNDQUFRLEdBQWY7WUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUVNLHNDQUFRLEdBQWY7WUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQVpMO1lBQUMsbUNBQWUsQ0FBQyxlQUFNLENBQUMsVUFBVSxDQUFDO1lBQ2xDLHFDQUFNLENBQUMsT0FBTyxDQUFDOzsrQkFBQTtRQVloQiwwQkFBQztJQUFELENBWEEsQUFXQyxJQUFBO0lBWFksMkJBQW1CLHNCQVcvQixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvYnJlYWRjcnVtYnMvYnJlYWRjcnVtYkF0dHJpYnV0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGN1c3RvbUF0dHJpYnV0ZSB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiO1xyXG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvblwiO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi8uLi8uLi9jb25maWdcIjtcclxuXHJcbkBjdXN0b21BdHRyaWJ1dGUoY29uZmlnLmJyZWFkY3J1bWIpXHJcbkBpbmplY3QoRWxlbWVudClcclxuZXhwb3J0IGNsYXNzIEJyZWFkY3J1bWJBdHRyaWJ1dGUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBIVE1MRWxlbWVudCkge31cclxuXHJcbiAgICBwdWJsaWMgYXR0YWNoZWQoKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJicmVhZGNydW1iXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXRhY2hlZCgpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImJyZWFkY3J1bWJcIik7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
