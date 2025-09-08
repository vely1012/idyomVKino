export interface Ticket {
    row: number,
    place: number,
    coast: number,
}

export interface HallNode {
    id: number,
    hall_name: string,
    hall_rows: number,
    hall_places: number,
    hall_config: string[][],
    hall_price_standart: number,
    hall_price_vip: number,
    hall_open: number
}

export interface FilmNode {
    id: number,
    film_name: string,
    film_duration: number,
    film_description: string,
    film_origin: string,
    film_poster: string
}

export interface SeanceNode {
    id: number,
    seance_hallid: number,
    seance_filmid: number,
    seance_time: string
}

export interface IvkResponse<T> {
    error: string,
    success: boolean,
    result?: T
}

export interface RelevantData {
    halls: HallNode[],
    films: FilmNode[],
    seances: SeanceNode[]
}

export default class ivkAPI {
    private static coreURL: string = 'https://shfe-diplom.neto-server.ru';

    static async getRelevantData(): Promise<IvkResponse<RelevantData>> {
        let response: Response | IvkResponse<RelevantData> = await fetch(`${this.coreURL}/alldata`);
        response = (await response.json()) as IvkResponse<RelevantData>;

        return response
    }

    static async authorise(login: string, password: string): Promise<IvkResponse<string>> {
        const userData = new FormData();
        userData.append('login', login);
        userData.append('password', password);
        
        // the intended way
        let response : Response | IvkResponse<string> = await fetch(`${this.coreURL}/login`, {
            method: 'POST',
            body: userData
        });
        // also works
        // let response = await fetch(`${this.coreURL}/login?login=${login}&password=${password}`, {
        //     method: 'POST',
        // });

        response = (await response.json()) as IvkResponse<string>;

        return response
    }

    static async addHall(hallName: string): Promise<IvkResponse<{ halls: HallNode[] }>> {
        const hallData = new FormData();
        hallData.append('hallName', hallName);
        
        let response: Response | IvkResponse<{ halls: HallNode[] }> = await fetch(`${this.coreURL}/hall`, { method: "POST", body: hallData });
        response = (await response.json()) as IvkResponse<{ halls: HallNode[] }>;

        return response
    }

    static async deleteHall(hallId: number): Promise<IvkResponse<{ halls: HallNode[], seances: SeanceNode[] }>> {
        let response: Response | IvkResponse<{ halls: HallNode[], seances: SeanceNode[] }> = await fetch(`${this.coreURL}/hall/${hallId}`, { method: "DELETE" });
        response = (await response.json()) as IvkResponse<{ halls: HallNode[], seances: SeanceNode[] }>;

        return response
    }

    static async editHallConfig(hallId: number, rowCount: number, seatCount: number, config: string[][]): Promise<IvkResponse<HallNode>> {
        const hallData = new FormData();
        hallData.append('rowCount', rowCount.toString());
        hallData.append('placeCount', seatCount.toString());
        hallData.append('config', JSON.stringify(config));
        
        let response: Response | IvkResponse<HallNode> = await fetch(`${this.coreURL}/hall/${hallId}`, {
            method: "POST",
            body: hallData
        });
        response = (await response.json()) as IvkResponse<HallNode>;

        return response
    }

    static async editHallPrice(hallId: number, priceStandart: number, priceVIP: number): Promise<IvkResponse<HallNode>> {
        const priceData = new FormData();
        priceData.append('priceStandart', priceStandart.toString());
        priceData.append('priceVip', priceVIP.toString());
        
        let response: Response | IvkResponse<HallNode> = await fetch(`${this.coreURL}/price/${hallId}`, {
            method: "POST",
            body: priceData
        });
        response = (await response.json()) as IvkResponse<HallNode>;

        return response
    }

    static async toggleHallSales(hallId: number, saleHallTickets: boolean): Promise<IvkResponse<{ halls: HallNode[] }>> {
        const salesData = new FormData();
        salesData.append('hallOpen', Number(saleHallTickets).toString());
        
        let response: Response | IvkResponse<{ halls: HallNode[] }> = await fetch(`${this.coreURL}/open/${hallId}`, {
            method: "POST",
            body: salesData
        });
        response = (await response.json()) as IvkResponse<{ halls: HallNode[] }>;

        return response
    }

    static async addFilm(filmName: string, filmDuration: number, filmDescription: string, filmOrigin: string, filmPoster: File):Promise<IvkResponse<{ films: FilmNode[]}>> {
        const filmData = new FormData();
        filmData.append('filmName', filmName);
        filmData.append('filmDuration', filmDuration.toString());
        filmData.append('filmDescription', filmDescription);
        filmData.append('filmOrigin', filmOrigin);
        filmData.append('filePoster', filmPoster);

        let response: Response | IvkResponse<{ films: FilmNode[]}> = await fetch(`${this.coreURL}/film`, {
            method: 'POST',
            body: filmData
        });
        response = (await response.json()) as IvkResponse<{ films: FilmNode[]}>;

        return response
    }

    static async deleteFilm(filmId: number):Promise<IvkResponse<{ films: FilmNode[], seances: SeanceNode[] }>> {
        let response: Response | IvkResponse<{ films: FilmNode[], seances: SeanceNode[] }> = await fetch(`${this.coreURL}/film/${filmId}`, { method: "DELETE" });
        response = (await response.json()) as IvkResponse<{ films: FilmNode[], seances: SeanceNode[] }>;

        return response
    }

    static async addSeance(seanceHallId: number, seanceFilmId: number, seanceTime: Date):Promise<IvkResponse<{ seances: SeanceNode[]}>> {
        const seanceData = new FormData();
        seanceData.append('seanceHallid', seanceHallId.toString());
        seanceData.append('seanceFilmid', seanceFilmId.toString());
        seanceData.append('seanceTime', seanceTime.toTimeString().slice(0, 5));
        
        let response: Response | IvkResponse<{ seances: SeanceNode[]}> = await fetch(`${this.coreURL}/seance`, {
            method: "POST",
            body: seanceData
        });
        response = (await response.json()) as IvkResponse<{ seances: SeanceNode[]}>;

        return response
    }

    static async deleteSeance(seanceId: number):Promise<IvkResponse<{ seances: SeanceNode[]}>> {
        let response: Response | IvkResponse<{ seances: SeanceNode[]}> = await fetch(`${this.coreURL}/seance/${seanceId}`, { method: "DELETE" });
        response = (await response.json()) as IvkResponse<{ seances: SeanceNode[]}>;

        return response
    }

    static async currentSeanceSeatsConfig(seanceId: number, date: Date):Promise<IvkResponse<string[][]>> {
        let response: Response | IvkResponse<string[][]> = await fetch(`${this.coreURL}/hallconfig?seanceId=${seanceId}&date=${date.toISOString().split('T')[0]}`);
        response = (await response.json()) as IvkResponse<string[][]>;

        return response
    }

    static async buyTicket(seanceId: number, seanceDate: Date, tickets: Ticket[]):Promise<IvkResponse<{ tickets: Ticket[] }>> {
        const ticketData = new FormData();
        ticketData.append('seanceId', seanceId.toString());
        ticketData.append('ticketDate', seanceDate.toISOString().split('T')[0]);
        ticketData.append('tickets', JSON.stringify(tickets));

        let response: Response | IvkResponse<{ tickets: Ticket[] }> = await fetch(`${this.coreURL}/ticket`, {
            method: 'POST',
            body: ticketData
        });
        response = (await response.json()) as IvkResponse<{ tickets: Ticket[] }>;
        
        return response
    }
}