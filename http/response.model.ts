interface Res {
    data: object;
}
export interface Response {
    code: number;
    data: Res | [Res];
    message: string;
    status: boolean;
    type: string;
}
