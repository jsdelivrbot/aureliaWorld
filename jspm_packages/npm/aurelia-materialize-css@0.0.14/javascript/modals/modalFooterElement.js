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
    var ModelFooterElement = (function () {
        function ModelFooterElement() {
        }
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', String)
        ], ModelFooterElement.prototype, "class", void 0);
        ModelFooterElement = __decorate([
            aurelia_framework_1.customElement(config_1.config.modalFooter),
            aurelia_framework_1.containerless,
            aurelia_framework_1.inlineView("<template><div class='modal-footer ${class}'><content></content></div></template>"), 
            __metadata('design:paramtypes', [])
        ], ModelFooterElement);
        return ModelFooterElement;
    }());
    exports.ModelFooterElement = ModelFooterElement;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImphdmFzY3JpcHQvbW9kYWxzL21vZGFsRm9vdGVyRWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQU1BO1FBQUE7UUFHQSxDQUFDO1FBRkc7WUFBQyw0QkFBUTs7eURBQUE7UUFKYjtZQUFDLGlDQUFhLENBQUMsZUFBTSxDQUFDLFdBQVcsQ0FBQztZQUNqQyxpQ0FBYTtZQUNiLDhCQUFVLENBQUMsbUZBQW1GLENBQUM7OzhCQUFBO1FBSWhHLHlCQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFIWSwwQkFBa0IscUJBRzlCLENBQUEiLCJmaWxlIjoiamF2YXNjcmlwdC9tb2RhbHMvbW9kYWxGb290ZXJFbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYmluZGFibGUsIGN1c3RvbUVsZW1lbnQsIGNvbnRhaW5lcmxlc3MsIGlubGluZVZpZXcgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIjtcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4vLi4vLi4vY29uZmlnXCI7XHJcblxyXG5AY3VzdG9tRWxlbWVudChjb25maWcubW9kYWxGb290ZXIpXHJcbkBjb250YWluZXJsZXNzXHJcbkBpbmxpbmVWaWV3KFwiPHRlbXBsYXRlPjxkaXYgY2xhc3M9J21vZGFsLWZvb3RlciAke2NsYXNzfSc+PGNvbnRlbnQ+PC9jb250ZW50PjwvZGl2PjwvdGVtcGxhdGU+XCIpXHJcbmV4cG9ydCBjbGFzcyBNb2RlbEZvb3RlckVsZW1lbnQge1xyXG4gICAgQGJpbmRhYmxlXHJcbiAgICBwdWJsaWMgY2xhc3M6IHN0cmluZztcclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
