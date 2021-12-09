'use strict'

let axios = require('axios');

// let app = require('../server').server
  
const getOneAsset = (responseAxios) => {
  let formattedResults = responseAxios.data.assets.map((data) => {
    let finalResults = {
      name: data.name,
      asset_owner: data.asset_contract.name,
      id: data.id,
      token_id: data.token_id,
      image_url: data.image_url,
      traits: data.traits,
      collection: data.collection,
      banner_url: data.collection.banner_image_url
    }
    return finalResults 
  })
  console.log(formattedResults);
}

const findById = async (id) => {
  let findByIDData = await axios.get(`https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&token_ids=${id}`)
  getOneAsset(findByIDData)
}

const findByAddress = async (address) => {
  let getOneAddressData = await axios.get(`https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&asset_contract_address=${address}`)
  getOneAsset(getOneAddressData)
}

// fix this
const findByAddresses = async (addresses1, addresses2) => {
  let getMultipleAddressData = await axios.get(`https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&asset_contract_addresses=${addresses1}&asset_contract_addresses=${addresses2}`)
  getOneAsset(getMultipleAddressData)
}

findByAddress('0x495f947276749ce646f68ac8c248420045cb7b5e')

findById('20512672236384795134598454803080694359308106914252699625353424791001018400769')
