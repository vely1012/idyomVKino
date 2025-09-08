import { combineReducers } from 'redux'
import { CLIENT_ACTION_STR, type ClientAction, type SelectDateAction, type SetPaymentInfoAction, type SetSeanceHallAction, type SetTicketsAction } from './actions';

import { type FilmNode, type SeanceNode, type HallNode, type Ticket } from '../API/IvkAPI';
import type { SeanceHallProps } from '../../components/client/SeanceHall/SeanceHall';
import type { PaymentInfoProps } from '../../components/client/PaymentInfo/PaymentInfo';
import { ADMIN_ACTION_STR, type AdminAction, type LogInAction, type SetFilmsAction, type SetHallsAction, type SetSeancesAction } from './actions';

// --------------------------
// ----- client reducer -----
// --------------------------

export interface ClientState {
    selectedDateString: string,
    seanceHallProps?: SeanceHallProps,
    paymentInfoProps?: PaymentInfoProps
    tickets?: Ticket[]
}

const initialClientState: ClientState = {
    selectedDateString: (new Date()).toDateString()
};

export const clientReducer = (state:ClientState = initialClientState, action: ClientAction): ClientState => {
    switch(action.type) {
        case CLIENT_ACTION_STR.RESET_CLIENT:
            return {
                selectedDateString: (new Date()).toDateString()
            }
            
        case CLIENT_ACTION_STR.SELECT_DATE:
            return {
                ...state,
                selectedDateString: (action as SelectDateAction).dateString
            }
        
        case CLIENT_ACTION_STR.SET_SEANCE_HALL:
            return {
                ...state,
                seanceHallProps: (action as SetSeanceHallAction).seanceHallProps
            }

        case CLIENT_ACTION_STR.SET_PAYMENT_INFO:
            return {
                ...state,
                paymentInfoProps: (action as SetPaymentInfoAction).paymentInfoProps
            }
        
        case CLIENT_ACTION_STR.SET_TICKETS:
            return {
                ...state,
                tickets: (action as SetTicketsAction).tickets
            }

        default:
            return state
    }
}




// -------------------------
// ----- admin reducer -----
// -------------------------


export interface AdminState {
    administrator: {
        login: string,
        password: string
    },
    halls: HallNode[],
    films: FilmNode[],
    seances: SeanceNode[],
}

const initialAdminState = {
    administrator: {
        login: "",
        password: ""
    },
    halls: [],
    films: [],
    seances: [],
}

export const adminReducer = (state:AdminState = initialAdminState, action: AdminAction): AdminState => {
    switch (action.type) {
        case ADMIN_ACTION_STR.LOG_IN:
            return {
                ...state,
                administrator: {
                    login: (action as LogInAction).login,
                    password: (action as LogInAction).password,
                }
            }

        case ADMIN_ACTION_STR.SET_HALLS:
            return {
                ...state,
                halls: (action as SetHallsAction).halls
            }
        case ADMIN_ACTION_STR.SET_FILMS:
            return {
                ...state,
                films: (action as SetFilmsAction).films
            }
        case ADMIN_ACTION_STR.SET_SEANCES:
            return {
                ...state,
                seances: (action as SetSeancesAction).seances
            }

        default:
            return state
    }
}



export interface appState {
    client: ClientState,
    admin: AdminState
}

export interface RootReducer {
    client?: (state: ClientState | undefined, action: ClientAction) => ClientState,
    admin?: (state: AdminState | undefined, action: AdminAction) => AdminState
}

const rootReducer = combineReducers<RootReducer>({
    client: clientReducer,
    admin: adminReducer
})
export default rootReducer