$.ajax({
    url: `http://localhost:3000/country`,
    success: function(data){
        appendSelector('countries', data)
    }
})


$(document).on('change', '#countries', function(e) {
    const countryCode = e.target.value
    clearListSelector(['cityOpt', 'zoneOpt', 'areaOpt'])
    if(countryCode == -1) return
    $.ajax({
        url: `http://localhost:3000/city?countryId=${countryCode}`,
        success: function(data){
            if(!data.length){
                hideSelector(['city','zone', 'area'])
                return
            }
            hideSelector(['zone', 'area'])
            $('#city').removeClass('display-none')
            appendSelector('cities', data)
        }
    })
})

$(document).on('change', '#cities', function(e) {
    const cityCode = e.target.value
    if(cityCode == -1) return
    $.ajax({
        url: `http://localhost:3000/zone?cityId=${cityCode}`,
        success: function(data){
            if(!data.length){
                hideSelector(['zone', 'area'])
                return
            }
            hideSelector(['area'])
            clearListSelector(['zoneOpt', 'areaOpt'])
            $('#zone').removeClass('display-none')
            appendSelector('zones', data)
        }
    })
})

$(document).on('change', '#zones', function(e) {
    const zoneCode = e.target.value
    if(zoneCode == -1) return
    $.ajax({
        url: `http://localhost:3000/area?zoneId=${zoneCode}`,
        success: function(data){
            if(!data.length){
                hideSelector(['area'])
                return
            }
            clearListSelector(['areaOpt'])
            $('#area').removeClass('display-none')
            appendSelector('areas', data)
        }
    })
})

// hide selector based on array
function hideSelector(arr) {
    arr.forEach(el => $(`#${el}`).addClass('display-none'))
}

// append options to the selector
function appendSelector(htmlId,arr) {
    arr.forEach(el => {
        $(`#${htmlId}`).append(createOption((el.id || el), (el.name || el)))
    })
}

// clear list of options
function clearListSelector(listArr) {
    listArr.forEach(el => clearSelector(el))
}

// clear selector options
function clearSelector(htmlId) {
    $(`#${htmlId} ~ option`).remove()
}

// create single option
function createOption(id, val){
    return `<option value="${id}">${val}</option> `
}