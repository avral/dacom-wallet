<template>
<div>
  <h4>Market</h4>
    <v-data-table
      v-bind:headers="headers"
      :items="dacom_assets"
      class="elevation-1"
      hide-actions
      dark
    >
    <template slot="items" scope="props">
      <td>{{ props.item.symbol }}</td>
      <td class="text-xs-right">{{ props.item.options.max_supply }}</td>
      <td class="text-xs-right">{{ props.item.precision }}</td>
      <td class="text-xs-right">{{ props.item.options.market_fee_percent }}</td>
    </template>
  </v-data-table>
</div>
</template>

<script>
import auth from '../auth'
import dacom from '../dacom'



export default {
  data () {
    return {
      headers: [
        {
          text: 'Symbol',
          align: 'left',
        },
        { text: 'Max supply'},
        { text: 'Precision'},
        { text: 'Marketi fee percent'},
      ],
      dacom_assets: [],
    }
  },
  async created() {
    this.dacom_assets = await dacom.dacom_assets()
  }
}
</script>
