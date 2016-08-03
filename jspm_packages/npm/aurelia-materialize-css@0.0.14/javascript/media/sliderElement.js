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
    var SliderElement = (function () {
        function SliderElement() {
        }
        SliderElement.prototype.attached = function () {
            var options = { full_width: false };
            if (this.fullscreen) {
                this.sliderDiv.classList.add("fullscreen");
                options.full_width = true;
            }
            $(this.sliderDiv).slider(options);
        };
        SliderElement.prototype.detached = function () {
            this.sliderDiv.classList.remove("fullscreen");
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], SliderElement.prototype, "id", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime, defaultValue: false }), 
            __metadata('design:type', Boolean)
        ], SliderElement.prototype, "fullscreen", void 0);
        SliderElement = __decorate([
            aurelia_framework_1.customElement(config_1.config.slider),
            aurelia_framework_1.containerless,
            aurelia_framework_1.inlineView("<template><div class='slider' ref='sliderDiv' id='${id}'><ul class='slides'><content></content></ul></div></template>"), 
            __metadata('design:paramtypes', [])
        ], SliderElement);
        return SliderElement;
    }());
    exports.SliderElement = SliderElement;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImphdmFzY3JpcHQvbWVkaWEvc2xpZGVyRWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQU1BO1FBQUE7UUF5QkEsQ0FBQztRQWZVLGdDQUFRLEdBQWY7WUFFSSxJQUFJLE9BQU8sR0FBRyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQztZQUVwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUMzQyxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUM5QixDQUFDO1lBRUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVNLGdDQUFRLEdBQWY7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQXRCRDtZQUFDLDRCQUFRLEVBQUU7O2lEQUFBO1FBR1g7WUFBQyw0QkFBUSxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsK0JBQVcsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxDQUFDOzt5REFBQTtRQVIvRTtZQUFDLGlDQUFhLENBQUMsZUFBTSxDQUFDLE1BQU0sQ0FBQztZQUM1QixpQ0FBYTtZQUNiLDhCQUFVLENBQUMsdUhBQXVILENBQUM7O3lCQUFBO1FBMEJwSSxvQkFBQztJQUFELENBekJBLEFBeUJDLElBQUE7SUF6QlkscUJBQWEsZ0JBeUJ6QixDQUFBIiwiZmlsZSI6ImphdmFzY3JpcHQvbWVkaWEvc2xpZGVyRWxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJpbmRhYmxlLCBiaW5kaW5nTW9kZSwgY29udGFpbmVybGVzcywgY3VzdG9tRWxlbWVudCwgaW5saW5lVmlldyB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi8uLi8uLi9jb25maWdcIjtcclxuXHJcbkBjdXN0b21FbGVtZW50KGNvbmZpZy5zbGlkZXIpXHJcbkBjb250YWluZXJsZXNzXHJcbkBpbmxpbmVWaWV3KFwiPHRlbXBsYXRlPjxkaXYgY2xhc3M9J3NsaWRlcicgcmVmPSdzbGlkZXJEaXYnIGlkPScke2lkfSc+PHVsIGNsYXNzPSdzbGlkZXMnPjxjb250ZW50PjwvY29udGVudD48L3VsPjwvZGl2PjwvdGVtcGxhdGU+XCIpXHJcbmV4cG9ydCBjbGFzcyBTbGlkZXJFbGVtZW50IHtcclxuXHJcbiAgICBAYmluZGFibGUoKVxyXG4gICAgcHVibGljIGlkOiBzdHJpbmc7XHJcblxyXG4gICAgQGJpbmRhYmxlKHsgZGVmYXVsdEJpbmRpbmdNb2RlOiBiaW5kaW5nTW9kZS5vbmVUaW1lLCBkZWZhdWx0VmFsdWU6IGZhbHNlIH0pXHJcbiAgICBwdWJsaWMgZnVsbHNjcmVlbjogYm9vbGVhbjtcclxuXHJcbiAgICBwdWJsaWMgc2xpZGVyRGl2OiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBwdWJsaWMgYXR0YWNoZWQoKSB7XHJcblxyXG4gICAgICAgIGxldCBvcHRpb25zID0geyBmdWxsX3dpZHRoOiBmYWxzZSB9O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5mdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyRGl2LmNsYXNzTGlzdC5hZGQoXCJmdWxsc2NyZWVuXCIpO1xyXG4gICAgICAgICAgICBvcHRpb25zLmZ1bGxfd2lkdGggPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCh0aGlzLnNsaWRlckRpdikuc2xpZGVyKG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXRhY2hlZCgpIHtcclxuICAgICAgICB0aGlzLnNsaWRlckRpdi5jbGFzc0xpc3QucmVtb3ZlKFwiZnVsbHNjcmVlblwiKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
