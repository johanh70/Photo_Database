//function showPeopleTable() {

//    $.ajax({
//        url: '/api/GetPeople',
//        method: 'GET'
//    })
//        .done(function (result) {
//            console.log("Personer har hämtats")
//            console.log(result)

//            let tbody = $("#peopleTable tbody")

//            //let PersonId = "Kalle"
//            //let PersonName = "Vän"
//            //let PersonContext = "Kalle"

//            tbody.append(`<tr><td>${p.Id}</td><td>${p.Name}</td><td>${p.Context}</td></tr>`)


//            for (let p of result) {
//                console.log(p.Name)
//            }
//        })
//        .fail(function (xhr, status, error) {

//            console.log("Något gick fel!")
//        })
//}


function renderPeopleTable() {

    $("#login").click(function () {

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
}

