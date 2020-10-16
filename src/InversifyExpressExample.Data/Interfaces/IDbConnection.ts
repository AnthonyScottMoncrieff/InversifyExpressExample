export interface IDbConnection{
    getConnection(result: (connection) => void): void;
}