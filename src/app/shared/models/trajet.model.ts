import { Bus } from "./bus.model";

export interface Trajet {
    id: number;
    nbrPlaces: number;
    departureTime: Date;
    bus: Bus;
}