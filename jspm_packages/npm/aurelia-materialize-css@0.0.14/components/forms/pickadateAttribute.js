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
    var PickADateAttribute = (function () {
        function PickADateAttribute(element) {
            this.element = element;
            this.options = {};
        }
        PickADateAttribute.prototype.attached = function () {
            this.element.classList.add("datepicker");
            $(this.element).pickadate(this.options);
            this.picker = $(this.element).pickadate("picker");
            this.element.addEventListener("focus", this.openFunction.bind(this));
            $(this.picker).on({ "set": this.onSet.bind(this) });
        };
        PickADateAttribute.prototype.detached = function () {
            this.element.classList.remove("datepicker");
            this.element.removeEventListener("focus", this.openFunction);
            if (this.picker) {
                $(this.picker).stop();
            }
        };
        PickADateAttribute.prototype.onSet = function (value) {
            this.fireEvent(this.element, "input");
        };
        PickADateAttribute.prototype.valueChanged = function (newValue) {
            this.picker.set("select", newValue);
        };
        PickADateAttribute.prototype.openFunction = function () {
            this.picker.open();
        };
        PickADateAttribute.prototype.createEvent = function (name) {
            var event = document.createEvent("Event");
            event.initEvent(name, true, true);
            return event;
        };
        PickADateAttribute.prototype.fireEvent = function (element, name) {
            element.dispatchEvent(this.createEvent(name));
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], PickADateAttribute.prototype, "options", void 0);
        PickADateAttribute = __decorate([
            aurelia_framework_1.customAttribute(config_1.config.pickadate),
            aurelia_dependency_injection_1.inject(Element), 
            __metadata('design:paramtypes', [Element])
        ], PickADateAttribute);
        return PickADateAttribute;
    }());
    exports.PickADateAttribute = PickADateAttribute;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZm9ybXMvcGlja2FkYXRlQXR0cmlidXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBTUE7UUFFSSw0QkFBb0IsT0FBZ0I7WUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztZQUk3QixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBSHBCLENBQUM7UUFPTSxxQ0FBUSxHQUFmO1lBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFFTSxxQ0FBUSxHQUFmO1lBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM3RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDZCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzFCLENBQUM7UUFDTCxDQUFDO1FBRU0sa0NBQUssR0FBWixVQUFhLEtBQUs7WUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUVNLHlDQUFZLEdBQW5CLFVBQW9CLFFBQVE7WUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFFTyx5Q0FBWSxHQUFwQjtZQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsQ0FBQztRQUVPLHdDQUFXLEdBQW5CLFVBQW9CLElBQUk7WUFDcEIsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRU8sc0NBQVMsR0FBakIsVUFBa0IsT0FBTyxFQUFFLElBQUk7WUFDM0IsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQXpDRDtZQUFDLDRCQUFRLEVBQUU7OzJEQUFBO1FBUGY7WUFBQyxtQ0FBZSxDQUFDLGVBQU0sQ0FBQyxTQUFTLENBQUM7WUFDakMscUNBQU0sQ0FBQyxPQUFPLENBQUM7OzhCQUFBO1FBZ0RoQix5QkFBQztJQUFELENBL0NBLEFBK0NDLElBQUE7SUEvQ1ksMEJBQWtCLHFCQStDOUIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2Zvcm1zL3BpY2thZGF0ZUF0dHJpYnV0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJpbmRhYmxlLCBjdXN0b21BdHRyaWJ1dGUgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIjtcclxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSBcImF1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb25cIjtcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4vLi4vLi4vY29uZmlnXCI7XHJcblxyXG5AY3VzdG9tQXR0cmlidXRlKGNvbmZpZy5waWNrYWRhdGUpXHJcbkBpbmplY3QoRWxlbWVudClcclxuZXhwb3J0IGNsYXNzIFBpY2tBRGF0ZUF0dHJpYnV0ZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50KSB7XHJcbiAgICB9XHJcblxyXG4gICAgQGJpbmRhYmxlKClcclxuICAgIHB1YmxpYyBvcHRpb25zID0ge307XHJcblxyXG4gICAgcHJpdmF0ZSBwaWNrZXI7XHJcblxyXG4gICAgcHVibGljIGF0dGFjaGVkKCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZGF0ZXBpY2tlclwiKTtcclxuICAgICAgICAkKHRoaXMuZWxlbWVudCkucGlja2FkYXRlKHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5waWNrZXIgPSAkKHRoaXMuZWxlbWVudCkucGlja2FkYXRlKFwicGlja2VyXCIpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgdGhpcy5vcGVuRnVuY3Rpb24uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgJCh0aGlzLnBpY2tlcikub24oeyBcInNldFwiIDogdGhpcy5vblNldC5iaW5kKHRoaXMpIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXRhY2hlZCgpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImRhdGVwaWNrZXJcIik7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCB0aGlzLm9wZW5GdW5jdGlvbik7XHJcbiAgICAgICAgaWYgKHRoaXMucGlja2VyKSB7XHJcbiAgICAgICAgICAgICQodGhpcy5waWNrZXIpLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2V0KHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5maXJlRXZlbnQodGhpcy5lbGVtZW50LCBcImlucHV0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2YWx1ZUNoYW5nZWQobmV3VmFsdWUpIHtcclxuICAgICAgICB0aGlzLnBpY2tlci5zZXQoXCJzZWxlY3RcIiwgbmV3VmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb3BlbkZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMucGlja2VyLm9wZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUV2ZW50KG5hbWUpIHtcclxuICAgICAgICBsZXQgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkV2ZW50XCIpO1xyXG4gICAgICAgIGV2ZW50LmluaXRFdmVudChuYW1lLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICByZXR1cm4gZXZlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaXJlRXZlbnQoZWxlbWVudCwgbmFtZSkge1xyXG4gICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudCh0aGlzLmNyZWF0ZUV2ZW50KG5hbWUpKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
