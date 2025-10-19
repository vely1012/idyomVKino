import HallSelector from '../../HallSelector/HallSelector'
import { useState, type FormEvent, type ChangeEvent, useEffect } from 'react'
import HallConfigSeat from './HallConfigSeat'

import ivkAPI, { type HallNode } from '../../../../ts/API/IvkAPI'
import { SetHalls, type AdminAction } from '../../../../ts/stateManagement/actions'

import { useDispatch, useSelector } from 'react-redux'
import type { appState } from '../../../../ts/stateManagement/reducers'
import type { Dispatch } from 'redux'

import './HallConfigContent.css'

export default function HallConfigContent() {
    const adminData = useSelector((state: appState) => state.admin)
    const dispatch = useDispatch<Dispatch<AdminAction>>()

    const [selectedHallIndex, setSelectedHallIndex] = useState(0)
    const [halls, setHalls] = useState<HallNode[]>(adminData.halls)

    const initialWidth = halls[selectedHallIndex].hall_config[0].length
    const [selectedHallWidth, setSelectedHallWidth] =  useState(initialWidth)

    const initialHeight = halls[selectedHallIndex].hall_config.length
    const [selectedHallHeight, setSelectedHallHeight] =  useState(initialHeight)

    useEffect(() => {
        setHalls(adminData.halls)
        let updatedHallIndex = selectedHallIndex
        if (selectedHallIndex >= adminData.halls.length) {
            updatedHallIndex = adminData.halls.length - 1
        }
        setSelectedHallIndex(updatedHallIndex)
        setSelectedHallHeight(adminData.halls[updatedHallIndex].hall_config.length)
        setSelectedHallWidth(adminData.halls[updatedHallIndex].hall_config[0].length)
    },
    [adminData])

    const onclickSeatChange = function(row: number, seat: number, newModifier: string) {
        const updatedSelectedHall = JSON.parse(JSON.stringify(halls[selectedHallIndex])) as HallNode
        updatedSelectedHall.hall_config[row][seat]  = newModifier
        setHalls(halls.map((h: HallNode, i: number) => i !== selectedHallIndex ? h : updatedSelectedHall))
    }

    const switchHallToEdit = function (anotherHallId: number) {
        if(anotherHallId === halls[selectedHallIndex].id) {
            return
        }

        const anotherHallIndex = halls.findIndex((h: HallNode) => h.id === anotherHallId)
        setSelectedHallIndex(anotherHallIndex)
        setSelectedHallWidth(halls[anotherHallIndex].hall_config[0].length)
        setSelectedHallHeight(halls[anotherHallIndex].hall_config.length)
    }

    const changeHallHeight = function(e: ChangeEvent) {
        const input = e.target as HTMLInputElement
        if(input.value === "") {
            return
        }

        const newHeight = Number(input.value)
        const newHallConfig: string[][] = JSON.parse(JSON.stringify(halls[selectedHallIndex].hall_config))

        if(newHeight > newHallConfig.length) {
            for(let i = newHallConfig.length; i < newHeight; i++) {
                newHallConfig.push(Array(newHallConfig[0].length).fill('standart'))
            }
        } else {
            for(let i = newHallConfig.length; i > newHeight; i--) {
                newHallConfig.pop()
            }
        }

        setHalls(halls.map((h: HallNode, i: number) => {
            if(i === selectedHallIndex) {
                const reconfiguredHall: HallNode = { ...h, hall_config: newHallConfig }
                return reconfiguredHall
            } else {
                return h
            }
        }))
        setSelectedHallHeight(newHeight)
    }

    const changeHallWidth = function(e: ChangeEvent) {
        const input = e.target as HTMLInputElement
        if(input.value === "") {
            return
        }

        const newWidth = Number(input.value)
        const newHallConfig: string[][] = JSON.parse(JSON.stringify(halls[selectedHallIndex].hall_config))

        if(newWidth > newHallConfig[0].length) {
            for(const row of newHallConfig) {
                row.push('standart')
            }
        } else {
            for(const row of newHallConfig) {
                row.pop()
            }
        }

        setHalls(halls.map((h: HallNode, i: number) => {
            if(i === selectedHallIndex) {
                return { ...h, hall_config: newHallConfig }
            } else {
                return h
            }
        }))
        setSelectedHallWidth(newWidth)
    }

    const submitCurrentHallChanges = async function(e: FormEvent) {
        e.preventDefault()

        const submitConfigs = confirm('Конфигурация выбранного зала будет изменена. Продолжить?')
        if(!submitConfigs) {
            return
        }

        const currentHallConfig: string[][] = []
        const seatElements: HTMLElement[] = Array.from(document.querySelectorAll('.hall-config__seats-area .hall-config__seat'))

        for(let i = 0; i < selectedHallHeight; i++) {
            currentHallConfig.push([])
            for(let j = 0; j < selectedHallWidth; j++) {
                const currentEl = seatElements[i * selectedHallWidth + j]
                const m: string = Array.from(currentEl.classList).join(' ').replace('hall-config__seat hall-config__seat_', '')

                currentHallConfig[i].push(m)
            }
        }

        const response = await ivkAPI.editHallConfig(halls[selectedHallIndex].id, selectedHallHeight, selectedHallWidth, currentHallConfig)

        if(response.success) {
            const newHalls = halls.map((h: HallNode, i: number) => i !== selectedHallIndex ? h : { ...h, hall_config: currentHallConfig })
            setHalls(newHalls)
            dispatch(SetHalls(newHalls))
        } else {
            alert(response.error)
        }
    }

    const revertAllChanges = function() {
        const revertionConfirm = confirm('Зал вернётся к сохранённой конфигурации. Отменить внесённые изменения?')

        if(!revertionConfirm) {
            return
        }
                
        
        setSelectedHallHeight(adminData.halls[selectedHallIndex].hall_config.length)
        setSelectedHallWidth(adminData.halls[selectedHallIndex].hall_config[0].length)
        const newHalls = halls.map((h: HallNode, i: number) => i !== selectedHallIndex ? h : adminData.halls[selectedHallIndex]) 
        setHalls(newHalls)
    }

    return (
        <div className="hall-config">
            <span className="hall-config__control-text">Выберете зал для конфигурации</span>
            <HallSelector halls={halls} selectionCallback={switchHallToEdit} selectedHallId={halls[selectedHallIndex].id}/>
            <span className="hall-config__control-text">Укажите количество рядов и максимальное количество
                кресел в ряду</span>
            <div className="hall-config__size-panel">
                <label htmlFor="hallRowsInput" className="hall-config__size-control-hint">Рядов, шт.</label>
                <input className="hall-config__size-control" type="number" id="hallRowsInput" min="1" max="30"
                    step="1" placeholder="10" value={selectedHallHeight} onChange={changeHallHeight}/>
                <span className="hall-config__devider">x</span>
                <label htmlFor="hallSeatsInput" className="hall-config__size-control-hint">Мест, шт.</label>
                <input className="hall-config__size-control" type="number" id="hallSeatsInput" min="1" max="30"
                    step="1" placeholder="10" value={selectedHallWidth} onChange={changeHallWidth}/>
            </div>
            <span className="hall-config__control-text">Теперь вы можете указать типы кресел на схеме</span>
            <div className="hall-config__seats-legend">
                <div className="hall-config__legend-item">
                    <div className="hall-config__seat hall-config__seat_standart"></div>
                    <span className="hall-config__legend-hint">обычные кресла</span>
                </div>
                <div className="hall-config__legend-item">
                    <div className="hall-config__seat hall-config__seat_vip"></div>
                    <span className="hall-config__legend-hint">VIP кресла</span>
                </div>
                <div className="hall-config__legend-item">
                    <div className="hall-config__seat hall-config__seat_disabled"></div>
                    <span className="hall-config__legend-hint">заблокированные (нет кресла)</span>
                </div>
            </div>
            <span className="hall-config__mouse-hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</span>
            <div className="hall-config__seats-manager">
                <div className="hall-config__seats-area" style={{'--columns': selectedHallWidth } as React.CSSProperties} key={`${selectedHallWidth}-${selectedHallHeight}`}>
                    <span className="hall-config__screen"> экран</span>
                    {
                        ...halls[selectedHallIndex].hall_config.map((row: string[], i: number) => {
                            return [...row.map((m: string, j: number) => {
                                return <HallConfigSeat clickCallback={(newModifier: string) => {onclickSeatChange(i, j, newModifier)}} key={`${selectedHallIndex}-${i}-${j}`} initialModifier={m} />
                            })]
                        }).flat()
                    }
                </div>
            </div>
            <div className="hall-config__btn-wrapper">
                <button type="button" className="shadow hall-config__deny-btn" onClick={revertAllChanges}>отмена</button>
                <button type="button" className="shadow hall-config__save-btn" onClick={submitCurrentHallChanges}>сохранить</button>
            </div>
        </div>
    )
}