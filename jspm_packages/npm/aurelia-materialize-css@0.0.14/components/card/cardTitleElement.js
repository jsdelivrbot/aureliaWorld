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
    var CardTitleElement = (function () {
        function CardTitleElement() {
        }
        CardTitleElement.prototype.attached = function () {
            this.element.classList.add("card-title");
        };
        CardTitleElement.prototype.detached = function () {
            this.element.classList.remove("card-title");
        };
        CardTitleElement = __decorate([
            aurelia_framework_1.customElement(config_1.config.cardTitle),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView("<template><div ref='element'><content></content></div></template>"), 
            __metadata('design:paramtypes', [])
        ], CardTitleElement);
        return CardTitleElement;
    }());
    exports.CardTitleElement = CardTitleElement;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2FyZC9jYXJkVGl0bGVFbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBTUE7UUFBQTtRQVdBLENBQUM7UUFQVSxtQ0FBUSxHQUFmO1lBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFFTSxtQ0FBUSxHQUFmO1lBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFiTDtZQUFDLGlDQUFhLENBQUMsZUFBTSxDQUFDLFNBQVMsQ0FBQztZQUMvQixpQ0FBYSxFQUFFO1lBQ2YsOEJBQVUsQ0FBQyxtRUFBbUUsQ0FBQzs7NEJBQUE7UUFZaEYsdUJBQUM7SUFBRCxDQVhBLEFBV0MsSUFBQTtJQVhZLHdCQUFnQixtQkFXNUIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2NhcmQvY2FyZFRpdGxlRWxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGN1c3RvbUVsZW1lbnQsIGNvbnRhaW5lcmxlc3MsIGlubGluZVZpZXcgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIjtcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4vLi4vLi4vY29uZmlnXCI7XHJcblxyXG5AY3VzdG9tRWxlbWVudChjb25maWcuY2FyZFRpdGxlKVxyXG5AY29udGFpbmVybGVzcygpXHJcbkBpbmxpbmVWaWV3KFwiPHRlbXBsYXRlPjxkaXYgcmVmPSdlbGVtZW50Jz48Y29udGVudD48L2NvbnRlbnQ+PC9kaXY+PC90ZW1wbGF0ZT5cIilcclxuZXhwb3J0IGNsYXNzIENhcmRUaXRsZUVsZW1lbnQge1xyXG5cclxuICAgIHB1YmxpYyBlbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBwdWJsaWMgYXR0YWNoZWQoKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjYXJkLXRpdGxlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXRhY2hlZCgpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImNhcmQtdGl0bGVcIik7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
