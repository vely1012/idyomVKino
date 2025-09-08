import type { Context } from "react"
import type { AdminBundle } from "../../pages/Admin"


export let adminContext: Context<AdminBundle>;

export function setAdminContext(newAdminContext: Context<AdminBundle>) {
    adminContext = newAdminContext
} 