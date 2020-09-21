import { injectable } from "inversify";
import { ILogger } from "./Interfaces/ILogger";
import { ExceptionlessClient } from "exceptionless";

@injectable()
export class Logger implements ILogger {

    private readonly _exceptionlessClient: ExceptionlessClient;
    private readonly _logCollection: { message: string, errorLevel: string }[];

    public constructor(exceptionlessClient: ExceptionlessClient) {
        this._exceptionlessClient = exceptionlessClient;
        this._logCollection = [];
    }

    public LogInfo(info: string): void {
        console.log(info);
        this._logCollection.push({ message: info, errorLevel: "Info" });
    }

    public LogError(info: string): void {
        console.log(`Error: ${info}`);
        this._logCollection.push({ message: info, errorLevel: "Error" });
    }

    public LogException(error: Error): void {
        console.log(`Error: ${error.message} ${error.stack}`);
        this._exceptionlessClient.submitException(error);
    }

    public async Commit(executionContext: string): Promise<void> {

        this._exceptionlessClient.createLog(null, executionContext, this._logCollection.map(x => x.errorLevel).indexOf("Error") == -1 ? "Info" : "Error")
            .setProperty("Details", this._logCollection.map(x => `${x.errorLevel} - ${x.message}`).join('\n')).submit();
        this._exceptionlessClient.config.queue.process(true);
    }
}