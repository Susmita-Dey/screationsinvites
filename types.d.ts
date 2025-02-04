import {Connection} from "mongoose";

// global is a context available to the whole application 
declare global{
    var mongoose:{
        conn: Connection | null;
        promise: Promise<Connection>|null;
    }
}

export {};