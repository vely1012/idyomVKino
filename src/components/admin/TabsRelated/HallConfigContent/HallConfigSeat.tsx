import { useState } from "react"

export interface HallConfigSeatProps {
    clickCallback?: ((newModifier: string) => void),
    initialModifier?: string
}

export default function HallConfigSeat({ clickCallback, initialModifier }: HallConfigSeatProps) {
    clickCallback = clickCallback || (() => {})
    
    const classModifiers = ['standart','vip','disabled']
    
    const [modifierIndex, setModifierIndex] = useState(classModifiers.indexOf(initialModifier || ''))
    if (modifierIndex === -1) {
        setModifierIndex(0)
    }

    const classNames = `hall-config__seat hall-config__seat_${classModifiers[modifierIndex]}`

    const seatClick = function() {
        setModifierIndex((modifierIndex + 1) % classModifiers.length)
        clickCallback(classModifiers[modifierIndex + 1])
    }
    
    return <div className={classNames} onClick={seatClick}/>
}