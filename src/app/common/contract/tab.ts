export class Tab {
    id: string;
    name: string;
    canView?: boolean;
    canViewFn?: (prop?: any) => boolean;
    route?: string;
    dirty?:boolean;
}