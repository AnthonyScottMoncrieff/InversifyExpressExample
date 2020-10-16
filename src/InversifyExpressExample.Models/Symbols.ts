export abstract class Symbols {
    public static Logger: symbol = Symbol.for("Logger");
    public static AppSettings: symbol = Symbol.for("AppSettings");
    public static TemperatureManager: symbol = Symbol.for('TemperatureManager');
    public static HttpClient: symbol = Symbol.for('HttpClient');
    public static TVShowRepository: symbol = Symbol.for('TVShowRepository');
    public static TvShowMapper: symbol = Symbol.for('TvShowMapper');
    public static AuthMiddleware: symbol = Symbol.for('AuthMiddleware');
    public static DbConnection: symbol = Symbol.for('DbConnection');
    public static DbClient: symbol = Symbol.for('DbClient');
    public static UserRepository: symbol = Symbol.for('UserRepository');
}