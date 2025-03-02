// import { getTenantDB } from "./index";
import { sql } from 'drizzle-orm'
import db from '.'
import { getTenantTable } from './tenantSchema'

export const createTenantSchema = async (tenant: string) => {
    try {
        await db.execute(sql.raw(`CREATE SCHEMA IF NOT EXISTS "${tenant}"`))
        const tenantData = getTenantTable(tenant)

        console.log(tenantData.orders.productId, tenantData.products.name)

        console.log(`✅ Tenant schema '${tenant}' created successfully!`)
    } catch (error) {
        console.log(`❌ Error creating tenant schema '${tenant}': ${error}`)
        throw error
    }
}
