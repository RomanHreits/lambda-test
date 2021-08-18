import {executeQuery} from "./db.service";
import {AssetConfig} from "../interfaces";

const selectQueryString: string = 'SELECT config.id, config.pairs, to_json(asset.*) as asset FROM public.assets_config as config' +
    ' INNER JOIN public.assets_new as asset ON config.asset_id=asset.id'

export async function getAllAssets(): Promise<AssetConfig[]> {
    return executeQuery(selectQueryString);
}

export async function getAssetById(id: number): Promise<AssetConfig> {
    return (await executeQuery(selectQueryString + ` WHERE asset_id=${id}`))[0];
}