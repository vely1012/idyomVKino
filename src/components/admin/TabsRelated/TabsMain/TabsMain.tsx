import { type JSX, } from 'react'

import Tab from "../Tab/Tab";

import HallsContent from "../HallsContent/HallsContent";
import HallConfigContent from '../HallConfigContent/HallConfigContent';
import PricesContent from '../PricesContent/PricesContent';
import SeancesContent from '../SeancesContent/SeancesContent';
import StartSellingContent from '../StartSellingContent/StartSellingContent';

import './TabsMain.css'

export default function TabsMain() {

    const tabContentsList = [
        <HallsContent />,
        <HallConfigContent />,
        <PricesContent />,
        <SeancesContent />,
        <StartSellingContent />
    ]

    const tabNames = [
        "управление залами",
        "конфигурация залов",
        "конфигурация цен",
        "сетка сеанов",
        "открыть продажи"
    ]

    const tabElements = tabContentsList.map((e: JSX.Element, i: number) => <Tab tabContent={e} tabName={tabNames[i]}counter={i + 1} />)

    return(
        <main className="tabs">{...tabElements}</main>
    )
}