import Header from "../components/client/Header/Header"
import AdminFlag from "../components/admin/AdminFlag"
import { useDispatch, useSelector } from "react-redux"
import { type Dispatch } from 'redux'
import { useState, useEffect, createContext, /*type Context,*/ } from "react"
import PopupsContainer from "../components/admin/PopupsRelated/PopupsContainer/PopupsContainer"
import { Navigate, } from "react-router-dom"
import TabsMain from "../components/admin/TabsRelated/TabsMain/TabsMain"
import ivkAPI, { type RelevantData } from "../ts/API/IvkAPI"
import { type JSX } from 'react'
import type { AdminState, appState } from "../ts/stateManagement/reducers"
import { SetFilms, SetHalls, SetSeances, type AdminAction } from "../ts/stateManagement/actions"
import { adminContext, setAdminContext } from "../ts/stateManagement/adminContext"


export interface AdminBundle {
    adminData: AdminState,
    dispatch: Dispatch<AdminAction>,
}

export default function Admin() {
    const [resultingComponent, setResultingComponent] = useState<JSX.Element>(<AdminFlag />)
    const [dataFetched, setDataFetched] = useState(false)
    const [adminAuthorised, setAdminAuthorised] = useState(false)

    const adminData = useSelector((state: appState) => state.admin)
    const dispatch = useDispatch<Dispatch<AdminAction>>()
    const adminBundle: AdminBundle = { adminData, dispatch }
    setAdminContext(createContext(adminBundle))

    useEffect(() => {
        const tryAuthorise = async () => {
            const response = await ivkAPI.authorise(adminData.administrator.login, adminData.administrator.password)

            if (response.success) {
                setAdminAuthorised(true)
            } else {
                alert(response.error)
                setResultingComponent(<Navigate to="/login" />)
            }
        }

        tryAuthorise()
    }, [])

    useEffect(() => {
        const fetchRelevant = async () => {
            const response = await ivkAPI.getRelevantData()

            if (response.success) {
                const data = response.result as RelevantData
                dispatch(SetHalls(data.halls))
                dispatch(SetFilms(data.films))
                dispatch(SetSeances(data.seances))
                setDataFetched(true)
            } else {
                console.log(response.error)
            }
        }

        if(adminAuthorised && !dataFetched) {
            fetchRelevant()
            const intervalId = setInterval(fetchRelevant, 1500)

            return () => clearInterval(intervalId)
        }
    }, [dataFetched, adminAuthorised])

    useEffect(() => {
        if(dataFetched) {
            setResultingComponent(
                <>
                    <Header />
                    <TabsMain />
                    <PopupsContainer />
                    <AdminFlag />
                </>
            )
        }
    }, 
    [dataFetched])
    
    return <adminContext.Provider value={adminBundle}>{resultingComponent}</adminContext.Provider>
}
