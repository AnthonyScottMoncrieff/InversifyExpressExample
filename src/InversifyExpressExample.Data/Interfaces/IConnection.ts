export interface IConnection{
    getConnection(result: (connection) => void): void;
}