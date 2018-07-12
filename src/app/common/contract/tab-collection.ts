import { Tab } from "./tab";
import { UserContext } from "./user-context";

export class TabCollection {
    tabs: Tab[];

    constructor(_userContext: UserContext) {
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
}