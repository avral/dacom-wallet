import store from 'store'
import axios from 'axios'
import {ChainStore, FetchChain, Login} from 'bitsharesjs'
import {Apis, ChainConfig} from 'bitsharesjs-ws'


const FAUCET_URL = 'http://dacom.io/faucet/'

// DACom BlockChain
ChainConfig.networks.DACom = {
  core_asset: 'DCM',
  address_prefix: 'DCM',
  chain_id: '60c25130c1689fb9d9f5833403765d0f0653f88daa00b12914425ac3b2af1458'
}

export default {
  account: store.get('account'),
  wifs: store.get('keys'),
  isAuth: false,
  keys: null,

  init() {
    this.isAuth = !!this.wifs

    return new Promise((resolve, reject) => {
      Apis.instance('ws://5.196.225.197:11011', true).init_promise.then(() => {
        ChainStore.init().then(() => {
          resolve()
        }, err => reject(err))
      }, err => reject(err))
    })
  },

  save() {
    // Сохраняем данные юзера в локалсторадж
    this.wifs = {
      active: this.keys.privKeys.active.toWif(),
      memo: this.keys.privKeys.memo.toWif(),
      owner: this.keys.privKeys.owner.toWif(),
    }

    store.set('account', this.account)
    store.set('keys', this.wifs)

    this.isAuth = true
  },
  
  signUp(accountName, password) {
    return new Promise((resolve, reject) => {
      FetchChain('getAccount', [accountName]).then(() => {
        reject('Account already exist')
      }, () => {
        try {
          this.keys = Login.generateKeys(accountName, password, ['active', 'owner', 'memo'])
        } catch (e) {
          return reject(e.message)
        }

        axios.post(FAUCET_URL, {
          account: accountName,
          owner_key: this.keys.pubKeys.owner,
          active_key: this.keys.pubKeys.active,
          memo_key: this.keys.pubKeys.memo,
        }).then(() => {
          this.account = accountName
          this.save()
          resolve()
        }, err => {
          resolve(err)
        })

      })
    })
  },

  login(accountName, password) {
    if (!accountName || !password) { return Promise.reject('Empty creditials') }

    return new Promise((resolve, reject) => {
      FetchChain('getAccount', [accountName]).then(res => {
        this.account = res.toJS()[0]

        try {
          var success = Login.checkKeys({
            accountName: accountName,
            password: password,
            auths: {
              active: this.account.active.key_auths
            }
          })
        } catch(e) {
          return reject(e.message)
        }

        if (success) {
          this.account = accountName
          this.generateKeys(accountName, password)
          this.save()
          resolve()
        } else {
          reject('Invalid password')
        }
      }, () => {
        reject('User does not exists')
      })
    })
  },
}
