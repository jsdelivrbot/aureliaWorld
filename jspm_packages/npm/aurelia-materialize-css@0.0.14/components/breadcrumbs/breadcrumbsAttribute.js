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
define(["require", "exports", "aurelia-framework", "aurelia-dependency-injection", "aurelia-pal", "./../../config"], function (require, exports, aurelia_framework_1, aurelia_dependency_injection_1, aurelia_pal_1, config_1) {
    "use strict";
    var BreadcrumbsAttribute = (function () {
        function BreadcrumbsAttribute(element) {
            this.element = element;
        }
        BreadcrumbsAttribute.prototype.attached = function () {
            var colWrapper = aurelia_pal_1.DOM.createElement("div");
            colWrapper.classList.add("col", "s12");
            while (this.element.hasChildNodes()) {
                colWrapper.appendChild(this.element.firstChild);
            }
            this.element.appendChild(colWrapper);
            this.element.classList.add("nav-wrapper");
        };
        BreadcrumbsAttribute.prototype.detached = function () {
            this.element.classList.remove("nav-wrapper");
        };
        BreadcrumbsAttribute = __decorate([
            aurelia_framework_1.customAttribute(config_1.config.breadcrumbs),
            aurelia_dependency_injection_1.inject(Element), 
            __metadata('design:paramtypes', [HTMLElement])
        ], BreadcrumbsAttribute);
        return BreadcrumbsAttribute;
    }());
    exports.BreadcrumbsAttribute = BreadcrumbsAttribute;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYnJlYWRjcnVtYnMvYnJlYWRjcnVtYnNBdHRyaWJ1dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFPQTtRQUVJLDhCQUFtQixPQUFvQjtZQUFwQixZQUFPLEdBQVAsT0FBTyxDQUFhO1FBQUksQ0FBQztRQUVyQyx1Q0FBUSxHQUFmO1lBRUksSUFBSSxVQUFVLEdBQUcsaUJBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRXZDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDO2dCQUNsQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDcEQsQ0FBQztZQUVELElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBRU0sdUNBQVEsR0FBZjtZQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBckJMO1lBQUMsbUNBQWUsQ0FBQyxlQUFNLENBQUMsV0FBVyxDQUFDO1lBQ25DLHFDQUFNLENBQUMsT0FBTyxDQUFDOztnQ0FBQTtRQXFCaEIsMkJBQUM7SUFBRCxDQXBCQSxBQW9CQyxJQUFBO0lBcEJZLDRCQUFvQix1QkFvQmhDLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9icmVhZGNydW1icy9icmVhZGNydW1ic0F0dHJpYnV0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGN1c3RvbUF0dHJpYnV0ZSB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiO1xyXG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvblwiO1xyXG5pbXBvcnQgeyBET00gfSBmcm9tIFwiYXVyZWxpYS1wYWxcIjtcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4vLi4vLi4vY29uZmlnXCI7XHJcblxyXG5AY3VzdG9tQXR0cmlidXRlKGNvbmZpZy5icmVhZGNydW1icylcclxuQGluamVjdChFbGVtZW50KVxyXG5leHBvcnQgY2xhc3MgQnJlYWRjcnVtYnNBdHRyaWJ1dGUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBIVE1MRWxlbWVudCkgeyB9XHJcblxyXG4gICAgcHVibGljIGF0dGFjaGVkKCkge1xyXG5cclxuICAgICAgICBsZXQgY29sV3JhcHBlciA9IERPTS5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGNvbFdyYXBwZXIuY2xhc3NMaXN0LmFkZChcImNvbFwiLCBcInMxMlwiKTtcclxuXHJcbiAgICAgICAgd2hpbGUgKHRoaXMuZWxlbWVudC5oYXNDaGlsZE5vZGVzKCkpIHtcclxuICAgICAgICAgICAgY29sV3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoY29sV3JhcHBlcik7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJuYXYtd3JhcHBlclwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGV0YWNoZWQoKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJuYXYtd3JhcHBlclwiKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
