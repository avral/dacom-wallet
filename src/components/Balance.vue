<template>
<div>
  <h4>Balance</h4>
</div>
</template>

<script>
import auth from '../auth'
import dacom from '../dacom'



export default {
  data () {
    return {
      dacom_assets: [],
    }
  },
  async created() {
    this.dacom_assets = await dacom.dacom_assets()
  }
}
</script>
