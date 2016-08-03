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
    var BoxedAttribute = (function () {
        function BoxedAttribute(element) {
            this.element = element;
        }
        BoxedAttribute.prototype.attached = function () {
            this.element.classList.add("materialboxed");
            $(this.element).materialbox();
        };
        BoxedAttribute.prototype.detached = function () {
            this.element.classList.remove("materialboxed");
        };
        BoxedAttribute = __decorate([
            aurelia_framework_1.customAttribute(config_1.config.boxed),
            aurelia_dependency_injection_1.inject(Element), 
            __metadata('design:paramtypes', [Element])
        ], BoxedAttribute);
        return BoxedAttribute;
    }());
    exports.BoxedAttribute = BoxedAttribute;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImphdmFzY3JpcHQvbWVkaWEvYm94ZWRBdHRyaWJ1dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFNQTtRQUVJLHdCQUFvQixPQUFnQjtZQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ3BDLENBQUM7UUFFTSxpQ0FBUSxHQUFmO1lBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEMsQ0FBQztRQUVNLGlDQUFRLEdBQWY7WUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQWRMO1lBQUMsbUNBQWUsQ0FBQyxlQUFNLENBQUMsS0FBSyxDQUFDO1lBQzdCLHFDQUFNLENBQUMsT0FBTyxDQUFDOzswQkFBQTtRQWNoQixxQkFBQztJQUFELENBYkEsQUFhQyxJQUFBO0lBYlksc0JBQWMsaUJBYTFCLENBQUEiLCJmaWxlIjoiamF2YXNjcmlwdC9tZWRpYS9ib3hlZEF0dHJpYnV0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGN1c3RvbUF0dHJpYnV0ZSB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiO1xyXG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvblwiO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi8uLi8uLi9jb25maWdcIjtcclxuXHJcbkBjdXN0b21BdHRyaWJ1dGUoY29uZmlnLmJveGVkKVxyXG5AaW5qZWN0KEVsZW1lbnQpXHJcbmV4cG9ydCBjbGFzcyBCb3hlZEF0dHJpYnV0ZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50KSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGF0dGFjaGVkKCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibWF0ZXJpYWxib3hlZFwiKTtcclxuICAgICAgICAkKHRoaXMuZWxlbWVudCkubWF0ZXJpYWxib3goKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGV0YWNoZWQoKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJtYXRlcmlhbGJveGVkXCIpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
