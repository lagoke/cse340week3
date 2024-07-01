const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

module.exports = invCont


/* ***************************
 *  Build inventory by detail view
 * ************************** */
invCont.buildByDetailId = async function (req, res, next) {
  const inventoryId = req.params.inventoryId
  const data = await invModel.getInventoryByInventoryId(inventoryId)
  const grid = await utilities.buildInventoryDetailGrid(data)
  let nav = await utilities.getNav()
  const vehicle_make = data[0].inv_make
  const vehicle_model = data[0].inv_model
  res.render("./inventory/detail", {
    title: vehicle_make + " " +  vehicle_model,
    nav,
    grid,
  })
}