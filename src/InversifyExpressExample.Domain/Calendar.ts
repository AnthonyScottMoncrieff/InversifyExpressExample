import { injectable } from "inversify";
import { ICalendar } from "./Interfaces/ICalendar";

@injectable()
export class Calendar implements ICalendar{
    Now(): Date {
        return new Date();
    }
    
}