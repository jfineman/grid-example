import { AccessPriviledge } from "./access-privilege";

export class UserContext {
    AccessPriviledges?: AccessPriviledge[];
    IsHydrated?: boolean;
    UserId?: number;
    IsSignedIn?: boolean;
    IsSysAdmin?: boolean;
    NotSysAdmin?: boolean;
    CanCompileReports?: boolean;
    ViewSDPLocAutoSet?: boolean;
    FirstName?: string;
    LastName?: string;
    CanAdministerProjects?: boolean;
    UserName?: string;
    ClearContext?(): void;
    IsBetaTester?: boolean;
}