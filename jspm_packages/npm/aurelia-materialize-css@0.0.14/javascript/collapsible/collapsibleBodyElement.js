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
    var CollapsibleBodyElement = (function () {
        function CollapsibleBodyElement() {
        }
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', String)
        ], CollapsibleBodyElement.prototype, "class", void 0);
        CollapsibleBodyElement = __decorate([
            aurelia_framework_1.customElement(config_1.config.collapsibleBody),
            aurelia_framework_1.containerless,
            aurelia_framework_1.inlineView("<template><div class='collapsible-body ${class}'><content></content></div></template>"), 
            __metadata('design:paramtypes', [])
        ], CollapsibleBodyElement);
        return CollapsibleBodyElement;
    }());
    exports.CollapsibleBodyElement = CollapsibleBodyElement;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImphdmFzY3JpcHQvY29sbGFwc2libGUvY29sbGFwc2libGVCb2R5RWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQU1BO1FBQUE7UUFHQSxDQUFDO1FBRkc7WUFBQyw0QkFBUTs7NkRBQUE7UUFKYjtZQUFDLGlDQUFhLENBQUMsZUFBTSxDQUFDLGVBQWUsQ0FBQztZQUNyQyxpQ0FBYTtZQUNiLDhCQUFVLENBQUMsdUZBQXVGLENBQUM7O2tDQUFBO1FBSXBHLDZCQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFIWSw4QkFBc0IseUJBR2xDLENBQUEiLCJmaWxlIjoiamF2YXNjcmlwdC9jb2xsYXBzaWJsZS9jb2xsYXBzaWJsZUJvZHlFbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3VzdG9tRWxlbWVudCwgY29udGFpbmVybGVzcywgaW5saW5lVmlldywgYmluZGFibGUgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIjtcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4vLi4vLi4vY29uZmlnXCI7XHJcblxyXG5AY3VzdG9tRWxlbWVudChjb25maWcuY29sbGFwc2libGVCb2R5KVxyXG5AY29udGFpbmVybGVzc1xyXG5AaW5saW5lVmlldyhcIjx0ZW1wbGF0ZT48ZGl2IGNsYXNzPSdjb2xsYXBzaWJsZS1ib2R5ICR7Y2xhc3N9Jz48Y29udGVudD48L2NvbnRlbnQ+PC9kaXY+PC90ZW1wbGF0ZT5cIilcclxuZXhwb3J0IGNsYXNzIENvbGxhcHNpYmxlQm9keUVsZW1lbnQge1xyXG4gICAgQGJpbmRhYmxlXHJcbiAgICBwdWJsaWMgY2xhc3M6IHN0cmluZztcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
