const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data
    // console.log(phones)
    displayPhones(phones, isShowAll)
}


const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container')
    // clear phone container
    phoneContainer.textContent = '';
    // console.log(phones)

    // if there are more then 12 phones
    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    }
    // console.log('is show all', isShowAll)
    // display first 12 phones if I don't click show all

    if (!isShowAll) {
        phones = phones.slice(0, 12)
    }


    phones.forEach(phone => {
        // console.log(phone)

        // 1 create a div
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card bg-gray-100 m-5 p-5 shadow-xl`
        // set innerHTML
        phoneCard.innerHTML = `
            <figure>
                      <img
                        src="${phone.image}"
                        alt="Phone" />
                    </figure>
                    <div class="card-body">
                      <h2 class="card-title justify-center">${phone.phone_name}!</h2>
                      <p class="text-center">If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handleShowDetails('${phone.slug}')"  class="btn btn-primary">Show Details</button>
                      </div>
        `;
        phoneContainer.appendChild(phoneCard)
    })
    // hide loading spinner
    toggleLoadingSpinner(false)
}

// load details

const handleShowDetails = async (id) => {
    console.log(id)
    // load data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data
    console.log(phone)
    showPhoneDetails(phone)
}

// display data
const showPhoneDetails = (phone) => {
    // const phoneName = document.getElementById('show-detail-phone-name')
    // phoneName.innerText = phone.name
    // console.log(phoneName)


    const showDetailsContainer = document.getElementById('show-details-container')
    showDetailsContainer.innerHTML = `
        <div class="flex justify-center"> 
        <img src="${phone.image}" />
        </div>
        
        <h3 id="show-detail-phone-name" class="text-3xl font-bold mt-4">${phone.name}</h3>
        <p class="py-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p class=""><span class="font-bold">Display Size: </span>${phone.mainFeatures.displaySize}</p>
        <p class="mt-3"><span class="font-bold">Storage: </span>${phone.mainFeatures.storage}</p>
        <p class="mt-3"><span class="font-bold">Chipset: </span>${phone.mainFeatures.chipSet}</p>
        <p class="mt-3"><span class="font-bold">Memory: </span>${phone.mainFeatures.memory}</p>
        <p class="mt-3"><span class="font-bold">Release Date: </span>${phone.releaseDate}</p>
        <p class="mt-3"><span class="font-bold">Brand: </span>${phone.brand}</p>
        <p class="mt-3"><span class="font-bold">GPS: </span>${phone.others?.GPS || 'GPS not available'}</p>

    `

    // show the modal
    show_details_modal.showModal()
}

// handle search button
const handleSearch = (isShowAll) => {
    // console.log("handle search")

    // show loading spinner
    toggleLoadingSpinner(true);

    // show searchText pass searchText as loadPhone function parameter
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    console.log(searchText)
    loadPhone(searchText, isShowAll)
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}

// handle show all
const handleShowAll = () => {
    handleSearch(true)
}


