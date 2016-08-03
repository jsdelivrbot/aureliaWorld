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
    var BadgeElement = (function () {
        function BadgeElement() {
        }
        BadgeElement.prototype.attached = function () {
            this.badge.classList.add("badge");
            if (this.new) {
                this.badge.classList.add("new");
            }
        };
        BadgeElement.prototype.detached = function () {
            this.badge.classList.remove("badge");
        };
        BadgeElement.prototype.newChanged = function () {
            (this.new) ? this.badge.classList.add("new") : this.badge.classList.remove("new");
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultValue: false }), 
            __metadata('design:type', String)
        ], BadgeElement.prototype, "new", void 0);
        BadgeElement = __decorate([
            aurelia_framework_1.customElement(config_1.config.badge),
            aurelia_framework_1.inlineView("<template><span ref='badge'><content></content></span></template>"), 
            __metadata('design:paramtypes', [])
        ], BadgeElement);
        return BadgeElement;
    }());
    exports.BadgeElement = BadgeElement;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYmFkZ2UvYmFkZ2VFbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBS0E7UUFBQTtRQXNCQSxDQUFDO1FBZlUsK0JBQVEsR0FBZjtZQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNsQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEMsQ0FBQztRQUNMLENBQUM7UUFFTSwrQkFBUSxHQUFmO1lBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFFTSxpQ0FBVSxHQUFqQjtZQUNJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEYsQ0FBQztRQWxCRDtZQUFDLDRCQUFRLENBQUMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLENBQUM7O2lEQUFBO1FBSnRDO1lBQUMsaUNBQWEsQ0FBQyxlQUFNLENBQUMsS0FBSyxDQUFDO1lBQzNCLDhCQUFVLENBQUMsbUVBQW1FLENBQUM7O3dCQUFBO1FBdUJoRixtQkFBQztJQUFELENBdEJBLEFBc0JDLElBQUE7SUF0Qlksb0JBQVksZUFzQnhCLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9iYWRnZS9iYWRnZUVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBiaW5kYWJsZSwgY3VzdG9tRWxlbWVudCwgaW5saW5lVmlldyB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi8uLi8uLi9jb25maWdcIjtcclxuXHJcbkBjdXN0b21FbGVtZW50KGNvbmZpZy5iYWRnZSlcclxuQGlubGluZVZpZXcoXCI8dGVtcGxhdGU+PHNwYW4gcmVmPSdiYWRnZSc+PGNvbnRlbnQ+PC9jb250ZW50Pjwvc3Bhbj48L3RlbXBsYXRlPlwiKVxyXG5leHBvcnQgY2xhc3MgQmFkZ2VFbGVtZW50IHtcclxuXHJcbiAgICBAYmluZGFibGUoeyBkZWZhdWx0VmFsdWU6IGZhbHNlIH0pXHJcbiAgICBwdWJsaWMgbmV3OiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGJhZGdlOiBIVE1MU3BhbkVsZW1lbnQ7XHJcblxyXG4gICAgcHVibGljIGF0dGFjaGVkKCkge1xyXG4gICAgICAgIHRoaXMuYmFkZ2UuY2xhc3NMaXN0LmFkZChcImJhZGdlXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLm5ldykge1xyXG4gICAgICAgICAgICB0aGlzLmJhZGdlLmNsYXNzTGlzdC5hZGQoXCJuZXdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXRhY2hlZCgpIHtcclxuICAgICAgICB0aGlzLmJhZGdlLmNsYXNzTGlzdC5yZW1vdmUoXCJiYWRnZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmV3Q2hhbmdlZCgpIHtcclxuICAgICAgICAodGhpcy5uZXcpID8gdGhpcy5iYWRnZS5jbGFzc0xpc3QuYWRkKFwibmV3XCIpIDogdGhpcy5iYWRnZS5jbGFzc0xpc3QucmVtb3ZlKFwibmV3XCIpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
