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
    var PushpinAttribute = (function () {
        function PushpinAttribute(element) {
            this.element = element;
            this.bottom = Infinity;
            this.offset = 0;
            this.top = 0;
        }
        PushpinAttribute.prototype.attached = function () {
            var options = {
                bottom: this.bottom,
                offset: this.offset,
                top: this.top,
            };
            $(this.element).pushpin(options);
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], PushpinAttribute.prototype, "bottom", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], PushpinAttribute.prototype, "offset", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], PushpinAttribute.prototype, "top", void 0);
        PushpinAttribute = __decorate([
            aurelia_framework_1.customAttribute(config_1.config.pushpin),
            aurelia_dependency_injection_1.inject(Element), 
            __metadata('design:paramtypes', [Element])
        ], PushpinAttribute);
        return PushpinAttribute;
    }());
    exports.PushpinAttribute = PushpinAttribute;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImphdmFzY3JpcHQvcHVzaHBpbi9wdXNocGluQXR0cmlidXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBTUE7UUFXSSwwQkFBb0IsT0FBZ0I7WUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztZQVI3QixXQUFNLEdBQUcsUUFBUSxDQUFDO1lBR2xCLFdBQU0sR0FBRyxDQUFDLENBQUM7WUFHWCxRQUFHLEdBQUcsQ0FBQyxDQUFDO1FBR2YsQ0FBQztRQUVNLG1DQUFRLEdBQWY7WUFDSSxJQUFJLE9BQU8sR0FBRztnQkFDVixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO2FBQ2hCLENBQUM7WUFDRixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBbkJEO1lBQUMsNEJBQVEsRUFBRTs7d0RBQUE7UUFHWDtZQUFDLDRCQUFRLEVBQUU7O3dEQUFBO1FBR1g7WUFBQyw0QkFBUSxFQUFFOztxREFBQTtRQVZmO1lBQUMsbUNBQWUsQ0FBQyxlQUFNLENBQUMsT0FBTyxDQUFDO1lBQy9CLHFDQUFNLENBQUMsT0FBTyxDQUFDOzs0QkFBQTtRQXVCaEIsdUJBQUM7SUFBRCxDQXRCQSxBQXNCQyxJQUFBO0lBdEJZLHdCQUFnQixtQkFzQjVCLENBQUEiLCJmaWxlIjoiamF2YXNjcmlwdC9wdXNocGluL3B1c2hwaW5BdHRyaWJ1dGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjdXN0b21BdHRyaWJ1dGUsIGJpbmRhYmxlIH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCI7XHJcbmltcG9ydCB7IGluamVjdCB9IGZyb20gXCJhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uXCI7XHJcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuLy4uLy4uL2NvbmZpZ1wiO1xyXG5cclxuQGN1c3RvbUF0dHJpYnV0ZShjb25maWcucHVzaHBpbilcclxuQGluamVjdChFbGVtZW50KVxyXG5leHBvcnQgY2xhc3MgUHVzaHBpbkF0dHJpYnV0ZSB7XHJcblxyXG4gICAgQGJpbmRhYmxlKClcclxuICAgIHB1YmxpYyBib3R0b20gPSBJbmZpbml0eTtcclxuXHJcbiAgICBAYmluZGFibGUoKVxyXG4gICAgcHVibGljIG9mZnNldCA9IDA7XHJcblxyXG4gICAgQGJpbmRhYmxlKClcclxuICAgIHB1YmxpYyB0b3AgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhdHRhY2hlZCgpIHtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgYm90dG9tOiB0aGlzLmJvdHRvbSxcclxuICAgICAgICAgICAgb2Zmc2V0OiB0aGlzLm9mZnNldCxcclxuICAgICAgICAgICAgdG9wOiB0aGlzLnRvcCxcclxuICAgICAgICB9O1xyXG4gICAgICAgICQodGhpcy5lbGVtZW50KS5wdXNocGluKG9wdGlvbnMpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
