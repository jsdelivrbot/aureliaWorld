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
    var ModelContentElement = (function () {
        function ModelContentElement() {
        }
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', String)
        ], ModelContentElement.prototype, "class", void 0);
        ModelContentElement = __decorate([
            aurelia_framework_1.customElement(config_1.config.modalContent),
            aurelia_framework_1.containerless,
            aurelia_framework_1.inlineView("<template><div class='modal-content ${class}'><content></content></div></template>"), 
            __metadata('design:paramtypes', [])
        ], ModelContentElement);
        return ModelContentElement;
    }());
    exports.ModelContentElement = ModelContentElement;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImphdmFzY3JpcHQvbW9kYWxzL21vZGFsQ29udGVudEVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFNQTtRQUFBO1FBR0EsQ0FBQztRQUZHO1lBQUMsNEJBQVE7OzBEQUFBO1FBSmI7WUFBQyxpQ0FBYSxDQUFDLGVBQU0sQ0FBQyxZQUFZLENBQUM7WUFDbEMsaUNBQWE7WUFDYiw4QkFBVSxDQUFDLG9GQUFvRixDQUFDOzsrQkFBQTtRQUlqRywwQkFBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBSFksMkJBQW1CLHNCQUcvQixDQUFBIiwiZmlsZSI6ImphdmFzY3JpcHQvbW9kYWxzL21vZGFsQ29udGVudEVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjdXN0b21FbGVtZW50LCBjb250YWluZXJsZXNzLCBpbmxpbmVWaWV3LCBiaW5kYWJsZSB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi8uLi8uLi9jb25maWdcIjtcclxuXHJcbkBjdXN0b21FbGVtZW50KGNvbmZpZy5tb2RhbENvbnRlbnQpXHJcbkBjb250YWluZXJsZXNzXHJcbkBpbmxpbmVWaWV3KFwiPHRlbXBsYXRlPjxkaXYgY2xhc3M9J21vZGFsLWNvbnRlbnQgJHtjbGFzc30nPjxjb250ZW50PjwvY29udGVudD48L2Rpdj48L3RlbXBsYXRlPlwiKVxyXG5leHBvcnQgY2xhc3MgTW9kZWxDb250ZW50RWxlbWVudCB7XHJcbiAgICBAYmluZGFibGVcclxuICAgIHB1YmxpYyBjbGFzczogc3RyaW5nO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
