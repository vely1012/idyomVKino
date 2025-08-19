export interface requestStatus {
    success: boolean,
    result: any | undefined
    error: string | undefined
}

export interface Ticket {
    row: number,
    place: number,
    coast: number,
}

export default class ivkAPI {
    private static coreURL: string = 'https://shfe-diplom.neto-server.ru';

    private static wrapUpResponse(response: any) : requestStatus {
        return {
            success: response.success,
            result: response.result,
            error: response.error
        };
    }
    
    static async getRelevantData(): Promise<requestStatus> {
        let response : any = await fetch(`${this.coreURL}/alldata`);
        response = await response.json();

        return this.wrapUpResponse(response);
    }

    // works, tested
    static async authorise(login: string, password: string): Promise<requestStatus> {
        let userData = new FormData();
        userData.append('login', login);
        userData.append('password', password);
        
        // the intended way
        let response : any = await fetch(`${this.coreURL}/login`, {
            method: 'POST',
            body: userData
        });
        // also works
        // let response = await fetch(`${this.coreURL}/login?login=${login}&password=${password}`, {
        //     method: 'POST',
        // });

        response = await response.json();

        return this.wrapUpResponse(response);
    }

    // works, tested
    static async addHall(hallName: string): Promise<requestStatus> {
        let hallData = new FormData();
        hallData.append('hallName', hallName);
        
        let response: any = await fetch(`${this.coreURL}/hall`, { method: "POST", body: hallData });
        response = await response.json();

        return this.wrapUpResponse(response);
    }

    // works, tested
    static async deleteHall(hallId: number): Promise<requestStatus> {
        let response: any = await fetch(`${this.coreURL}/hall/${hallId}`, { method: "DELETE" });
        response = await response.json();

        return this.wrapUpResponse(response);
    }

    // works, tested
    static async editHallConfig(hallId: number, rowCount: number, seatCount: number, config: any[][]): Promise<requestStatus> {
        let hallData = new FormData();
        hallData.append('rowCount', rowCount.toString());
        hallData.append('placeCount', seatCount.toString());
        hallData.append('config', JSON.stringify(config));
        
        let response: any = await fetch(`${this.coreURL}/hall/${hallId}`, {
            method: "POST",
            body: hallData
        });
        response = await response.json();

        return this.wrapUpResponse(response);
    }

    // works, tested
    static async editHallPrice(hallId: number, priceStandart: number, priceVIP: number): Promise<requestStatus> {
        let priceData = new FormData();
        priceData.append('priceStandart', priceStandart.toString());
        priceData.append('priceVip', priceVIP.toString());
        
        let response: any = await fetch(`${this.coreURL}/price/${hallId}`, {
            method: "POST",
            body: priceData
        });
        response = await response.json();

        return this.wrapUpResponse(response);
    }

    // works, tested
    static async toggleHallSales(hallId: number, saleHallTickets: boolean): Promise<requestStatus> {
        let salesData = new FormData();
        salesData.append('hallOpen', Number(saleHallTickets).toString());
        
        let response: any = await fetch(`${this.coreURL}/open/${hallId}`, {
            method: "POST",
            body: salesData
        });
        response = await response.json();

        return this.wrapUpResponse(response);
    }

    // works, tested
    static async addFilm(filmName: string, filmDuration: number, filmDescription: string, filmOrigin: string, filmPoster: File):Promise<requestStatus> {
        let filmData = new FormData();
        filmData.append('filmName', filmName);
        filmData.append('filmDuration', filmDuration.toString());
        filmData.append('filmDescription', filmDescription);
        filmData.append('filmOrigin', filmOrigin);
        filmData.append('filePoster', filmPoster);

        let response: any = await fetch(`${this.coreURL}/film`, {
            method: 'POST',
            body: filmData
        });
        response = await response.json();

        return this.wrapUpResponse(response);
    }

    // works, tested
    static async deleteFilm(filmId: number):Promise<requestStatus> {
        let response: any = await fetch(`${this.coreURL}/film/${filmId}`, { method: "DELETE" });
        response = await response.json();

        return this.wrapUpResponse(response);
    }

    // works, tested
    static async addSeance(seanceHallId: number, seanceFilmId: number, seanceTime: Date):Promise<requestStatus> {
        let seanceData = new FormData();
        seanceData.append('seanceHallid', seanceHallId.toString());
        seanceData.append('seanceFilmid', seanceFilmId.toString());
        seanceData.append('seanceTime', seanceTime.toTimeString().slice(0, 5));
        
        let response: any = await fetch(`${this.coreURL}/seance`, {
            method: "POST",
            body: seanceData
        });
        response = await response.json();

        return this.wrapUpResponse(response);
    }

    // works, tested
    static async deleteSeance(seanceId: number):Promise<requestStatus> {
        let response: any = await fetch(`${this.coreURL}/seance/${seanceId}`, { method: "DELETE" });
        response = await response.json();

        return this.wrapUpResponse(response);
    }

    // works, tested
    static async currentSeanceSeatsConfig(seanceId: number, date: Date):Promise<requestStatus> {
        let response: any = await fetch(`${this.coreURL}/hallconfig?seanceId=${seanceId}&date=${date.toISOString().split('T')[0]}`);
        response = await response.json();

        return this.wrapUpResponse(response);
    }

    // works, tested
    static async buyTicket(seanceId: number, seanceDate: Date, tickets: Ticket[]):Promise<requestStatus> {
        let ticketData = new FormData();
        ticketData.append('seanceId', seanceId.toString());
        ticketData.append('ticketDate', seanceDate.toISOString().split('T')[0]);
        ticketData.append('tickets', JSON.stringify(tickets));

        let response: any = await fetch(`${this.coreURL}/ticket`, {
            method: 'POST',
            body: ticketData
        });
        response = await response.json();
        
        return this.wrapUpResponse(response);
    }
};