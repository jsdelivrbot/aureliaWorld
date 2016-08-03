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
    var DropdownAttribute = (function () {
        function DropdownAttribute(element) {
            this.element = element;
        }
        DropdownAttribute.prototype.attached = function () {
            var options = {
                alignment: this.alignment,
                belowOrigin: this.belowOrigin,
                constrain_width: this.constrainWidth,
                gutter: this.gutter,
                hover: this.hover,
                inDuration: this.inDuration,
                outDuration: this.outDuration,
            };
            this.element.classList.add("dropdown-button");
            $(this.element).dropdown(options);
        };
        DropdownAttribute.prototype.detached = function () {
            this.element.classList.remove("dropdown-button");
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', String)
        ], DropdownAttribute.prototype, "title", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime, defaultValue: "left" }), 
            __metadata('design:type', String)
        ], DropdownAttribute.prototype, "alignment", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime, defaultValue: false }), 
            __metadata('design:type', Boolean)
        ], DropdownAttribute.prototype, "belowOrigin", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime, defaultValue: true }), 
            __metadata('design:type', Boolean)
        ], DropdownAttribute.prototype, "constrainWidth", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime, defaultValue: 0 }), 
            __metadata('design:type', Number)
        ], DropdownAttribute.prototype, "gutter", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime, defaultValue: false }), 
            __metadata('design:type', Boolean)
        ], DropdownAttribute.prototype, "hover", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime, defaultValue: 300 }), 
            __metadata('design:type', Number)
        ], DropdownAttribute.prototype, "inDuration", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.oneTime, defaultValue: 225 }), 
            __metadata('design:type', Number)
        ], DropdownAttribute.prototype, "outDuration", void 0);
        DropdownAttribute = __decorate([
            aurelia_framework_1.customAttribute(config_1.config.dropdown),
            aurelia_dependency_injection_1.inject(Element), 
            __metadata('design:paramtypes', [Element])
        ], DropdownAttribute);
        return DropdownAttribute;
    }());
    exports.DropdownAttribute = DropdownAttribute;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImphdmFzY3JpcHQvZHJvcGRvd24vZHJvcGRvd25BdHRyaWJ1dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFPQTtRQUVJLDJCQUFvQixPQUFnQjtZQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ3BDLENBQUM7UUEwQk0sb0NBQVEsR0FBZjtZQUVJLElBQUksT0FBTyxHQUFnQztnQkFDdkMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO2dCQUN6QixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQzdCLGVBQWUsRUFBRSxJQUFJLENBQUMsY0FBYztnQkFDcEMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtnQkFDM0IsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO2FBQ2hDLENBQUM7WUFFRixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM5QyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBRU0sb0NBQVEsR0FBZjtZQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUExQ0Q7WUFBQyw0QkFBUSxFQUFFOzt3REFBQTtRQUdYO1lBQUMsNEJBQVEsQ0FBQyxFQUFFLGtCQUFrQixFQUFFLCtCQUFXLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUMsQ0FBQzs7NERBQUE7UUFHM0U7WUFBQyw0QkFBUSxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsK0JBQVcsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxDQUFDOzs4REFBQTtRQUczRTtZQUFDLDRCQUFRLENBQUMsRUFBRSxrQkFBa0IsRUFBRSwrQkFBVyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUM7O2lFQUFBO1FBRzFFO1lBQUMsNEJBQVEsQ0FBQyxFQUFFLGtCQUFrQixFQUFFLCtCQUFXLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQzs7eURBQUE7UUFHdkU7WUFBQyw0QkFBUSxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsK0JBQVcsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxDQUFDOzt3REFBQTtRQUczRTtZQUFDLDRCQUFRLENBQUMsRUFBRSxrQkFBa0IsRUFBRSwrQkFBVyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLENBQUM7OzZEQUFBO1FBR3pFO1lBQUMsNEJBQVEsQ0FBQyxFQUFFLGtCQUFrQixFQUFFLCtCQUFXLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsQ0FBQzs7OERBQUE7UUE1QjdFO1lBQUMsbUNBQWUsQ0FBQyxlQUFNLENBQUMsUUFBUSxDQUFDO1lBQ2hDLHFDQUFNLENBQUMsT0FBTyxDQUFDOzs2QkFBQTtRQWlEaEIsd0JBQUM7SUFBRCxDQWhEQSxBQWdEQyxJQUFBO0lBaERZLHlCQUFpQixvQkFnRDdCLENBQUEiLCJmaWxlIjoiamF2YXNjcmlwdC9kcm9wZG93bi9kcm9wZG93bkF0dHJpYnV0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBjdXN0b21BdHRyaWJ1dGUsIGJpbmRhYmxlLCBiaW5kaW5nTW9kZSB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiO1xyXG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvblwiO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi8uLi8uLi9jb25maWdcIjtcclxuXHJcbkBjdXN0b21BdHRyaWJ1dGUoY29uZmlnLmRyb3Bkb3duKVxyXG5AaW5qZWN0KEVsZW1lbnQpXHJcbmV4cG9ydCBjbGFzcyBEcm9wZG93bkF0dHJpYnV0ZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50KSB7XHJcbiAgICB9XHJcblxyXG4gICAgQGJpbmRhYmxlKClcclxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG5cclxuICAgIEBiaW5kYWJsZSh7IGRlZmF1bHRCaW5kaW5nTW9kZTogYmluZGluZ01vZGUub25lVGltZSwgZGVmYXVsdFZhbHVlOiBcImxlZnRcIn0pXHJcbiAgICBwdWJsaWMgYWxpZ25tZW50OiBzdHJpbmc7XHJcblxyXG4gICAgQGJpbmRhYmxlKHsgZGVmYXVsdEJpbmRpbmdNb2RlOiBiaW5kaW5nTW9kZS5vbmVUaW1lLCBkZWZhdWx0VmFsdWU6IGZhbHNlIH0pXHJcbiAgICBwdWJsaWMgYmVsb3dPcmlnaW46IGJvb2xlYW47XHJcblxyXG4gICAgQGJpbmRhYmxlKHsgZGVmYXVsdEJpbmRpbmdNb2RlOiBiaW5kaW5nTW9kZS5vbmVUaW1lLCBkZWZhdWx0VmFsdWU6IHRydWUgfSlcclxuICAgIHB1YmxpYyBjb25zdHJhaW5XaWR0aDogYm9vbGVhbjtcclxuXHJcbiAgICBAYmluZGFibGUoeyBkZWZhdWx0QmluZGluZ01vZGU6IGJpbmRpbmdNb2RlLm9uZVRpbWUsIGRlZmF1bHRWYWx1ZTogMCB9KVxyXG4gICAgcHVibGljIGd1dHRlcjogbnVtYmVyO1xyXG5cclxuICAgIEBiaW5kYWJsZSh7IGRlZmF1bHRCaW5kaW5nTW9kZTogYmluZGluZ01vZGUub25lVGltZSwgZGVmYXVsdFZhbHVlOiBmYWxzZSB9KVxyXG4gICAgcHVibGljIGhvdmVyOiBib29sZWFuO1xyXG5cclxuICAgIEBiaW5kYWJsZSh7IGRlZmF1bHRCaW5kaW5nTW9kZTogYmluZGluZ01vZGUub25lVGltZSwgZGVmYXVsdFZhbHVlOiAzMDAgfSlcclxuICAgIHB1YmxpYyBpbkR1cmF0aW9uOiBudW1iZXI7XHJcblxyXG4gICAgQGJpbmRhYmxlKHsgZGVmYXVsdEJpbmRpbmdNb2RlOiBiaW5kaW5nTW9kZS5vbmVUaW1lLCBkZWZhdWx0VmFsdWU6IDIyNSB9KVxyXG4gICAgcHVibGljIG91dER1cmF0aW9uOiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGF0dGFjaGVkKCkge1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uczogTWF0ZXJpYWxpemUuRHJvcERvd25PcHRpb25zID0ge1xyXG4gICAgICAgICAgICBhbGlnbm1lbnQ6IHRoaXMuYWxpZ25tZW50LFxyXG4gICAgICAgICAgICBiZWxvd09yaWdpbjogdGhpcy5iZWxvd09yaWdpbixcclxuICAgICAgICAgICAgY29uc3RyYWluX3dpZHRoOiB0aGlzLmNvbnN0cmFpbldpZHRoLFxyXG4gICAgICAgICAgICBndXR0ZXI6IHRoaXMuZ3V0dGVyLFxyXG4gICAgICAgICAgICBob3ZlcjogdGhpcy5ob3ZlcixcclxuICAgICAgICAgICAgaW5EdXJhdGlvbjogdGhpcy5pbkR1cmF0aW9uLFxyXG4gICAgICAgICAgICBvdXREdXJhdGlvbjogdGhpcy5vdXREdXJhdGlvbixcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImRyb3Bkb3duLWJ1dHRvblwiKTtcclxuICAgICAgICAkKHRoaXMuZWxlbWVudCkuZHJvcGRvd24ob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRldGFjaGVkKCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJvcGRvd24tYnV0dG9uXCIpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
