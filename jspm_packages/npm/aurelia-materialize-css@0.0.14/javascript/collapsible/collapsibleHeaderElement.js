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
    var CollapsibleHeaderElement = (function () {
        function CollapsibleHeaderElement() {
        }
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', String)
        ], CollapsibleHeaderElement.prototype, "class", void 0);
        CollapsibleHeaderElement = __decorate([
            aurelia_framework_1.customElement(config_1.config.collapsibleHeader),
            aurelia_framework_1.containerless,
            aurelia_framework_1.inlineView("<template><div class='collapsible-header ${class}'><content></content></div></template>"), 
            __metadata('design:paramtypes', [])
        ], CollapsibleHeaderElement);
        return CollapsibleHeaderElement;
    }());
    exports.CollapsibleHeaderElement = CollapsibleHeaderElement;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImphdmFzY3JpcHQvY29sbGFwc2libGUvY29sbGFwc2libGVIZWFkZXJFbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBTUE7UUFBQTtRQUdBLENBQUM7UUFGRztZQUFDLDRCQUFROzsrREFBQTtRQUpiO1lBQUMsaUNBQWEsQ0FBQyxlQUFNLENBQUMsaUJBQWlCLENBQUM7WUFDdkMsaUNBQWE7WUFDYiw4QkFBVSxDQUFDLHlGQUF5RixDQUFDOztvQ0FBQTtRQUl0RywrQkFBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBSFksZ0NBQXdCLDJCQUdwQyxDQUFBIiwiZmlsZSI6ImphdmFzY3JpcHQvY29sbGFwc2libGUvY29sbGFwc2libGVIZWFkZXJFbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3VzdG9tRWxlbWVudCwgY29udGFpbmVybGVzcywgaW5saW5lVmlldywgYmluZGFibGUgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIjtcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4vLi4vLi4vY29uZmlnXCI7XHJcblxyXG5AY3VzdG9tRWxlbWVudChjb25maWcuY29sbGFwc2libGVIZWFkZXIpXHJcbkBjb250YWluZXJsZXNzXHJcbkBpbmxpbmVWaWV3KFwiPHRlbXBsYXRlPjxkaXYgY2xhc3M9J2NvbGxhcHNpYmxlLWhlYWRlciAke2NsYXNzfSc+PGNvbnRlbnQ+PC9jb250ZW50PjwvZGl2PjwvdGVtcGxhdGU+XCIpXHJcbmV4cG9ydCBjbGFzcyBDb2xsYXBzaWJsZUhlYWRlckVsZW1lbnQge1xyXG4gICAgQGJpbmRhYmxlXHJcbiAgICBwdWJsaWMgY2xhc3M6IHN0cmluZztcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
