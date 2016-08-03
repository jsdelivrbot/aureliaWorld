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
    var IconElement = (function () {
        function IconElement() {
        }
        IconElement.prototype.attached = function () {
            this.element.classList.add("material-icons");
            this.element.classList.add(this.size);
            if (this.type !== "") {
                this.element.innerHTML = this.type;
            }
        };
        IconElement.prototype.detached = function () {
            this.element.classList.remove("material-icons");
            this.element.classList.remove(this.size);
            if (this.type !== "") {
                this.element.innerHTML = "";
            }
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultValue: "" }), 
            __metadata('design:type', String)
        ], IconElement.prototype, "type", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultValue: "small" }), 
            __metadata('design:type', String)
        ], IconElement.prototype, "size", void 0);
        IconElement = __decorate([
            aurelia_framework_1.customElement(config_1.config.icon),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView("<template><i ref='element'><content></content></i></template>"), 
            __metadata('design:paramtypes', [])
        ], IconElement);
        return IconElement;
    }());
    exports.IconElement = IconElement;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvaWNvbi9pY29uRWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQU1BO1FBQUE7UUEyQkEsQ0FBQztRQWpCVSw4QkFBUSxHQUFmO1lBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV0QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdkMsQ0FBQztRQUNMLENBQUM7UUFFTSw4QkFBUSxHQUFmO1lBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV6QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNoQyxDQUFDO1FBQ0wsQ0FBQztRQXhCRDtZQUFDLDRCQUFRLENBQUMsRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLENBQUM7O2lEQUFBO1FBRy9CO1lBQUMsNEJBQVEsQ0FBQyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsQ0FBQzs7aURBQUE7UUFSeEM7WUFBQyxpQ0FBYSxDQUFDLGVBQU0sQ0FBQyxJQUFJLENBQUM7WUFDMUIsaUNBQWEsRUFBRTtZQUNmLDhCQUFVLENBQUMsK0RBQStELENBQUM7O3VCQUFBO1FBNEI1RSxrQkFBQztJQUFELENBM0JBLEFBMkJDLElBQUE7SUEzQlksbUJBQVcsY0EyQnZCLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9pY29uL2ljb25FbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYmluZGFibGUsIGNvbnRhaW5lcmxlc3MsIGN1c3RvbUVsZW1lbnQsIGlubGluZVZpZXcgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIjtcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4vLi4vLi4vY29uZmlnXCI7XHJcblxyXG5AY3VzdG9tRWxlbWVudChjb25maWcuaWNvbilcclxuQGNvbnRhaW5lcmxlc3MoKVxyXG5AaW5saW5lVmlldyhcIjx0ZW1wbGF0ZT48aSByZWY9J2VsZW1lbnQnPjxjb250ZW50PjwvY29udGVudD48L2k+PC90ZW1wbGF0ZT5cIilcclxuZXhwb3J0IGNsYXNzIEljb25FbGVtZW50IHtcclxuXHJcbiAgICBAYmluZGFibGUoeyBkZWZhdWx0VmFsdWU6IFwiXCIgfSlcclxuICAgIHB1YmxpYyB0eXBlOiBzdHJpbmc7XHJcblxyXG4gICAgQGJpbmRhYmxlKHsgZGVmYXVsdFZhbHVlOiBcInNtYWxsXCIgfSlcclxuICAgIHB1YmxpYyBzaXplOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cclxuICAgIHB1YmxpYyBhdHRhY2hlZCgpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm1hdGVyaWFsLWljb25zXCIpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuc2l6ZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmlubmVySFRNTCA9IHRoaXMudHlwZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRldGFjaGVkKCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwibWF0ZXJpYWwtaWNvbnNcIik7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5zaXplKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
