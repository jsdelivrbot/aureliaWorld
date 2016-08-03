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
    var SlideElement = (function () {
        function SlideElement() {
        }
        SlideElement = __decorate([
            aurelia_framework_1.customElement(config_1.config.slide),
            aurelia_framework_1.containerless,
            aurelia_framework_1.inlineView("<template><li><content></content></li></template>"), 
            __metadata('design:paramtypes', [])
        ], SlideElement);
        return SlideElement;
    }());
    exports.SlideElement = SlideElement;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImphdmFzY3JpcHQvbWVkaWEvc2xpZGVFbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBTUE7UUFBQTtRQUVBLENBQUM7UUFMRDtZQUFDLGlDQUFhLENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQztZQUMzQixpQ0FBYTtZQUNiLDhCQUFVLENBQUMsbURBQW1ELENBQUM7O3dCQUFBO1FBR2hFLG1CQUFDO0lBQUQsQ0FGQSxBQUVDLElBQUE7SUFGWSxvQkFBWSxlQUV4QixDQUFBIiwiZmlsZSI6ImphdmFzY3JpcHQvbWVkaWEvc2xpZGVFbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3VzdG9tRWxlbWVudCwgY29udGFpbmVybGVzcywgaW5saW5lVmlldyB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiO1xyXG5pbXBvcnQge2NvbmZpZ30gZnJvbSBcIi4vLi4vLi4vY29uZmlnXCI7XHJcblxyXG5AY3VzdG9tRWxlbWVudChjb25maWcuc2xpZGUpXHJcbkBjb250YWluZXJsZXNzXHJcbkBpbmxpbmVWaWV3KFwiPHRlbXBsYXRlPjxsaT48Y29udGVudD48L2NvbnRlbnQ+PC9saT48L3RlbXBsYXRlPlwiKVxyXG5leHBvcnQgY2xhc3MgU2xpZGVFbGVtZW50IHtcclxuXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
