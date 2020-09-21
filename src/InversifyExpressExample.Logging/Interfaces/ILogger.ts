export interface ILogger{
    LogInfo(info: string) : void;
    Commit(executionContext: string) : Promise<void>;
    LogException(error: Error) : void;
    LogError(info: string) : void
}