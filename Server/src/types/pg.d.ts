declare module 'pg' {
  export interface ClientConfig {
    host?: string
    port?: number
    user?: string
    password?: string
    database?: string
  }

  export class Client {
    constructor(config: ClientConfig)
    connect(): Promise<void>
    query(text: string, values?: any[]): Promise<any>
    end(): Promise<void>
  }
}
