const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}



/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)


module.exports = Util


/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li>'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" /></a>'
        grid += '<div class="namePrice">'
        grid += '<hr />'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
  }



  
/* **************************************
* Build the Inverntory detail view HTML
* ************************************ */
Util.buildInventoryDetailGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<main><section class="features-reviews"><div class="features">'
    data.forEach(vehicle => { 
      grid += '<h3>'+ vehicle.inv_make + " " +  vehicle.inv_model + '</h3>'
      grid +=  '<ul><li class="feature-item"><div class="feature-box2">'
      grid += ' <img src="' + vehicle.inv_image + '"' + 'alt="' + vehicle.inv_model + '"></div>'
      grid += ' </li></ul></div><div class="reviews">'
      grid += '<h3>' + vehicle.inv_make + " " +  vehicle.inv_model + ' Details </h3><ul class="review-list">'
      grid += '<li>' + '<b>Price: $</b>' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</li>'
      grid += ' <li>' + '<b>Make: </b>' + vehicle.inv_make + '</li>'
      grid += ' <li>' + '<b>Model: </b>' + vehicle.inv_model + '</li>'
      grid += ' <li>' + '<b>Year: </b>' + vehicle.inv_year + '</li>'
      grid += ' <li>' + '<b>Miles: </b>' + vehicle.inv_miles + '</li>'
      grid += ' <li>' + '<b>Color: </b>' + vehicle.inv_color+ '</li>'
      grid += ' <li>' + '<b>Description: </b>' + vehicle.inv_decription + '</li>'
     
    })
    grid += '</ul></div> </section></main>'
  } 
  
  
  
  else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}