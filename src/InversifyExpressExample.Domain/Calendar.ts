import { ICalendar } from "./Interfaces/ICalendar";

export class Calendar implements ICalendar{
    Now(): Date {
        return new Date();
    }
    
}