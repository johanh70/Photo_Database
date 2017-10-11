function showPeople() {  // Deklarerar funktionen

    $("#peopleTable tbody").empty();

    $.ajax({
        url: '/api/GetPeople',
        method: 'GET',
    })
        .done(function (result) {

            let tbody = $("#peopleTable tbody") // Pekar på tbody i tabellen peopleTable
            let update = $("#updatePerson")
            let deletePerson = $("#deletePerson")

            console.log(result)
            for (let p of result) {

                tbody.append(`<tr><td>${p.Id}</td><td>${p.Name}</td><td>${p.Context}</td><td><button id="updatePerson">OK</button></td><td><button id="deletePerson">OK</button>
</td></tr>`)
                console.log(`Personens namn är ${p.Name} och id är ${p.Id}`)
            }
        })
        //.fail($("#response").html(`Något gick fel!`));
}

showPeople();

$("#addPerson").click(function () {  // Funktionen som körs när knappen trycks

    let n = $("#name").val()
    let c = $("#context").val()

    console.log(`Loggar in. Namnet är ${n} och kontext är ${c}`)

    $.ajax({
        url: '/api/AddPerson',
        method: 'POST',
        data: {
            name: n,
            context: c
        }
    })
        .done(function (result) {
            $("#response").html(`Personen har lagts till i databasen`);
            showPeople()
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

$("#deletePerson").click(function () {

    let id = $("#id2").val()

    //console.log(`Loggar in. Person-Id är ${id} och Namnet är ${n}`)

    $.ajax({
        url: '/api/DeletePerson',
        method: 'POST',
        data: {
            id: id,
        }
    })
        .done(function (result) {
            $("#response").html(`Personen har tagits bort från databasen`);
            showPeople()
        })
        .fail(function (xhr, status, error) {

            console.log(xhr.responseJSON.Message)

            if (xhr.responseJSON.Message == "id_error") {

                $("#response").html(`Skriv in ett Person-Id med siffra/siffror`);
            }
        })
})

$("#updatePerson").click(function () {  

    let id = $("#id1").val()
    let n = $("#name2").val()
    let c = $("#context2").val()

    //console.log(`Loggar in. Namnet är ${n} och kontext är ${c}`)

    $.ajax({
        url: '/api/updatePerson',
        method: 'POST',
        data: {
            id: id,
            name: n,
            context: c
        }
    })
        .done(function (result) {
            $("#response").html(`Personen har uppdaterats i databasen`);
            showPeople()
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