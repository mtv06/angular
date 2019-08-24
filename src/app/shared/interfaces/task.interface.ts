export interface Task {
    Id: number;
    TaskNumber: string;
    TaskDate: string;
    ClaimId: number;
    BrigadeId: number;
    Claim: string;
    Brigade: string;
    TaskStaging: string;
    BrigadeConfirmation: boolean;
    BrigadeNote: string;
    BrigadeMark: string;
}
