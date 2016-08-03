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
    var SelectAttribute = (function () {
        function SelectAttribute(element) {
            this.element = element;
        }
        SelectAttribute.prototype.attached = function () {
            $(this.element).material_select();
        };
        SelectAttribute.prototype.detached = function () {
            $(this.element).material_select("destroy");
        };
        SelectAttribute = __decorate([
            aurelia_framework_1.customAttribute(config_1.config.materialSelect),
            aurelia_dependency_injection_1.inject(Element), 
            __metadata('design:paramtypes', [Element])
        ], SelectAttribute);
        return SelectAttribute;
    }());
    exports.SelectAttribute = SelectAttribute;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZm9ybXMvc2VsZWN0QXR0cmlidXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBTUE7UUFFSSx5QkFBb0IsT0FBZ0I7WUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNwQyxDQUFDO1FBRU0sa0NBQVEsR0FBZjtZQUNJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdEMsQ0FBQztRQUVNLGtDQUFRLEdBQWY7WUFDSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBYkw7WUFBQyxtQ0FBZSxDQUFDLGVBQU0sQ0FBQyxjQUFjLENBQUM7WUFDdEMscUNBQU0sQ0FBQyxPQUFPLENBQUM7OzJCQUFBO1FBYWhCLHNCQUFDO0lBQUQsQ0FaQSxBQVlDLElBQUE7SUFaWSx1QkFBZSxrQkFZM0IsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2Zvcm1zL3NlbGVjdEF0dHJpYnV0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGN1c3RvbUF0dHJpYnV0ZSB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiO1xyXG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvblwiO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi8uLi8uLi9jb25maWdcIjtcclxuXHJcbkBjdXN0b21BdHRyaWJ1dGUoY29uZmlnLm1hdGVyaWFsU2VsZWN0KVxyXG5AaW5qZWN0KEVsZW1lbnQpXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3RBdHRyaWJ1dGUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhdHRhY2hlZCgpIHtcclxuICAgICAgICAkKHRoaXMuZWxlbWVudCkubWF0ZXJpYWxfc2VsZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRldGFjaGVkKCkge1xyXG4gICAgICAgICQodGhpcy5lbGVtZW50KS5tYXRlcmlhbF9zZWxlY3QoXCJkZXN0cm95XCIpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
