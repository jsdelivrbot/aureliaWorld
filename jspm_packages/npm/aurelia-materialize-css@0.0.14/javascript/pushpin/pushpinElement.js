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
    var PushpinElement = (function () {
        function PushpinElement(element) {
            this.element = element;
            this.bottom = Infinity;
            this.offset = 0;
            this.top = 0;
        }
        PushpinElement.prototype.attached = function () {
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
        ], PushpinElement.prototype, "bottom", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], PushpinElement.prototype, "offset", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], PushpinElement.prototype, "top", void 0);
        PushpinElement = __decorate([
            aurelia_framework_1.customElement(config_1.config.pushpin),
            aurelia_framework_1.inlineView("<template><content></content></template>"),
            aurelia_dependency_injection_1.inject(Element), 
            __metadata('design:paramtypes', [Element])
        ], PushpinElement);
        return PushpinElement;
    }());
    exports.PushpinElement = PushpinElement;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImphdmFzY3JpcHQvcHVzaHBpbi9wdXNocGluRWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQU9BO1FBV0ksd0JBQW9CLE9BQWdCO1lBQWhCLFlBQU8sR0FBUCxPQUFPLENBQVM7WUFSN0IsV0FBTSxHQUFHLFFBQVEsQ0FBQztZQUdsQixXQUFNLEdBQUcsQ0FBQyxDQUFDO1lBR1gsUUFBRyxHQUFHLENBQUMsQ0FBQztRQUdmLENBQUM7UUFFTSxpQ0FBUSxHQUFmO1lBQ0ksSUFBSSxPQUFPLEdBQUc7Z0JBQ1YsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25CLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRzthQUNoQixDQUFDO1lBRUYsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsQ0FBQztRQXBCRDtZQUFDLDRCQUFRLEVBQUU7O3NEQUFBO1FBR1g7WUFBQyw0QkFBUSxFQUFFOztzREFBQTtRQUdYO1lBQUMsNEJBQVEsRUFBRTs7bURBQUE7UUFYZjtZQUFDLGlDQUFhLENBQUMsZUFBTSxDQUFDLE9BQU8sQ0FBQztZQUM3Qiw4QkFBVSxDQUFDLDBDQUEwQyxDQUFDO1lBQ3RELHFDQUFNLENBQUMsT0FBTyxDQUFDOzswQkFBQTtRQXdCaEIscUJBQUM7SUFBRCxDQXZCQSxBQXVCQyxJQUFBO0lBdkJZLHNCQUFjLGlCQXVCMUIsQ0FBQSIsImZpbGUiOiJqYXZhc2NyaXB0L3B1c2hwaW4vcHVzaHBpbkVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjdXN0b21FbGVtZW50LCBpbmxpbmVWaWV3LCBiaW5kYWJsZSB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiO1xyXG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvblwiO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi8uLi8uLi9jb25maWdcIjtcclxuXHJcbkBjdXN0b21FbGVtZW50KGNvbmZpZy5wdXNocGluKVxyXG5AaW5saW5lVmlldyhcIjx0ZW1wbGF0ZT48Y29udGVudD48L2NvbnRlbnQ+PC90ZW1wbGF0ZT5cIilcclxuQGluamVjdChFbGVtZW50KVxyXG5leHBvcnQgY2xhc3MgUHVzaHBpbkVsZW1lbnQge1xyXG5cclxuICAgIEBiaW5kYWJsZSgpXHJcbiAgICBwdWJsaWMgYm90dG9tID0gSW5maW5pdHk7XHJcblxyXG4gICAgQGJpbmRhYmxlKClcclxuICAgIHB1YmxpYyBvZmZzZXQgPSAwO1xyXG5cclxuICAgIEBiaW5kYWJsZSgpXHJcbiAgICBwdWJsaWMgdG9wID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnQpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXR0YWNoZWQoKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGJvdHRvbTogdGhpcy5ib3R0b20sXHJcbiAgICAgICAgICAgIG9mZnNldDogdGhpcy5vZmZzZXQsXHJcbiAgICAgICAgICAgIHRvcDogdGhpcy50b3AsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJCh0aGlzLmVsZW1lbnQpLnB1c2hwaW4ob3B0aW9ucyk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
