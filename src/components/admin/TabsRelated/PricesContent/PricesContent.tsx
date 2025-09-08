import { useContext, useEffect, useState, type ChangeEvent } from 'react';
import { adminContext } from '../../../../ts/stateManagement/adminContext';

import HallSelector from '../../HallSelector/HallSelector';

import ivkAPI, { type HallNode } from '../../../../ts/API/IvkAPI';
import { SetHalls } from '../../../../ts/stateManagement/actions';

import './PricesContent.css'

export default function PricesContent() {
    const { adminData, dispatch, } = useContext(adminContext)

    const [selectedHallIndex, setSelectedHallIndex] = useState(0)
    const [halls, setHalls] = useState<HallNode[]>(adminData.halls)

    const [standartPrice, setStandartPrice] = useState(halls[selectedHallIndex].hall_price_standart)
    const [vipPrice, setVipPrice] = useState(halls[selectedHallIndex].hall_price_vip)

    useEffect(() => {
        setHalls(adminData.halls)
        let updatedHallIndex = selectedHallIndex
        if(selectedHallIndex >= adminData.halls.length) {
            updatedHallIndex = adminData.halls.length - 1
        }
        setSelectedHallIndex(updatedHallIndex)
        setStandartPrice(halls[updatedHallIndex].hall_price_standart)
        setVipPrice(halls[updatedHallIndex].hall_price_vip)
    }, 
    [adminData])

    const switchHall = function(anotherHallId: number) {
        if(anotherHallId === halls[selectedHallIndex].id) {
            return
        }
        
        const newHalls = halls.map((h: HallNode, i: number) => i !== selectedHallIndex ? h : { ...h, hall_price_standart: standartPrice, hall_price_vip: vipPrice })
        setHalls(newHalls)
        const anotherHallIndex = newHalls.findIndex((h: HallNode) => h.id === anotherHallId)
        setSelectedHallIndex(anotherHallIndex)
        setStandartPrice(newHalls[anotherHallIndex].hall_price_standart)
        setVipPrice(newHalls[anotherHallIndex].hall_price_vip)
    }

    const changeStandartPrice = (e: ChangeEvent) => { setStandartPrice(Number((e.target as HTMLInputElement).value)) }
    const changeVipPrice = (e: ChangeEvent) => { setVipPrice(Number((e.target as HTMLInputElement).value)) }

    const submitPrices = async function() {
        const confirmReverting = confirm('Внесённые Вами значения цен заменят текущие сохранённые значения для этого зала. Подтвердить изменения?')
    
        if(!confirmReverting) {
            return
        }
    
        const response = await ivkAPI.editHallPrice(halls[selectedHallIndex].id, standartPrice, vipPrice)
    
        if(response.success) {
            const updatedHall = response.result as HallNode
            // const newHalls = halls.map((h: HallNode, i: number) => i !== selectedHallIndex ? h : response.result )
            const newHalls = halls.map((h: HallNode, i: number) => i !== selectedHallIndex ? h : updatedHall )
            // dispatch(
            //     setNamedProp(
            //         'adminData',
            //         {
            //             ...adminData,
            //             halls: newHalls
            //         }
            //     )
            // )
            dispatch(SetHalls(newHalls))
        } else {
            console.error(response.error)
        }

    }

    const revertPrices = async function() {
        const confirmReverting = confirm('Цены выбранного зала вернутся к последним сохранённым значениям. Отменить изменения?')

        if (!confirmReverting) {
            return
        }
        

        setStandartPrice(adminData.halls[selectedHallIndex].hall_price_standart)
        setVipPrice(adminData.halls[selectedHallIndex].hall_price_vip)
    }

    return (
        <div className="prices">
            <span className="prices__control-text">Выберете зал для конфигурации</span>
            <HallSelector halls={halls} selectionCallback={switchHall} selectedHallId={halls[selectedHallIndex].id} />
            <span className="prices__control-text">Установите цены для типов кресел</span>
            <div className="prices__price-panel">
                <label htmlFor="" className="prices__input-label">Цена, рублей</label>
                <input type="number" className="prices__price-input" min="1" step="1"
                    placeholder="100" value={standartPrice} onChange={changeStandartPrice} />
                <span className="prices__for">за</span>
                <div className="prices__seat-legend-item">
                    <div className="prices__seat prices__seat_normal"></div>
                    <span className="prices__legend-hint">Обычные кресла</span>
                </div>
                <label htmlFor="" className="prices__input-label">Цена, рублей</label>
                <input type="number" className="prices__price-input" min="1" step="1"
                    placeholder="500" value={vipPrice} onChange={changeVipPrice} />
                <span className="prices__for">за</span>
                <div className="prices__seat-legend-item">
                    <div className="prices__seat prices__seat_vip"></div>
                    <span className="prices__legend-hint">VIP кресла</span>
                </div>
            </div>
            <div className="prices__btn-wrapper">
                <button type="button" className="shadow prices__deny-btn"  onClick={revertPrices}>отмена</button>
                <button type="button" className="shadow prices__save-btn" onClick={submitPrices}>сохранить</button>
            </div>
        </div>
    )
}
