import {Apis} from "bitsharesjs-ws"

export default {
  async exec(...params) {
    return await Apis.instance().db_api().exec(...params)
  },

  async dacom_assets() {
    let assests = await this.exec("get_named_account_balances", ['nathan', []])

    return await this.exec('get_assets', [assests.map((a) => a.asset_id)])
  },
}
