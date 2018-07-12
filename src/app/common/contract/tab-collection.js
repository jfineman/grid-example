"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TabCollection = /** @class */ (function () {
    function TabCollection(_userContext) {
        this.tabs = [
            {
                id: 'EnterDataTab',
                name: 'Enter Data',
                canView: true,
                route: 'enterdata'
            },
            {
                id: 'EditDataTab',
                name: 'Edit Data',
                canView: true,
                route: 'editdata'
            },
            {
                id: 'CompileReportTab',
                name: 'Compile Report',
                canView: _userContext.CanCompileReports,
                route: 'compilereport'
            },
            {
                id: 'AdministrationTab',
                name: 'Administration',
                canView: _userContext.CanAdministerProjects,
                route: 'administration'
            },
            {
                id: 'SysAdminTab',
                name: 'SysAdmin',
                canView: _userContext.IsSysAdmin,
                route: 'sysadmin'
            }
        ];
    }
    return TabCollection;
}());
exports.TabCollection = TabCollection;
//# sourceMappingURL=tab-collection.js.map