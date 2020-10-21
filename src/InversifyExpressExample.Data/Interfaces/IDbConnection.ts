export interface IDbConnection{
    GetConnection(result: (connection) => void): void;
}