﻿

function renderPeopleTable() {

    let tbody = $("#peopleTable tbody")

    let name = "Kalle"
    let kollega = "Vän"

    tbody.append(`<tr><td>${name}</td><td>${kollega}</td></tr>`)
}


renderPeopleTable() 

$("#login").click(function () {

    let n = $("#name").val()
    let c = $("#context").val()

    console.log(`Loggar in. Namnet är ${n} och kontext är ${c}`)

    $.ajax({
        url:'/api/AddPerson',
        method: 'POST',
        data: {
            name: n,
            context: c
        }
    })
        .done(function (result) {
            $("#response").html(`Personen har lagts till i databasen`);
        })
        .fail(function (xhr, status, error) { 

            console.log(xhr.responseJSON.Message)

            if (xhr.responseJSON.Message == "personerror") {

                $("#response").html(`Skriv in ett namn som är minst fyra bokstäver långt`);
            }

            else if (xhr.responseJSON.Message == "contexterror") {

                $("#response").html(`Skriv in en kontext som är minst tre bokstäver lång`);
            }
        })
})

