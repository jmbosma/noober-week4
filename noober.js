
//creates function to loop through "legs" of a ride

function renderRide(ride, levelOfService){
  let NumLegs = ride.length
  for(let i=0; i<NumLegs; i++) {
    
    leg = ride[i]
    GenerateFullName(leg) // generates full name of passenger
    PassengerFill(levelOfService) // determines if gray or purple label fill based on level of service
    NumOfPassengers(leg) //returns the variable NumPassengers for total passengers in each leg
    Border(levelOfService) //determines if gray or purple border based on level of service

    passengerPhone = `${leg.passengerDetails.phoneNumber}`
    passengerPickupAddressLine1 = `${leg.pickupLocation.address}`
    passengerPickupAddressLine2 = `${leg.pickupLocation.city}, ${leg.pickupLocation.state} ${leg.pickupLocation.zip}`
    passengerDropoffAddressLine1 = `${leg.dropoffLocation.address}`
    passengerDropoffAddressLine2 = `${leg.dropoffLocation.city}, ${leg.dropoffLocation.state} ${leg.dropoffLocation.zip}`
      
      // HTML code 
      let ridesElement = document.querySelector('.rides')
      
      // determines if should lump in multiple rides under same title (aka noober pool)

      if (levelOfService == 'Noober Pool' & i > 0){
      }
      else { ridesElement.insertAdjacentHTML('beforeend', `
        
        <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          <i class="fas fa-car-side"></i>
          <span>${levelOfService}</span>
        </h1>
        `)
      }

      //assigns the HTML body of the passenger details based on level of service and number of passengers
     
      ridesElement.insertAdjacentHTML('beforeend', `

      <div class="border-4 ${borderColor} p-4 my-4 text-left">
        <div class="flex">
          <div class="w-1/2">
            <h2 class="text-2xl py-1">${passengerName}</h2>
            <p class="font-bold text-gray-600">${passengerPhone}</p>
          </div>
          <div class="w-1/2 text-right"> 
            <span class="rounded-xl ${passengerColor} text-white p-2">
             ${NumPassengers} passengers
            </span>            
          </div>
        </div>
        <div class="mt-4 flex">
          <div class="w-1/2">
            <div class="text-sm font-bold text-gray-600">PICKUP</div>
            <p>${passengerPickupAddressLine1}</p>
            <p>${passengerPickupAddressLine2}</p>
          </div>
          <div class="w-1/2">
            <div class="text-sm font-bold text-gray-600">DROPOFF</div>
            <p>${passengerDropoffAddressLine1}</p>
            <p>${passengerDropoffAddressLine2}</p>
          </div>
        </div>
      </div>
      `)
  }
}

//create function that determines level of service given ride as input

function DetermineLevelofService(ride){
  if (ride.length > 1){
    levelOfService = 'Noober Pool' // if more than one rider, its a Noober Pool
  } else if (ride[0].purpleRequested == 1){ // since all rides with more than one rider are noober pool, only concerned about first rider for other service levels
    levelOfService = 'Noober Purple' // if purple is requested, its a Noober Purple
  } else if (ride[0].numberOfPassengers > 3){
    levelOfService = 'Noober XL' // if there are more than 3 passengers (and not purple requested), its an XL
  } else {
    levelOfService = 'Noober X' // if none of the above, its a Noober X
  }  
return levelOfService 
}

//create function that generates the full name of a passenger in a given "leg" of a ride

function GenerateFullName(leg){
  passengerName = `${leg.passengerDetails.first} ${leg.passengerDetails.last}`
return passengerName 
}

//create function that returns the number of passengers in a leg

function NumOfPassengers(leg){
  NumPassengers = `${leg.numberOfPassengers}`
  return NumPassengers
}

//create function that determines the border color based on level of service (is it noober purple?)

function Border(levelOfService){
  if (levelOfService == "Noober Purple"){
    borderColor = `border-purple-500`
  }
  else {
    borderColor = 'border-gray-900'
  }
  return borderColor
}

//create function that determines the label color based on level of service (is it noober purple?)

function PassengerFill(levelOfService){
  if (levelOfService == "Noober Purple"){
    passengerColor = 'bg-purple-600'
  }
  else {
    passengerColor = 'bg-gray-600'
  }
  return passengerColor
}

async function pageLoaded() {
  let response = await fetch('https://kiei451.com/api/rides.json')
  let json = await response.json()

  // writes the returned JSON to the console
  console.dir(json)

  // 🔥 start here: write code to loop through the rides
 
  for(let i=0;i<json.length;i++) {  
    let ride = json[i]

    DetermineLevelofService(ride)
    renderRide(ride,levelOfService)
       
  }
}

window.addEventListener('DOMContentLoaded', pageLoaded)