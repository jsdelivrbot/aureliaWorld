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
define(["require", "exports", "aurelia-framework", "aurelia-dependency-injection", "./../../config"], function (require, exports, aurelia_framework_1, aurelia_dependency_injection_1, config_1) {
    "use strict";
    var ButtonAttribute = (function () {
        function ButtonAttribute(element) {
            this.element = element;
            this.disabled = false;
            this.flat = false;
            this.floating = false;
            this.large = false;
        }
        ButtonAttribute.prototype.attached = function () {
            var _this = this;
            if (this.flat) {
                this.element.classList.add("btn-flat");
            }
            else if (this.floating) {
                this.element.classList.add("btn-floating");
            }
            else {
                this.element.classList.add("btn");
            }
            if (this.large) {
                this.element.classList.add("btn-large");
            }
            if (this.disabled) {
                this.element.classList.add("disabled");
            }
            this.element.classList.add("waves-effect");
            this.waves = this.waves.trim().toLowerCase();
            if (this.waves !== "") {
                if (!config_1.config.allowedWaves.some(function (val) { return val === _this.waves; })) {
                    throw new Error("Waves cannot be '" + this.waves + "', must be one of the following values " + config_1.config.allowedWaves.join(",") + ".");
                }
                this.element.classList.add("waves-" + this.waves);
            }
        };
        ButtonAttribute.prototype.detached = function () {
            var _this = this;
            this.element.classList.remove("btn-flat", "btn-floating", "btn-large", "btn", "disabled", "waves-effect");
            config_1.config.allowedWaves.map(function (val) { return "waves-" + val; }).forEach(function (val) { return _this.element.classList.remove(val); });
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], ButtonAttribute.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], ButtonAttribute.prototype, "flat", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], ButtonAttribute.prototype, "floating", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], ButtonAttribute.prototype, "large", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultValue: "" }), 
            __metadata('design:type', String)
        ], ButtonAttribute.prototype, "waves", void 0);
        ButtonAttribute = __decorate([
            aurelia_framework_1.customAttribute(config_1.config.button),
            aurelia_dependency_injection_1.inject(Element), 
            __metadata('design:paramtypes', [Element])
        ], ButtonAttribute);
        return ButtonAttribute;
    }());
    exports.ButtonAttribute = ButtonAttribute;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYnV0dG9uL2J1dHRvbkF0dHJpYnV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQU1BO1FBaUJJLHlCQUFvQixPQUFnQjtZQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1lBZDdCLGFBQVEsR0FBRyxLQUFLLENBQUM7WUFHakIsU0FBSSxHQUFHLEtBQUssQ0FBQztZQUdiLGFBQVEsR0FBRyxLQUFLLENBQUM7WUFHakIsVUFBSyxHQUFHLEtBQUssQ0FBQztRQU1yQixDQUFDO1FBRU0sa0NBQVEsR0FBZjtZQUFBLGlCQTRCQztZQTNCRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDWixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDM0MsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQy9DLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEMsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM1QyxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMzQyxDQUFDO1lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUU3QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRXBCLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEtBQUssS0FBSSxDQUFDLEtBQUssRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkQsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBb0IsSUFBSSxDQUFDLEtBQUssK0NBQTBDLGVBQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFHLENBQUMsQ0FBQztnQkFDOUgsQ0FBQztnQkFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0RCxDQUFDO1FBQ0wsQ0FBQztRQUVNLGtDQUFRLEdBQWY7WUFBQSxpQkFHQztZQUZHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQzFHLGVBQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsUUFBUSxHQUFHLEdBQUcsRUFBZCxDQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQWxDLENBQWtDLENBQUMsQ0FBQztRQUN0RyxDQUFDO1FBbkREO1lBQUMsNEJBQVEsRUFBRTs7eURBQUE7UUFHWDtZQUFDLDRCQUFRLEVBQUU7O3FEQUFBO1FBR1g7WUFBQyw0QkFBUSxFQUFFOzt5REFBQTtRQUdYO1lBQUMsNEJBQVEsRUFBRTs7c0RBQUE7UUFHWDtZQUFDLDRCQUFRLENBQUMsRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFDLENBQUM7O3NEQUFBO1FBaEJsQztZQUFDLG1DQUFlLENBQUMsZUFBTSxDQUFDLE1BQU0sQ0FBQztZQUM5QixxQ0FBTSxDQUFDLE9BQU8sQ0FBQzs7MkJBQUE7UUF1RGhCLHNCQUFDO0lBQUQsQ0F0REEsQUFzREMsSUFBQTtJQXREWSx1QkFBZSxrQkFzRDNCLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9idXR0b24vYnV0dG9uQXR0cmlidXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYmluZGFibGUsIGN1c3RvbUF0dHJpYnV0ZSB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiO1xyXG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvblwiO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi8uLi8uLi9jb25maWdcIjtcclxuXHJcbkBjdXN0b21BdHRyaWJ1dGUoY29uZmlnLmJ1dHRvbilcclxuQGluamVjdChFbGVtZW50KVxyXG5leHBvcnQgY2xhc3MgQnV0dG9uQXR0cmlidXRlIHtcclxuXHJcbiAgICBAYmluZGFibGUoKVxyXG4gICAgcHVibGljIGRpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gICAgQGJpbmRhYmxlKClcclxuICAgIHB1YmxpYyBmbGF0ID0gZmFsc2U7XHJcblxyXG4gICAgQGJpbmRhYmxlKClcclxuICAgIHB1YmxpYyBmbG9hdGluZyA9IGZhbHNlO1xyXG5cclxuICAgIEBiaW5kYWJsZSgpXHJcbiAgICBwdWJsaWMgbGFyZ2UgPSBmYWxzZTtcclxuXHJcbiAgICBAYmluZGFibGUoeyBkZWZhdWx0VmFsdWU6IFwiXCJ9KVxyXG4gICAgcHVibGljIHdhdmVzOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50KSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGF0dGFjaGVkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZsYXQpIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJidG4tZmxhdFwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZmxvYXRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJidG4tZmxvYXRpbmdcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJidG5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5sYXJnZSkge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImJ0bi1sYXJnZVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIndhdmVzLWVmZmVjdFwiKTtcclxuICAgICAgICB0aGlzLndhdmVzID0gdGhpcy53YXZlcy50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMud2F2ZXMgIT09IFwiXCIpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghY29uZmlnLmFsbG93ZWRXYXZlcy5zb21lKHZhbCA9PiB2YWwgPT09IHRoaXMud2F2ZXMpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFdhdmVzIGNhbm5vdCBiZSAnJHt0aGlzLndhdmVzfScsIG11c3QgYmUgb25lIG9mIHRoZSBmb2xsb3dpbmcgdmFsdWVzICR7Y29uZmlnLmFsbG93ZWRXYXZlcy5qb2luKFwiLFwiKX0uYCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwid2F2ZXMtXCIgKyB0aGlzLndhdmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRldGFjaGVkKCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYnRuLWZsYXRcIiwgXCJidG4tZmxvYXRpbmdcIiwgXCJidG4tbGFyZ2VcIiwgXCJidG5cIiwgXCJkaXNhYmxlZFwiLCBcIndhdmVzLWVmZmVjdFwiKTtcclxuICAgICAgICBjb25maWcuYWxsb3dlZFdhdmVzLm1hcCh2YWwgPT4gXCJ3YXZlcy1cIiArIHZhbCkuZm9yRWFjaCh2YWwgPT4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodmFsKSk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
