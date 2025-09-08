
import type { UnknownAction } from "redux";
import type { FilmNode, HallNode, SeanceNode, Ticket } from "../API/IvkAPI";
import { type SeanceHallProps } from "../../components/client/SeanceHall/SeanceHall";
import type { PaymentInfoProps } from "../../components/client/PaymentInfo/PaymentInfo";

// --------------------------
// ----- client actions -----
// --------------------------

export enum CLIENT_ACTION_STR {
    RESET_CLIENT = "RESET_CLIENT",
    SELECT_DATE = "SELECT_DATE",
    SET_SEANCE_HALL = "SET_SEANCE_HALL",
    SET_PAYMENT_INFO = "SET_PAYMENT_INFO",
    SET_TICKETS = "SET_TICKETS",
}


export interface ClientAction extends UnknownAction {
    type: CLIENT_ACTION_STR,
}

export interface SelectDateAction extends ClientAction {
    dateString: string
}
export interface SetSeanceHallAction extends ClientAction {
    seanceHallProps: SeanceHallProps 
}
export interface SetPaymentInfoAction extends ClientAction  {
    paymentInfoProps: PaymentInfoProps
}
export interface SetTicketsAction extends ClientAction {
    tickets: Ticket[]
}


export const resetClient = () => ({
    type: CLIENT_ACTION_STR.RESET_CLIENT
}) 
export const selectDate = (dateString: string): SelectDateAction => ({
    type: CLIENT_ACTION_STR.SELECT_DATE,
    dateString: dateString
})
export const setSeanceHall = (seanceHallProps: SeanceHallProps): SetSeanceHallAction => ({
    type: CLIENT_ACTION_STR.SET_SEANCE_HALL,
    seanceHallProps: seanceHallProps
})
export const setPaymentInfo = (paymentInfoProps: PaymentInfoProps): SetPaymentInfoAction => ({
    type: CLIENT_ACTION_STR.SET_PAYMENT_INFO,
    paymentInfoProps: paymentInfoProps
})
export const setTickets = (tickets: Ticket[]): SetTicketsAction => ({
    type: CLIENT_ACTION_STR.SET_TICKETS,
    tickets: tickets
})



// -------------------------
// ----- admin actions -----
// -------------------------

export enum ADMIN_ACTION_STR {
    LOG_IN = "LOG_IN",
    SET_HALLS = "SET_HALLS",
    SET_FILMS = "SET_FILMS",
    SET_SEANCES = "SET_SEANCES",
}


export interface AdminAction extends UnknownAction {
    type: ADMIN_ACTION_STR,
}

export interface LogInAction extends AdminAction {
    login: string,
    password: string
}
export interface SetSeancesAction extends AdminAction {
    seances: SeanceNode[]
}
export interface SetHallsAction extends AdminAction {
    halls: HallNode[]
}
export interface SetFilmsAction extends AdminAction {
    films: FilmNode[]
}


export const LogIn = (login: string, password: string): LogInAction => ({
    type: ADMIN_ACTION_STR.LOG_IN,
    login: login,
    password: password
})
export const SetHalls = (halls: HallNode[]): SetHallsAction => ({
    type: ADMIN_ACTION_STR.SET_HALLS,
    halls: halls
})
export const SetFilms = (films: FilmNode[]): SetFilmsAction => ({
    type: ADMIN_ACTION_STR.SET_FILMS,
    films: films
})
export const SetSeances = (seances: SeanceNode[]): SetSeancesAction => ({
    type: ADMIN_ACTION_STR.SET_SEANCES,
    seances: seances
})