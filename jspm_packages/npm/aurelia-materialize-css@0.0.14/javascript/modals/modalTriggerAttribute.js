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
    var ModalTrigger = (function () {
        function ModalTrigger(element) {
            this.element = element;
        }
        ModalTrigger.prototype.attached = function () {
            this.element.addEventListener("click", this.click.bind(this));
        };
        ModalTrigger.prototype.detached = function () {
            this.element.removeEventListener("click", this.click);
        };
        ModalTrigger.prototype.valueChanged = function (newValue) {
            this.value = newValue;
        };
        ModalTrigger.prototype.click = function () {
            $("#" + this.value).openModal();
        };
        ModalTrigger = __decorate([
            aurelia_framework_1.customAttribute(config_1.config.modalTrigger),
            aurelia_dependency_injection_1.inject(Element), 
            __metadata('design:paramtypes', [Element])
        ], ModalTrigger);
        return ModalTrigger;
    }());
    exports.ModalTrigger = ModalTrigger;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImphdmFzY3JpcHQvbW9kYWxzL21vZGFsVHJpZ2dlckF0dHJpYnV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQU1BO1FBRUksc0JBQW9CLE9BQWdCO1lBQWhCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDcEMsQ0FBQztRQUlNLCtCQUFRLEdBQWY7WUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7UUFFTSwrQkFBUSxHQUFmO1lBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFELENBQUM7UUFFTSxtQ0FBWSxHQUFuQixVQUFvQixRQUFRO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1FBQzFCLENBQUM7UUFFTSw0QkFBSyxHQUFaO1lBQ0ksQ0FBQyxDQUFDLE1BQUksSUFBSSxDQUFDLEtBQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3BDLENBQUM7UUF2Qkw7WUFBQyxtQ0FBZSxDQUFDLGVBQU0sQ0FBQyxZQUFZLENBQUM7WUFDcEMscUNBQU0sQ0FBQyxPQUFPLENBQUM7O3dCQUFBO1FBdUJoQixtQkFBQztJQUFELENBdEJBLEFBc0JDLElBQUE7SUF0Qlksb0JBQVksZUFzQnhCLENBQUEiLCJmaWxlIjoiamF2YXNjcmlwdC9tb2RhbHMvbW9kYWxUcmlnZ2VyQXR0cmlidXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3VzdG9tQXR0cmlidXRlIH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCI7XHJcbmltcG9ydCB7IGluamVjdCB9IGZyb20gXCJhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uXCI7XHJcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuLy4uLy4uL2NvbmZpZ1wiO1xyXG5cclxuQGN1c3RvbUF0dHJpYnV0ZShjb25maWcubW9kYWxUcmlnZ2VyKVxyXG5AaW5qZWN0KEVsZW1lbnQpXHJcbmV4cG9ydCBjbGFzcyBNb2RhbFRyaWdnZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2YWx1ZTtcclxuXHJcbiAgICBwdWJsaWMgYXR0YWNoZWQoKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsaWNrLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXRhY2hlZCgpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xpY2spO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2YWx1ZUNoYW5nZWQobmV3VmFsdWUpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsaWNrKCkge1xyXG4gICAgICAgICQoYCMke3RoaXMudmFsdWV9YCkub3Blbk1vZGFsKCk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
