// for some reason not .ts wtf
import { ivkAPI } from './Request.js';
import type { Ticket } from './Request.js';

import { readFile } from 'fs/promises';

export default class RequestTester {

    static async getRelevantDataTest() {
        let res: any = (await ivkAPI.getRelevantData()).result;
        console.log(res);
    }

    static async authoriseTest() {
        let login = 'shfe-diplom@netology.ru';
        let password = 'shfe-diplom';
        let res: any = (await ivkAPI.authorise(login, password)).result;
        console.log(`authorisation success (must be true): ${res.success}`);

        res = (await ivkAPI.authorise('adlkn', 'kdngkdnbnseitn')).result;
        console.log(`authorisation success (must be false): ${res.success}`);
    }

    static async addHallTest() {
        // let newHall = {
        //     "id": 9999,
        //     "hall_name": "999",
        //     "hallName": "999",
        //     "hall_rows": 9,
        //     "hall_places": 9,
        //     "hall_config": [],
        //     "hall_price_standart": 9,
        //     "hall_price_vip": 99,
        //     "hall_open": 0
        // };

        let newHallName = "999";

        let res: any = (await ivkAPI.addHall(newHallName));
        console.log(res);
    }

    static async deleteHallTest() {
        let { halls } = (await ivkAPI.getRelevantData()).result;
        console.log(`halls before deletion: ${halls.length}`)
        let hallToDeleteId = halls[0].id;

        let res: any = (await ivkAPI.deleteHall(hallToDeleteId));
        console.log(`halls  after deletion: ${res.result.halls.length}`);
    }

    static async editHallConfigTest() {
        let { halls } = (await ivkAPI.getRelevantData()).result;
        console.log(`hall before edit:\n${JSON.stringify(halls[0], null, 4)}\n`);

        let hallToEdit = halls[0].id;
        let newConfig: any = {
            rowCount: 7,
            seatCount: 7,
            config: [
                [
                    "disabled",
                    "standart",
                    "standart",
                    "standart",
                    "standart",
                    "standart",
                    "disabled"
                ],
                [
                    "standart",
                    "standart",
                    "standart",
                    "standart",
                    "standart",
                    "standart",
                    "standart"
                ],
                [
                    "standart",
                    "standart",
                    "vip",
                    "vip",
                    "vip",
                    "standart",
                    "standart"
                ],
                [
                    "standart",
                    "standart",
                    "vip",
                    "vip",
                    "vip",
                    "standart",
                    "standart"
                ],
                [
                    "standart",
                    "standart",
                    "vip",
                    "vip",
                    "vip",
                    "standart",
                    "standart"
                ],
                [
                    "standart",
                    "standart",
                    "standart",
                    "standart",
                    "standart",
                    "standart",
                    "standart"
                ],
                [
                    "disabled",
                    "standart",
                    "standart",
                    "standart",
                    "standart",
                    "standart",
                    "disabled"
                ]
            ]
        };

        let res: any = await ivkAPI.editHallConfig(hallToEdit, newConfig.rowCount, newConfig.seatCount, newConfig.config);
        console.log(`request success: ${res.success}\nrequest error: ${res.error}\n`);
        console.log(`hall after edit:\n${JSON.stringify(res.result, null, 4)}`)
    }

    static async editHallPriceTest() {
        let hallBefore = (await ivkAPI.getRelevantData()).result.halls[0];
        console.log(`hall prices before:\n  ${hallBefore.hall_price_standart}\n   ${hallBefore.hall_price_vip}\n`);

        let res: any = await ivkAPI.editHallPrice(hallBefore.id, hallBefore.hall_price_standart * 10, hallBefore.hall_price_vip * 10);
        let hallAfter = res.result;
        console.log(`request success: ${res.success}\nrequest error: ${res.error}\n`);
        console.log(`hall prices after:\n  ${hallAfter.hall_price_standart}\n   ${hallAfter.hall_price_vip}`);

        if (res.success) {
            await ivkAPI.editHallPrice(hallBefore.id, hallBefore.hall_price_standart / 10, hallBefore.hall_price_vip / 10);
            console.log('\n   price edition denied')
        }
    }

    static async toggleHallSalesTest() {
        let hallBefore = (await ivkAPI.getRelevantData()).result.halls[0];
        console.log(`hall_open before: ${hallBefore.hall_open}`);

        let newHallOpen = Boolean((Number(hallBefore.hall_open) + 1) % 2)
        let res: any = await ivkAPI.toggleHallSales(hallBefore.id, newHallOpen);
        console.log(`request success: ${res.success}\nrequest error: ${res.error}\n`);
        let hallAfter = res.result.halls.filter((h: any) => h.id == hallBefore.id)[0]
        console.log(`hall_open after: ${hallAfter.hall_open}`);
    }

    static async deleteFilmTest() {
        let filmsBefore = (await ivkAPI.getRelevantData()).result.films;
        console.log(`films before: ${JSON.stringify(filmsBefore, null, 4)}`)

        let filmToDelete = filmsBefore[0].id;
        let res: any = await ivkAPI.deleteFilm(filmToDelete);
        console.log(`request success: ${res.success}\nrequest error: ${res.error}\n`);
        console.log(`films after: ${JSON.stringify(res.result.films, null, 4)}`);
    }

    static async deleteSeanceTest() {
        let seancesBefore = (await ivkAPI.getRelevantData()).result.seances;
        console.log(`seances before: ${JSON.stringify(seancesBefore, null, 4)}`)

        let seanceToDelete = seancesBefore[0].id;
        let res: any = await ivkAPI.deleteSeance(seanceToDelete);
        console.log(`request success: ${res.success}\nrequest error: ${res.error}\n`);
        console.log(`seances after: ${JSON.stringify(res.result.seances, null, 4)}`);
    }

    static async currentSeanceSeatsConfigTest() {
        let seanceToCheck = (await ivkAPI.getRelevantData()).result.seances[0];

        let res: any = await ivkAPI.currentSeanceSeatsConfig(seanceToCheck.id, new Date());
        console.log(`request success: ${res.success}\nrequest error: ${res.error}\n`);
        console.log(`current seat config for seance ${seanceToCheck.id}:\n${JSON.stringify(res.result, null, 4)}`);
    }

    static async addFilmTest() {
        async function getLocalImage(imagePath: string) {
            // Read local file using provided path
            let data = await readFile(imagePath);

            // Create a Blob from the binary data
            let blob = new Blob([new Uint8Array(data)], { type: 'image/png' });

            // Create a File object from the Blob
            let localImage = new File([blob], imagePath.split('\\').pop() || 'Untitled', { type: 'image/png' });

            return localImage
        }

        let filmPosterFile: File = await getLocalImage('C:\\Users\\The Machine\\Pictures\\test.png');

        let res: any = await ivkAPI.addFilm(
            'test film node',
            120,
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere earum consectetur alias, maxime molestias dolorum debitis adipisci explicabo veritatis ullam, sed, qui dolorem. Libero placeat sunt explicabo numquam nulla nam.',
            'USA',
            filmPosterFile
        );

        console.log(`request success: ${res.success}\nrequest error: ${res.error}\n`);
    }

    static async addSeanceTest() {
        let { result: currentData } = await ivkAPI.getRelevantData();
        // let seancesBefore = currentData.seances;

        let hallId = currentData.halls[0].id;
        let filmId = currentData.films[0].id;

        let seanceTime = new Date(2000, 0, 1);
        seanceTime.setHours(9, 0, 0);
        let res: any = await ivkAPI.addSeance(hallId, filmId, seanceTime);

        console.log(`request success: ${res.success}\nrequest error: ${res.error}\n`);
    }

    static async buyTicketTest() {
        let relevantData: any = (await ivkAPI.getRelevantData()).result;

        let seanceId = relevantData.seances[0].id;
        let seanceDate = new Date();
        let tickets: Ticket[] = [
            {
                row: 2,
                place: 1,
                coast: 300,
            },
            {
                row: 2,
                place: 2,
                coast: 300,
            },
        ];

        let res: any = await ivkAPI.buyTicket(seanceId, seanceDate, tickets);

        console.log(`request success: ${res.success}\nrequest error: ${res.error}\n`);
        console.log(`ticekts:\n${JSON.stringify(res.result, null, 4)}`);
    }

    static async _printData() {
        let { result } = await ivkAPI.getRelevantData();

        console.log(JSON.stringify(result, null, 4));
    }

    static async _printHalls(collapseHallConfig: boolean = true) {
        let { halls } = (await ivkAPI.getRelevantData()).result;

        for (let h of halls) {
            collapseHallConfig ? h.hall_config = [] : 0;
            console.log(h);
        }
    }

    static async _printFilms() {
        let { films } = (await ivkAPI.getRelevantData()).result;

        console.log(JSON.stringify(films, null, 4));
    }

    static async _printSeances() {
        let { seances } = (await ivkAPI.getRelevantData()).result;

        console.log(JSON.stringify(seances, null, 4));
    }

    static async _printTickets() {
        let { tickets } = (await ivkAPI.getRelevantData()).result;

        console.log(JSON.stringify(tickets, null, 4));
    }

}
// editHallConfigTest();
// _printData()
// editHallPriceTest()
// toggleHallSalesTest()
// _printData()


// deleteFilmTest()
// deleteSeanceTest()
// currentSeanceSeatsConfigTest()

// _printSeances();
// addSeanceTest();
// _printSeances();

// buyTicketTest();
// _printTickets();

// addFilmNoUITest();

// _printFilms();