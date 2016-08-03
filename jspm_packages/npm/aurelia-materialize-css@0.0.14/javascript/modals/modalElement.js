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
    var ModalElement = (function () {
        function ModalElement() {
            this.id = null;
        }
        ModalElement.prototype.attached = function () {
            if (!this.id || this.id.trim().length === 0) {
                throw new Error(("id is a required attribute for the element " + config_1.config.modal + ", ") +
                    ("you need to set it on your modal trigger(" + config_1.config.modalTrigger + ")."));
            }
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime }), 
            __metadata('design:type', String)
        ], ModalElement.prototype, "id", void 0);
        ModalElement = __decorate([
            aurelia_framework_1.customElement(config_1.config.modal),
            aurelia_framework_1.inlineView("<template><content></content></template>"), 
            __metadata('design:paramtypes', [])
        ], ModalElement);
        return ModalElement;
    }());
    exports.ModalElement = ModalElement;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImphdmFzY3JpcHQvbW9kYWxzL21vZGFsRWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUtBO1FBQUE7WUFHVyxPQUFFLEdBQVcsSUFBSSxDQUFDO1FBUTdCLENBQUM7UUFOVSwrQkFBUSxHQUFmO1lBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFDLE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQThDLGVBQU0sQ0FBQyxLQUFLLFFBQUk7b0JBQzlELCtDQUE0QyxlQUFNLENBQUMsWUFBWSxRQUFJLENBQUMsQ0FBQztZQUN6RixDQUFDO1FBQ0wsQ0FBQztRQVJEO1lBQUMsNEJBQVEsQ0FBQyxFQUFFLGtCQUFrQixFQUFFLCtCQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7O2dEQUFBO1FBSjFEO1lBQUMsaUNBQWEsQ0FBQyxlQUFNLENBQUMsS0FBSyxDQUFDO1lBQzNCLDhCQUFVLENBQUMsMENBQTBDLENBQUM7O3dCQUFBO1FBWXZELG1CQUFDO0lBQUQsQ0FYQSxBQVdDLElBQUE7SUFYWSxvQkFBWSxlQVd4QixDQUFBIiwiZmlsZSI6ImphdmFzY3JpcHQvbW9kYWxzL21vZGFsRWxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJpbmRhYmxlLCBiaW5kaW5nTW9kZSwgY3VzdG9tRWxlbWVudCwgaW5saW5lVmlldyB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi8uLi8uLi9jb25maWdcIjtcclxuXHJcbkBjdXN0b21FbGVtZW50KGNvbmZpZy5tb2RhbClcclxuQGlubGluZVZpZXcoXCI8dGVtcGxhdGU+PGNvbnRlbnQ+PC9jb250ZW50PjwvdGVtcGxhdGU+XCIpXHJcbmV4cG9ydCBjbGFzcyBNb2RhbEVsZW1lbnQge1xyXG5cclxuICAgIEBiaW5kYWJsZSh7IGRlZmF1bHRCaW5kaW5nTW9kZTogYmluZGluZ01vZGUub25lVGltZSB9KVxyXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBhdHRhY2hlZCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaWQgfHwgdGhpcy5pZC50cmltKCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaWQgaXMgYSByZXF1aXJlZCBhdHRyaWJ1dGUgZm9yIHRoZSBlbGVtZW50ICR7Y29uZmlnLm1vZGFsfSwgYCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgeW91IG5lZWQgdG8gc2V0IGl0IG9uIHlvdXIgbW9kYWwgdHJpZ2dlcigke2NvbmZpZy5tb2RhbFRyaWdnZXJ9KS5gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
