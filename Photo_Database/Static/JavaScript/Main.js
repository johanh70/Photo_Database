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

$("#showPeople").click(function () {  // Deklarerar funktionen

    $("#peopleTable tbody").empty();

    $.ajax({
        url: '/api/GetPeople',
        method: 'GET',
    })
        .done(function (result) {

            let tbody = $("#peopleTable tbody") // Pekar på tbody i tabellen peopleTable

            console.log(result)
            for (let p of result) {

                tbody.append(`<tr><td>${p.Id}</td><td>${p.Name}</td><td>${p.Context}</td></tr>`)
                console.log(`Personens namn är ${p.Name} och id är ${p.Id}`)
            }
            $("#response").html(`Personerna har hämtats`);
        })
        .fail(console.log(`Något gick fel!`));
})

