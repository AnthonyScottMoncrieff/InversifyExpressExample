export abstract class Symbols {
    public static Logger: symbol = Symbol.for("Logger");
    public static AppSettings: symbol = Symbol.for("AppSettings");
    public static TemperatureManager: symbol = Symbol.for('TemperatureManager');
}